import React, {memo, useEffect, useState} from 'react';
import * as styles from "../CardsSection.module.css";
import {GatsbyImage} from "gatsby-plugin-image";
import {useCardContext} from "../context";
import {getCardTypes} from "../config";
import {useGlobalContext} from "../../../../context/context";
import {usePrefixImage} from "../../../../hooks/usePrefixImage";
import {CardInputItem} from "../forms/NewCardForm/NewCardForm";
type CardItemProps = {
    index: number,
    props:  Queries.WpCommonSections_Cards_cardsSpisokKart
}

const CardItemComponent = memo(({props, index} : CardItemProps) => {
    const id = index + 1
    const isMultipicture = props?.cardsItemSpisokIzobrazhenij && props?.cardsItemSpisokIzobrazhenij?.length > 1
    const [isAccentHovered, setIsAccentHovered] = useState(false)
    //     //@ts-ignore
    // const cardTypes = data?.wpPage?.cards?.cardsSpisokKart ? getCardTypes(data?.wpPage?.cards?.cardsSpisokKart) : []

    const {gap, width, setSelectedCardType, setIsNewCardModalOpen, setCardInputs ,cardInputs} = useCardContext()
    const {isMobile} = useGlobalContext()
    const [cardTypes] = getCardTypes()

    // useEffect(() => {console.log(width, gap)}, [width, gap])

    const nullifyInputs = () => {
        const inputs: CardInputItem[] = JSON.parse(cardInputs)
        const res = JSON.stringify(inputs.map(item => ({...item, value: ''})))
        setCardInputs(res)
    }

    const clickHandler = () => {
        const cardType = cardTypes.find(item => item.name === props?.cardsItemNazvanieKarty)
        cardType && setSelectedCardType(cardType)
        // nullifyInputs()
        setIsNewCardModalOpen(true)
    }

    // @ts-ignore
    const [firstImage] = usePrefixImage(props?.cardsItemSpisokIzobrazhenij[0]?.cardsItemIzobrazhenieKarty?.gatsbyImage)
    // @ts-ignore
    const [secondImage] = usePrefixImage(props?.cardsItemSpisokIzobrazhenij[1]?.cardsItemIzobrazhenieKarty?.gatsbyImage)


    return (
        <li key={id} style={isMobile ? {marginRight: gap, width: width} : {}} className={styles.card}>
            <div className={styles.card__body}>
                <h3 className={styles.card__title}>{props?.cardsItemNazvanieKarty}</h3>
                {
                    isMultipicture ?
                        <div className={styles.card__multipicture}>
                            {firstImage &&
                                <GatsbyImage
                                    className={[styles.card__picture, styles.first].join(' ')}
                                    alt={''}
                                    image={firstImage}>
                                </GatsbyImage>}
                            {secondImage &&
                                <GatsbyImage
                                    className={[styles.card__picture, styles.second].join(' ')}
                                    alt={''}
                                    image={secondImage}>
                                </GatsbyImage>}
                        </div> : !!props?.cardsItemSpisokIzobrazhenij && firstImage ?
                            <GatsbyImage className={[styles.card__picture].join(' ')}
                                         alt={''}
                                         image={firstImage}>
                            </GatsbyImage> : <div></div>
                }

                <div className={styles.card__col}>
                    <h4 className={styles.card__price}>{props?.cardsItemStoimostPokupki?.toLocaleString('ru')} руб.</h4>
                    <span className={styles.card__time}>в {props?.cardsItemPeriod}</span>
                </div>
                <ul className={styles.card__list}>
                    {props?.cardsItemOpisanie?.map((item, index) => <li key={index}
                                                                        className={styles.list__item}>
                        <span className={styles.list__point}></span>
                        <div className={styles.list__text}>
                            {item?.cardsItemTekstKKotoromuPrilagaetsyaPodskazka &&
                                <span className={styles.list__accent}
                                      onMouseEnter={() => setIsAccentHovered(true)}
                                      onMouseLeave={() => setIsAccentHovered(false)}>{item?.cardsItemTekstKKotoromuPrilagaetsyaPodskazka}
                                    <div
                                        className={[styles.pulldown, isAccentHovered ? styles.open : ''].join(' ')}>
                                                    <div className={styles.pulldown__wrapper}>
                                                        <div
                                                            className={styles.pulldown__body}>{item.cardsListTekstPodskazki}
                                                        </div>
                                                        <div className={styles.pulldown__triangle}></div>
                                                    </div>
                                                </div>
                                            </span>}
                            {(item?.cardsItemOstavshijsyaTekstElementa || item?.cardsListTekstElementa) && <span className={styles.list__text}
                                   dangerouslySetInnerHTML={{__html: item?.cardsItemOstavshijsyaTekstElementa || item?.cardsListTekstElementa}}></span>}</div>
                    </li>)}

                </ul>
            </div>
            <button
                onClick={clickHandler}
                className={styles.card__button}>{props?.cardsItemTekstKnopki}
            </button>
        </li>
    )
});

export default CardItemComponent;
