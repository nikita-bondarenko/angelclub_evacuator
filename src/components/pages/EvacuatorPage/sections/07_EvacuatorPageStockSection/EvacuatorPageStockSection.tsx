import React from 'react';
import * as styles from './EvacuatorPageStockSection.module.css'
import percent from './images/percent.png'
import cards from './images/cards.png'
import {useGlobalContext} from "../../../../../context/context";
import {GatsbyImage} from "gatsby-plugin-image";
import {usePrefixImage} from "../../../../../hooks/usePrefixImage";


const StockItem = (item: Queries.WpPage_Promotion_promotionSpisok) => {
    const [image] = usePrefixImage(item?.promotionSpisokKartinka?.gatsbyImage)
    return <div  className={styles.block}>
        {image && <GatsbyImage className={styles.block__decor} alt={''} image={image}></GatsbyImage>}
        {item?.promotionSpisokTekst && <p className={styles.block__text}
                                          dangerouslySetInnerHTML={{__html: item?.promotionSpisokTekst}}></p>}
    </div>
}

const EvacuatorPageStockSection = () => {

    const {evacuatorPageData} = useGlobalContext()
    return (
        <div id={'order'} className={['container', styles.body].join(' ')}>
            <h2 className={styles.title}>Акции</h2>
            <div>
                {//@ts-ignore
                    evacuatorPageData?.wpPage?.promotion?.promotionSpisok?.map((item, index) => <StockItem key={index} {...item}></StockItem>)}
            </div>
            <div className={styles.bottom}>
                {evacuatorPageData?.wpPage?.promotion?.promotionHrefSsylki && <a className={styles.link} target={'_blank'}
                    href={evacuatorPageData?.wpPage?.promotion?.promotionHrefSsylki}>{evacuatorPageData?.wpPage?.promotion?.promotionTekstSsylki}</a>}
            </div>
        </div>
    );
};

export default EvacuatorPageStockSection;
