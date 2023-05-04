import React from 'react';
import * as styles from './EvacuatorPageHowWorkSection.module.css'
import number1 from './images/1.svg'
import number2 from './images/2.svg'
import number3 from './images/3.svg'
import number4 from './images/4.svg'
import number5 from './images/5.svg'
import number6 from './images/6.svg'
import {useGlobalContext} from "../../../../../context/context";

const number = {
    number1,
    number2,
    number3,
    number4,
    number5,
    number6
}
const EvacuatorPageHowWorkSection = () => {

    const {evacuatorPageData} = useGlobalContext()

    return (
        <section className={['container', styles.body].join(' ')}>
            <h2 className={styles.title}>{evacuatorPageData?.wpPage?.howWork?.howWorkZagolovok}</h2>
            <ul className={styles.list}>
                {evacuatorPageData?.wpPage?.howWork?.howWorkSpisok?.map((item, index) => {
                    // @ts-ignore
                    const image = number['number' + (index + 1)]

                    return <li key={index} className={styles.item}>
                        <div className={styles.item__top}>
                            <img className={styles.item__number} src={image} alt=""/>
                            <h3 className={styles.item__title}>{item?.howWorkZagolovok}</h3>
                        </div>
                        {item?.howWorkTekst && <p className={styles.item__text} dangerouslySetInnerHTML={{__html: item?.howWorkTekst}}></p>}
                    </li>
                })}
            </ul>
        </section>
    );
};

export default EvacuatorPageHowWorkSection;
