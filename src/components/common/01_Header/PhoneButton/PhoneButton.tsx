import React, {useEffect, useState} from 'react';
import * as styles from './PhoneButton.module.css'
import {useGlobalContext} from "../../../../context/context";
import {usePost} from "../../../../hooks/usePost";
import {useWpCommonSection} from "../../../../hooks/useWpCommonSection";

const PhoneButton = ({className}: { className?: string }) => {

    const [width, setWidth] = useState(0)
    const [isDark, setIsDark] = useState(false)
    const changeColor = () => setIsDark(prev => !prev)
    const [header] = useWpCommonSection('shapka')

    useEffect(() => {
        setWidth(document.body.clientWidth)
        setTimeout(() => {
            changeColor()
            setInterval(changeColor, 4000)
        }, 500)

    }, [])

    if (!header?.header?.hrefKnopkiVyzova) return null

    return (
        <a className={[styles.phone, isDark ? styles.dark : ''].join(' ')}
           href={header?.header?.hrefKnopkiVyzova}>
            <div className={styles.phone__back}></div>
            <div className={styles.phone__content}>
                <svg className={styles.phone__icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill="none" d="M0 0h24v24H0V0z"/>
                    <path
                        d="M19.23 15.26l-2.54-.29c-.61-.07-1.21.14-1.64.57l-1.84 1.84c-2.83-1.44-5.15-3.75-6.59-6.59l1.85-1.85c.43-.43.64-1.03.57-1.64l-.29-2.52c-.12-1.01-.97-1.77-1.99-1.77H5.03c-1.13 0-2.07.94-2 2.07.53 8.54 7.36 15.36 15.89 15.89 1.13.07 2.07-.87 2.07-2v-1.73c.01-1.01-.75-1.86-1.76-1.98z"/>
                </svg>
                {header?.header?.tekstKnopkiVyzova}
            </div>
            <div className={styles.icon}>
                {width >= 1300 && <svg className={styles.svg} width="226" height="60" viewBox="0 0 226 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="226" height="60" rx="8" fill="#F0FA00"/>
                </svg>
                }
                {(width < 1300 && width >= 1200) && <svg className={styles.svg} width="160" height="45" viewBox="0 0 160 45" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                    <rect width="160" height="45" rx="8" fill="none"/>
                </svg>}
                {(width < 1200 && width >= 989) &&
                    <svg className={styles.svg} width="148" height="35" viewBox="0 0 148 35" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <rect width="148" height="35" rx="4" fill="none"/>
                    </svg>}
                {(width < 989 && width >= 480) &&
                    <svg className={styles.svg} width="148" height="35" viewBox="0 0 148 35" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <rect width="148" height="35" rx="4" fill="none"/>
                    </svg>}
                {width < 480 && <svg className={styles.svg} width="139" height="30" viewBox="0 0 139 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="139" height="30" rx="4" fill="none"/>
                </svg>}
            </div>
        </a>
    );
};

export default PhoneButton;
