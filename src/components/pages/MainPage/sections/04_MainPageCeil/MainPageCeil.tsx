import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import * as styles from './MainPageCeil.module.css'
import {stack} from "../../../../../hooks/useClassName";
import Pulldown from "../../../../common/Pulldown/Pulldown";
import {useGlobalContext} from "../../../../../context/context";

const Toggle = ({toggle, setToggle}: { toggle: boolean, setToggle: Dispatch<SetStateAction<boolean>> }) => {
    return (
        <div onClick={() => setToggle(prev => !prev)} className={stack(styles.toggle, !toggle ? styles.switched : '')}>
            <div className={styles.toggle__switch}></div>
        </div>)
}

type PriceObject = {
    tech: number,
    tire: number,
    fitting: number
}

type CeilSectionDataItem = {
    id: string,
    middle: number[],
    saving: number[],

    totalSaving: number,
    cardPrice: number
}

const ceilSectionData: CeilSectionDataItem[] = [
    {
        id: 'p',
        middle: [48000, 16000, 10000],
        saving: [24000, 8000, 5000],
        totalSaving: 37000,
        cardPrice: 8000
    }, {
        id: 'g',
        middle: [24000, 8000, 5000],
        saving: [7200, 2400, 1500],
        totalSaving: 11100,
        cardPrice: 6000
    }
]

const services: string[] = ['техническое <br/> обслуживание', 'хранение шин', 'шиномонтаж']

const descList: string[] = ['+ бесплатная эвакуация', '+ бесплатная техпомощь', '+ 50% скидка в СТО', '+ скидки у партнёров клуба']

const CeilCard = (props: Queries.WpPage_Howmuchsaving_savingInformacziyaOKartah & { isPlatinum: boolean }) => {
    const [isSymbolHovered, setIsSymbolHovered] = useState(false)
    const [isBackgroundBright, setIsBackgroundBright] = useState(false)
    const {mainPageData} = useGlobalContext()

    useEffect(() => {
        if (mainPageData) {
            setIsBackgroundBright(!props.isPlatinum)
        }
    }, [props.savingStoimostKarty, mainPageData])

    return <div className={styles.card}>
        <div className={styles.ceil}>
            <div className={styles.ceil__top}>
                <div className={stack(styles.ceil__section, styles.ceil__middle)}>
                    <p className={styles.ceil__label}>{props.savingPodzagolovokPervojStroki}</p>
                    {/*<ul className={stack(styles.ceil_flex, styles.categories)}>*/}
                    {/*    {props.savingKategoriiPoKotorymSchitaetsya?.map(item => <span*/}
                    {/*        className={stack('text-prime', styles.ceil__text)}*/}
                    {/*        dangerouslySetInnerHTML={*/}
                    {/*            //@ts-ignore*/}
                    {/*            {__html: item.nazvanie}}></span>)}*/}
                    {/*</ul>*/}
                    <ul className={styles.ceil_flex}>
                        {props.savingZnacheniyaPervojStroki?.map((price, index) => <li key={index}
                                                                                       className={styles.ceil__item}>
                            {    //@ts-ignore
                                props?.savingKategoriiPoKotorymSchitaetsya[index] && <span
                                className={stack('text-prime', styles.ceil__text)}
                                dangerouslySetInnerHTML={
                                    //@ts-ignore
                                    {__html: props.savingKategoriiPoKotorymSchitaetsya[index].nazvanie}}></span>}
                          <span className={stack('text-prime', styles.ceil__value)}>
                                   {price?.summa?.toLocaleString('ru')} руб.
                            </span>
                        </li>)}
                    </ul>
                </div>
                <div className={stack(styles.ceil__section, styles.ceil__saving)}>
                    <p className={styles.ceil__label}>{props.savingPodzagolovokVtorojStroki}</p>
                    <ul className={styles.ceil_flex}>
                        {props.savingZnacheniyaVtorojStroki?.map((price, index) => <li key={index}
                                                                                       className={styles.ceil__item}>
                             <span className={stack(styles.ceil__value)}>
                            {price?.summa?.toLocaleString('ru')} руб.
                             </span>
                        </li>)}
                    </ul>
                </div>
            </div>
            <div className={styles.ceil__bottom}>
                <div className={styles.bottom__wrapper}>
                    <span className={stack(styles.ceil__text)}>{props.savingTekstNadItogovojSummoj}</span>
                    {props.savingEstPodskazka === "true" && <span
                        className={styles.ceil__symbol} onMouseEnter={() => setIsSymbolHovered(true)}
                        onMouseLeave={() => setIsSymbolHovered(false)}>?
                         <Pulldown className={styles.pulldown} isOpen={isSymbolHovered}
                                   triangleClassName={styles.pulldown__triangle}>
                             {props.savingTekstPodskazki}
                         </Pulldown>
                        </span>}
                </div>
                <p className={styles.ceil__total}>Итого: {props.savingZnacheniyaVtorojStroki?.reduce((acc, item) => item ? acc + Number(item.summa) : acc, 0).toLocaleString('ru')} руб.</p>
            </div>
        </div>
        <div className={stack(styles.card__desc, isBackgroundBright && styles.bright)}>
            <div className={styles.desc__triangle}></div>
            <h3 className={styles.desc__title}>Стоимость <br/> карты {Number(props.savingStoimostKarty)?.toLocaleString('ru')} руб.
            </h3>
            <ul className={styles.desc__list}>
                {props.savingOpisanieKarty?.map((item, index) => <li key={index}
                                                                     className={stack('text-secondary', styles.desc__item)}>{item?.tekstElementa}</li>)}
            </ul>
        </div>
    </div>
}

const MainPageCeil = () => {

    const [isPlatinum, setIsPlatinum] = useState(true)
    const {mainPageData} = useGlobalContext()
    const [currentCardData, setCurrentCardData] = useState<Queries.WpPage_Howmuchsaving_savingInformacziyaOKartah>()

    useEffect(() => {
        if (mainPageData && mainPageData.wpPage?.howMuchSaving?.savingInformacziyaOKartah) {
            // @ts-ignore
            setCurrentCardData(mainPageData.wpPage?.howMuchSaving?.savingInformacziyaOKartah[0])
        }
    }, [mainPageData])

    useEffect(() => {
        // @ts-ignore
        mainPageData && mainPageData.wpPage?.howMuchSaving?.savingInformacziyaOKartah && setCurrentCardData(isPlatinum ? mainPageData.wpPage?.howMuchSaving?.savingInformacziyaOKartah[0] : mainPageData.wpPage?.howMuchSaving?.savingInformacziyaOKartah[1])
    }, [isPlatinum])


    return (
        <section className={stack('container', 'section-indent', styles.body)}>
            <h2 className={stack('title-secondary', styles.title)}>{mainPageData?.wpPage?.howMuchSaving?.savingZagolovok}</h2>
            <div className={stack('text-prime', styles.block)}>
                {mainPageData?.wpPage?.howMuchSaving?.savingTekstSlevaOtPereklyuchatelya}
                <Toggle toggle={isPlatinum} setToggle={setIsPlatinum}></Toggle>
                {mainPageData?.wpPage?.howMuchSaving?.savingTekstSpravaOtPereklyuchatelya}
            </div>
            {/*@ts-ignore */}
            <CeilCard isPlatinum={isPlatinum}  {...currentCardData}></CeilCard>
        </section>
    );
};

export default MainPageCeil;
