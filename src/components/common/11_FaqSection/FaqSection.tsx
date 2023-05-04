import React, {createRef, useLayoutEffect, useState} from 'react';
import {faqs} from "../../pages/EvacuatorPage/config";
import * as styles from './FaqSection.module.css'
import arrow from './images/top-arrow.svg'
import ToTopButton from "../ToTopButton/ToTopButton";
import {useGlobalContext} from "../../../context/context";

export type Faq = {
    title: string,
    text: string
}

type FaqSectionProps = {
    faqs: Faq[],
    pageName?: 'main' | 'evacuator'
}



const FaqSection = ({ faqs, pageName}: FaqSectionProps) => {

    const {data} = useGlobalContext()

    return (
        <div className={[styles.body, 'container'].join(' ')}>
            <h2 className={styles.title}>{data?.wpPage?.questions?.questionsZagolovok}</h2>
            <ul className={styles.list}>
                {data?.wpPage?.questions?.questionsSpisok?.map((item, index) => {
                    const [isOpen, setIsOpen] = useState(false)
                    const [textHeight, setTextHeight] = useState<number>()
                    const ref = createRef<HTMLParagraphElement>()

                    useLayoutEffect(() => {
                        setTextHeight(ref.current?.clientHeight)
                    }, [ref])

                    const clickHandler = () => setIsOpen(prev => !prev)

                    return (<li onClick={clickHandler} className={styles.list__item} key={index}>
                        {item?.questionsListZagolovok && <h3 className={styles.item__title}
                             dangerouslySetInnerHTML={{__html: item?.questionsListZagolovok}}></h3>}
                        <button className={[styles.item__button, isOpen ? styles.open : ''].join(' ')} ><img
                            className={styles.item__icon} src={arrow} alt=""/></button>
                        <div className={styles.item__wrapper} style={{height: isOpen ? textHeight : 0}}>
                            {item?.questionsListOtvet && <p className={styles.item__text} ref={ref}
                                dangerouslySetInnerHTML={{__html: item?.questionsListOtvet}}></p>}
                        </div>
                    </li>)
                })}
            </ul>
            {pageName === 'evacuator' && <ToTopButton></ToTopButton>}
        </div>
    );
};

export default FaqSection;
