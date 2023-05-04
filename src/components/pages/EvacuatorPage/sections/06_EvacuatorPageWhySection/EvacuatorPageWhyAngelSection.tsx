import React from 'react';
import * as styles from './EvacuatorPageWhyAngelSection.module.css'
import number1 from './images/1.svg'
import number2 from './images/2.svg'
import number3 from './images/3.svg'
import number4 from './images/4.svg'
import number5 from "./images/5.svg";
import number6 from "./images/6.svg";
import {useGlobalContext} from "../../../../../context/context";

const number = {
    number1,
    number2,
    number3,
    number4,
    number5,
    number6
}

const EvacuatorPageWhyAngelSection = () => {

    const {evacuatorPageData} = useGlobalContext()

    return (
        <div className={['container', styles.body].join(' ')}>
            <h2 className={styles.title}>Почему «АНГЕЛ»?</h2>
            <ul className={styles.list}>
                {evacuatorPageData?.wpPage?.whyAngel?.whyAngelSpisok?.map((item,index) => {
                    // @ts-ignore
                    const image = number['number' + (index + 1)]
                    return   <li key={index} className={styles.item}>
                        <img className={styles.number} src={image} alt=""/>
                        <div className={styles.item__content}>
                            <h3 className={styles.item__title}>{item?.whyAngelSpisokZagolovok}</h3>
                            {item?.whyAngelSpisokTekst && <p className={styles.item__text}
                                dangerouslySetInnerHTML={{__html: item?.whyAngelSpisokTekst}}></p>}
                        </div>
                    </li>
                } )}
            </ul>
        </div>
    );
};

export default EvacuatorPageWhyAngelSection;
