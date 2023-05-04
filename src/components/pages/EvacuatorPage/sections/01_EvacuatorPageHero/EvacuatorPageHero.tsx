import React from 'react';
import * as styles from './EvacuatorPageHero.module.css'
import {useGlobalContext} from "../../../../../context/context";
import HeroSection from "./Hero/HeroSection";
import {GatsbyImage} from "gatsby-plugin-image";
import {useGatsbyImage} from "../../../../../hooks/useGatsbyImage";
import {graphql, useStaticQuery} from "gatsby";
import decor1920x1 from './images/hero-decor-1920-1x.png'
import decor1920x2 from './images/hero-decor-1920-2x.png'
import decorDesktopX1 from './images/hero-decor-desktop-1x.png'
import decorDesktopX2 from './images/hero-decor-desktop-2x.png'
import decorMobileX1 from './images/hero-decor-mobile-1x.png'
import decorMobileX2 from './images/hero-decor-mobile-2x.png'
import {usePrefixImage} from "../../../../../hooks/usePrefixImage";


const EvacuatorPageHero = () => {

    const {evacuatorPageData} = useGlobalContext()

const [image] = usePrefixImage(evacuatorPageData?.wpPage?.needEvacuator?.needEvacuatorIzobrazhenie?.gatsbyImage)
    return (
        <>
            <section className={styles.top}>
                {/*<div className={styles.top__wrapper}>*/}
                {/*</div>*/}
                <picture className={styles.decor}>
                    <source className={styles.picture__image}
                            srcSet={`${decorMobileX1} 1x, ${decorMobileX2} 2x`} media={'(max-width:989px'}/>
                    <source className={styles.picture__image}
                            srcSet={`${decorDesktopX1} 1x, ${decorDesktopX2} 2x`} media={'(max-width:1299px'}/>
                    <img className={styles.decor__image} src={decor1920x1}
                         srcSet={`${decor1920x2} 2x`} alt=""/>
                </picture>

                {image && <GatsbyImage image={image} alt={''} className={styles.picture}></GatsbyImage>}
                <HeroSection></HeroSection>
            </section>
        </>
    );
};

export default EvacuatorPageHero;
