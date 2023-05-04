import React, {createRef, memo, useEffect, useLayoutEffect, useMemo, useState} from 'react';
import * as styles from './CardsSection.module.css'
import NewCardForm, {CardInputItem} from "./forms/NewCardForm/NewCardForm";
import {CardContext, CardContextType} from "./context";
import {CardItem, cards, CardType, getCardTypes, CarMark, CarModel, getCarBirthYears, SearchItem} from "./config";
import {InView} from 'react-intersection-observer';
import {GatsbyImage, StaticImage} from "gatsby-plugin-image";
import BackgroundImage from "gatsby-background-image";
import ProlongCardForm from "./forms/ProlongCardForm/ProlongCardForm";
import {useGlobalContext} from "../../../context/context";
import {stack} from "../../../hooks/useClassName";
import {useGatsbyBgImage} from "../../../hooks/useGatsbyBgImage";
import {useGatsbyImage} from "../../../hooks/useGatsbyImage";
import Modal from "../../modal/Modal";
import {Car} from "../../pages/EvacuatorPage/sections/03_EvacuatorPageWeReadySection/Cars/Cars";
import {useWpCommonSection} from "../../../hooks/useWpCommonSection";
import CardItemComponent from "./cardItem/CardItem";

type CardsSectionProps = {
    pageName?: 'main' | 'evacuator' | 'techhelp',
    title?: string
}
const CardsSection = ({pageName, title}: CardsSectionProps) => {

    const [selectedCard, setSelectedCard] = useState<Queries.WpCommonSections_Cards_cardsSpisokKart>()
    const [isNewCardModalOpen, setIsNewCardModalOpen] = useState<boolean>(false)
    const [isProlongCardModalOpen, setIsProlongCardModalOpen] = useState<boolean>(false)

    const [years, setYears] = useState<SearchItem[]>([])
    const [carMarks, setCarMarks] = useState<CarMark[]>([])
    const [selectedCardType, setSelectedCardType] = useState<CardType>()
    const [isAgreed, setIsAgreed] = useState(false)
    const [firstCarMark, setFirstCarMark] = useState<CarMark>()
    const [secondCarMark, setSecondCarMark] = useState<CarMark>()

    const [secondCardInput, setSecondCardInput] = useState<CardInputItem>()
    const [firstCardInput, setFirstCardInput] = useState<CardInputItem>()

    const [firstCarModels, setFirstCarModels] = useState<CarModel[]>([])
    const [secondCarModels, setSecondCarModels] = useState<CarModel[]>([])
    const [cardInputs, setCardInputs] = useState<string>('[]')
    const [isSecondPossessor, setIsSecondPossessor] = useState<boolean>()

    const [cardTypes] = getCardTypes()
    const updateCardInput =
        (id: number, key: 'value' | 'isInvalid' | 'isBlocked' | 'items' | 'isClosed', value: any
        ) => {
            setCardInputs(prev => {
                const data: CardInputItem[] = JSON.parse(prev)
                const inputItem = data.find((i: CardInputItem) => i.id === id)
                // @ts-ignore
                inputItem[key] = value
                return JSON.stringify(data)
            })
        }

    useEffect(() => {
        if (years.length) {
            const items: CardInputItem[] = JSON.parse(cardInputs).filter((item: CardInputItem) => item.key === 'carYear')
            items.map(item => updateCardInput(item.id, 'items', years))
        }
    }, [years, cardInputs])

    useEffect(() => {
        if (carMarks) {
            const items: CardInputItem[] = JSON.parse(cardInputs).filter((item: CardInputItem) => item.key === 'carMark')
            items.map(item => updateCardInput(item.id, 'items', carMarks))
        }
    }, [carMarks])

    useEffect(() => {
        (async () => {
            const items = getCarBirthYears()
            setYears(items)
            try {
                const res = await fetch('https://cars-base.ru/api/cars?full=1')
                const data = await res.json()
                setCarMarks(data)
            } catch (e) {
                console.log(e)
            }
        })()
    }, [])



    Array.from([firstCardInput, secondCardInput]).map(input => useEffect(() => {
        if (input) {
            const modelInputId = input.id + 1
            if (input?.value) {
                const mark = carMarks.find(mark => mark.name === input.value)
                mark && updateCardInput(modelInputId, 'items', mark.models)
                updateCardInput(modelInputId, 'isClosed', false)
            } else {
                updateCardInput(modelInputId, 'isClosed', true)
            }
        }

    }, [input]))


    useEffect(() => {
        if (carMarks) {
            const data: CardInputItem[] = JSON.parse(cardInputs)
            const firstMarkInput = data.find(item => item.sectionId === 'first' && item.key === 'carMark')
            setFirstCardInput(firstMarkInput)
            const secondMarkInput = data.find(item => item.sectionId === 'second' && item.key === 'carMark')
            setSecondCardInput(secondMarkInput)
        }

    }, [cardInputs])

    useEffect(() => {
        if (secondCarMark) {
            setSecondCarModels(secondCarMark.models)
        } else {
            setSecondCarModels([])
        }
    }, [secondCarMark])

    useEffect(() => {
        if (firstCarMark) {
            setFirstCarModels(firstCarMark.models)
        } else {
            setFirstCarModels([])
        }
    }, [firstCarMark])
    const {
        setIsBottomAvailable,
        setIsTopAvailable,
        isTopAvailable,
        topHeight,
        isMobile,
        isBottomAvailable,
        data
    } = useGlobalContext()
    const [gap, setGap] = useState(20)
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)

    const [left, setLeft] = useState(0)
    const [activeCard, setActiveCard] = useState(1)
    const list = createRef<HTMLUListElement>()
    const swiper = createRef<HTMLDivElement>()

    const contextValue: CardContextType = {
        selectedCard,
        setSelectedCard,
        isNewCardModalOpen,
        setIsNewCardModalOpen,
        isProlongCardModalOpen,
        setIsProlongCardModalOpen,
        carMarks,
        years,
        cardTypes,
        selectedCardType,
        setSelectedCardType,
        isAgreed,
        setIsAgreed,
        firstCarModels,
        setSecondCarModels,
        setFirstCarModels,
        secondCarModels,
        cardInputs,
        setCardInputs, updateCardInput, isSecondPossessor, setIsSecondPossessor, gap, width
    }


    useEffect(() => {
        const card = Math.floor(Math.abs(left) / (width + gap)) + 1
        setActiveCard(card)
    }, [left])

    useEffect(() => {
        if (list.current?.clientHeight) {
            setHeight(list.current?.clientHeight)

        }
    }, [list])

    useLayoutEffect(() => {
        if (document.body.clientWidth < 480) {
            setGap(30)
            swiper.current && setWidth(swiper.current?.clientWidth)
        } else if (document.body.clientWidth < 990) {
            setGap(70)
            swiper.current && setWidth(swiper.current?.clientWidth)
        } else if (document.body.clientWidth < 1200) {
            setGap(32)
        } else if (document.body.clientWidth < 1300) {
            setGap(20)
        } else {
            setGap(30)
        }
    }, [swiper])

    useEffect(() => {
        if (gap && document.body.clientWidth >= 990 && list.current) {
            const listWidth = list.current?.clientWidth
            const listLength = cards.length

            if (listWidth) {
                const width = (listWidth - gap * 1.5 * (listLength - 1)) / listLength
                // console.log('hari', listWidth, width)
                // @ts-ignore
                setWidth(width)
            }

        }
    }, [gap, list.current])


    const [isTouching, setIsTouching] = useState(false)
    const [startY, setStartY] = useState(0)
    const [startX, setStartX] = useState(0)


    const [isBottomInView, setIsBottomInView] = useState(false)
    const [isTopInView, setIsTopInView] = useState(false)


    const toNextCard = (e?: React.MouseEvent) => {
        e && e.preventDefault()
        if (activeCard < cards.length) {
            setLeft(-(activeCard) * (width + gap))
        }
    }


    const toPrevCard = (e?: React.MouseEvent) => {
        e && e.preventDefault()
        // setLeft(-(activeCard - 1) * (width + gap))
        if (activeCard > 1) {
            if (Math.abs(left) % (width + gap) < 20) {
                setLeft(-(activeCard - 2) * (width + gap))
            } else {
                setLeft(-(activeCard - 1) * (width + gap))
            }
        }

    }


    const onTouchMove = (e: TouchEvent, initY: number, isBottomInView: boolean, isTopInView: boolean, left: number, activeCard: number) => {
        if (e.touches && e.touches[0]) {
            const y = e.touches[0].clientY
            const isScrollingBottom = y - initY <= 0

            if (isScrollingBottom) {
                if ((isBottomInView && activeCard !== cards.length)) {
                    return setLeft(left + (y - initY))
                }
            }
            setLeft(left)
        }
    }

    const onTouchMoveX = (e: TouchEvent, initX: number, left: number) => {
        if (e.touches && e.touches[0]) {
            const x = e.touches[0].clientX
            setLeft(left + (x - initX))
        }
    }


    const [initLeft, setInitLeft] = useState(0)
    const onTouchStart = (e: React.TouchEvent) => {
        setIsTouching(true)
        if (e.touches && e.touches[0]) {
            setInitLeft(left)
            if (!isBottomAvailable) {
                const initY = e.touches[0].clientY
                setStartY(initY)

                document.addEventListener('touchmove', event => onTouchMove(event, initY, isBottomInView, isTopInView, left, activeCard))
            } else {
                const initX = e.touches[0].clientX
                setStartX(initX)
                document.addEventListener('touchmove', event => onTouchMoveX(event, initX, left))
            }
        }
    }


    const onTouchEnd = (e: React.TouchEvent) => {
        const endX = e.changedTouches[0].clientX

        setIsTouching(false)
        // const card = Math.floor(Math.abs(left) / (width + gap)) + 1
        // setActiveCard(card)
        document.removeEventListener('touchmove', e => onTouchMove(e, startY, isBottomInView, isTopInView, left, activeCard))
        document.removeEventListener('touchmove', event => onTouchMoveX(event, startX, left))

        if (Math.abs(left) - (width + gap) * (cards.length - 1) > 0 || Math.abs(left) - (width + gap) * (cards.length - 1) > -50) {
            setLeft(-(width + gap) * (cards.length - 1))
            // setActiveCard(cards.length)
        }
        if (left > 0 || left > -50) {
            setLeft(0)
            // setActiveCard(1)
        }

        const dif = initLeft - left

        if (dif > 0) {
            if (dif > 50) {
                toNextCard()
            } else {
                setLeft(-(activeCard - 1) * (width + gap))
            }
        } else if (dif < 0) {
            if (Math.abs(dif) > 50) {

                toPrevCard()
            } else {
                setLeft(-(activeCard) * (width + gap))
            }
        }


    }

    useEffect(() => {
        if (isMobile) {
            if (activeCard === cards.length) setIsBottomAvailable(true)
        }
    }, [activeCard])

    const [bgImage] = useGatsbyBgImage('print')

    const prolongButtonHandler = () => {
        cardTypes && cardTypes[0] && setSelectedCardType(cardTypes[0])
        setIsProlongCardModalOpen(true)
    }


    const [isDesktop, setIsDesktop] = useState(false)

    useEffect(() => {
        setIsDesktop(document.body.clientWidth >= 990)
    }, [])

    const [cardsSection] = useWpCommonSection('klubnye-karty')

    const [cardsData, setCardsData] = useState<Queries.WpCommonSections_Cards_cardsSpisokKart[]>()

    useEffect(() => {
        if (data) {

            const list = data?.allWpCommonSections?.nodes?.find(item => item.slug === 'klubnye-karty')
            // @ts-ignore
            list?.cards?.cardsSpisokKart && setCardsData(list?.cards?.cardsSpisokKart)


        }
    }, [cardsSection])

    // console.log(bgImage)
    if (!bgImage) return null
    return (
        <CardContext.Provider value={contextValue}>
            <BackgroundImage  onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} Tag={'section'} {...bgImage}
                             className={stack(styles.background, 'section-indent')} id={'cards'}
                             preserveStackingContext>
                <InView onChange={(inView, entry) => setIsTopInView(inView)}></InView>
                <div id={'cards'} className={['container', styles.body].join(' ')}>
                    {!title ? <h2 className={styles.title} dangerouslySetInnerHTML={{__html: cardsSection?.cards?.cardsZagolovok}}></h2> : <h2 className={styles.title} dangerouslySetInnerHTML={{__html: title}}></h2>}
                    {cardsSection?.cards?.cardsPodzagolovok && <p className={styles.text}
                        dangerouslySetInnerHTML={{__html: cardsSection?.cards?.cardsPodzagolovok}}></p>}
                    <div ref={swiper} style={isMobile ? {height} : {}} className={styles.cards}>
                        <button onClick={toNextCard}
                                className={[styles.cards__next, activeCard < cards.length ? styles.visible : ''].join(' ')}>
                            <StaticImage className={styles.cards__arrow} src="./images/card-arrow-next.png" alt=""/>
                        </button>
                        <button onClick={toPrevCard}
                                className={[styles.cards__prev, left < 0 ? styles.visible : ''].join(' ')}>
                            <StaticImage className={styles.cards__arrow} src="./images/card-arrow-prev.png" alt=""/>
                        </button>
                        <ul style={{left}} ref={list}
                            className={[styles.cards__wrapper, isTouching ? styles.nosmooth : '', isDesktop ? 'container' : ''].join(' ')}>
                            {cardsData && cardsData?.map((props, index) => <CardItemComponent
                                key={props.cardsItemStoimost} index={index} props={props}></CardItemComponent>)}
                        </ul>
                    </div>
                   <div className={styles.bottom}>
                        <button onClick={prolongButtonHandler}
                                className={styles.bottom__link}>{cardsSection?.cards?.cardsTekstKnopkiPodKartami}
                        </button>
                        {/*{pageName === 'evacuator' &&*/}
                        {/*    <a href={'https://www.angelclub.ru'} target={'_blank'} className={styles.bottom__link}>Узнайте*/}
                        {/*        подробнее</a>}*/}
                        <InView onChange={(inView, entry) => setIsBottomInView(inView)}></InView>
                        {(cardsSection?.cards?.cardsTekst &&  pageName !== 'techhelp') && <p className={styles.bottom__desc}
                                                               dangerouslySetInnerHTML={{__html: cardsSection?.cards?.cardsTekst}}>
                        </p>}
                    </div>
                </div>
                <Modal isBackTransparent={true} isOpen={isNewCardModalOpen} setIsOpen={setIsNewCardModalOpen}>
                    <NewCardForm></NewCardForm>
                </Modal>
                <Modal isBackTransparent={true} isOpen={isProlongCardModalOpen}
                       setIsOpen={setIsProlongCardModalOpen}>
                    <ProlongCardForm></ProlongCardForm>
                </Modal>
            </BackgroundImage>
        </CardContext.Provider>
    );
};

export default memo(CardsSection);
