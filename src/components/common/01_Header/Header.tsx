import React, {useEffect, useState} from 'react';
import * as styles from './Header.module.css'
import Navigation from "./Navigation/Navigation";
import {navLinks} from "./config";
import {useGlobalContext} from "../../../context/context";

import {StaticImage, GatsbyImage, GatsbyImageProps, getImage} from "gatsby-plugin-image";

import {useImage} from "../../../hooks/useImage";
import useIsClient from "../../../hooks/useIsClient";
import {useWpCommonSection} from "../../../hooks/useWpCommonSection";
import {usePrefixImage} from "../../../hooks/usePrefixImage";



const Header = () => {

    const {setIsNavOpen, isNavOpen, data} = useGlobalContext()

    const [header] = useWpCommonSection('shapka')

    const barClickHandler = () => {
        setIsNavOpen(prev => !prev)
    }

    // const [logo] = useGatsbyImage('logo')

    useEffect(() => {
        if (isNavOpen) {
            document.body.style.overflowY = 'hidden'
            return () => {
                document.body.style.overflowY = 'auto'
            }
        }
    }, [isNavOpen])

    const [logo] = usePrefixImage(header?.header?.ikonkaLogotipa?.gatsbyImage)

    // useEffect(() => {console.log(header)}, [header])

const {isClient, key} = useIsClient()

    return (
        <div key={key} className={[styles.header].join(' ')}>
            <div className={[styles.header__body, 'container'].join(' ')}>
             <a href={header?.header?.hrefDlyaKnopkiLogotipa} target={'_blank'}
                    className={[styles.header__logo, styles.logo].join(' ')}>
                    {logo && <GatsbyImage className={[styles.logo__image].join(' ')} image={logo}
                                          alt={'Логотип'}></GatsbyImage>}
                    <span className={[styles.logo__title].join(' ')}>{header?.header?.tekstLogotipa}</span>
                </a>
                <Navigation  isOpen={isNavOpen}></Navigation>
                <button onClick={barClickHandler} className={styles.button}>
                    <svg className={[styles.button__images].join(' ')} viewBox="0 0 17 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect y="9.625" width="16.5" height="1.375" rx="0.6875" fill="#4D4D4D"/>
                        <rect y="4.8125" width="16.5" height="1.375" rx="0.6875" fill="#4D4D4D"/>
                        <rect width="16.5" height="1.375" rx="0.6875" fill="#4D4D4D"/>
                    </svg>
                </button>
            </div>
        </div>

    );
};

export default Header;
