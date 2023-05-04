import React from 'react';
import {useGlobalContext} from "../../../../../context/context";
import * as styles from './PriceTables.module.css'
import {stack} from "../../../../../hooks/useClassName";
const PriceTables = () => {
    const {techHelpPageData} = useGlobalContext()

    return (
        <div className={stack('section-indent', 'container', styles.body)}>
            {techHelpPageData?.wpPage?.servicePrice?.servicePriceZagolovok && <h2 className={stack('title-secondary', styles.title)}
                 dangerouslySetInnerHTML={{__html: techHelpPageData?.wpPage?.servicePrice?.servicePriceZagolovok}}></h2>}
            <div className={styles.wrapper}>
                <div className={stack(styles.table, styles.first)}>
                    <h3 className={styles.table__title}>{techHelpPageData?.wpPage?.servicePrice?.servicePriceZagolovokPervojTabliczy}</h3>
                    <ul className={styles.list}>
                        {techHelpPageData?.wpPage?.servicePrice?.servicePriceSpisok?.map((item, index) => <li className={styles.list__item} key={index}>
                            {item?.servicePriceNazvanieUslugi&&<div className={stack('text-prime', styles.item__label)}
                                  dangerouslySetInnerHTML={{__html: item?.servicePriceNazvanieUslugi}}></div>}
                            {item?.servicePriceZnachenieDlyaPervojCzabliczy && <div className={stack('text-prime', styles.item__text)}
                                  dangerouslySetInnerHTML={{__html: item?.servicePriceZnachenieDlyaPervojCzabliczy}}></div>}
                        </li>)}
                    </ul>
                </div>
                <div className={stack(styles.table, styles.second)}>
                    <h3 className={styles.table__title}>{techHelpPageData?.wpPage?.servicePrice?.servicePriceZagolovokVtorojTabliczy}</h3>
                    <ul className={styles.list}>
                        {techHelpPageData?.wpPage?.servicePrice?.servicePriceSpisok?.map((item, index) => <li className={styles.list__item} key={index}>
                            {item?.servicePriceNazvanieUslugi &&<div className={stack('text-prime', styles.item__label)}
                                  dangerouslySetInnerHTML={{__html: item?.servicePriceNazvanieUslugi}}></div>}
                            {item?.servicePriceZnachenieDlyaVtorojTabliczy &&<div className={stack('text-prime', styles.item__text)}
                                  dangerouslySetInnerHTML={{__html: item?.servicePriceZnachenieDlyaVtorojTabliczy}}></div>}
                        </li>)}
                    </ul>
                </div>
            </div>
            <div id="orderform"></div>
        </div>
    );
};

export default PriceTables;
