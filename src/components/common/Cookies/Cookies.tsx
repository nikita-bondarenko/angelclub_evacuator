import React, {useEffect, useState} from 'react';
import * as styles from './Cookies.module.css'
import {useWpCommonSection} from "../../../hooks/useWpCommonSection";

const Cookies = () => {
    const [isOpen, setIsOpen] = useState(false)
const [section] = useWpCommonSection('cookies')
    const toggleIsOpen = () => {
        setIsOpen(prev => !prev)
    }

    useEffect(() => {
        setTimeout( toggleIsOpen , 3000)
    }, [])


    return (
        <div className={[styles.body, isOpen ? styles.open : ''].join(' ')}>
            <div className={['container', styles.content].join(' ')}>
                <p className={styles.text}><a className={styles.link} href={section?.cookies?.cookiesPolitikaKonfidenczialnosti?.publicUrl} target={'_blank'}>{section?.cookies?.cookiesTekstSsylki}</a>{section?.cookies?.cookiesTekst}</p>
                <button onClick={toggleIsOpen} className={styles.button}>
                    {section?.cookies?.cookiesTekstKnopki}
                </button>
            </div>
        </div>
    );
};

export default Cookies;
