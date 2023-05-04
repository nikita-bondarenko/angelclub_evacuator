import React from 'react';
import * as styles from './PriceList.module.css'
import {stack} from "../../../../../hooks/useClassName";
import {useGlobalContext} from "../../../../../context/context";

const PriceListRow = (item: Queries.WpPage_Pricelist_priceListSpisok) => {


    return <li className={styles.table__row}>
        <div className={stack(styles.table__bigCol, styles.table__label)}>{item?.priceListNazvanieUslugi}</div>
        <div className={stack(styles.table__smallCol)}>
            <div className={stack(styles.table__text, styles.simple)}>{item.priceListZnacheniePolyaBezKarty}</div>
        </div>
        <div className={stack(styles.table__smallCol)}>
            <div className={stack(styles.table__text, styles.gold)}>{item.priceListZnacheniePolyaGold}</div>
        </div>
        <div className={stack(styles.table__smallCol)}>
            <div className={stack(styles.table__text, styles.platinum)}>{item.priceListZnacheniePolyaPlatinum}</div>
        </div>
    </li>
}

const PriceList = () => {

    const {autoservicePageData} = useGlobalContext()

    return (
        <div className={stack('container', 'section-indent', styles.body)}>
            <h2 className={stack('title-prime', styles.title)}>{autoservicePageData?.wpPage?.priceList?.priceListZagolovok}</h2>
            <ul className={stack(styles.table)}>
                <li className={styles.table__row}>
                    <div className={styles.table__bigCol}></div>
                    <div className={stack(styles.table__smallCol, styles.firstLine__text)}>Без карты</div>
                    <div className={stack(styles.table__smallCol, styles.firstLine__text)}>GOLD</div>
                    <div className={stack(styles.table__smallCol, styles.firstLine__text)}>PLATINUM</div>
                </li>
                {//@ts-ignore
                    autoservicePageData?.wpPage?.priceList?.priceListSpisok?.map((item, index) => <PriceListRow
                        key={index} {...item}></PriceListRow>)}
            </ul>
        </div>
    );
};

export default PriceList;
