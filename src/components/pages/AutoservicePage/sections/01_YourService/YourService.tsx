import React, {useEffect} from 'react';
import {stack} from "../../../../../hooks/useClassName";
import * as styles from "./YourService.module.css";
import {GatsbyImage} from "gatsby-plugin-image";
import {useGlobalContext} from "../../../../../context/context";
import {usePrefixImage} from "../../../../../hooks/usePrefixImage";

const IconItem = ({yourTechcenterIzobrazhenie}:Queries.WpPage_Yourtechcenter_yourTechcenterSpisok) => {
    const [image] = usePrefixImage(yourTechcenterIzobrazhenie?.gatsbyImage)
    return <li
        className={styles.gallery__item} >
        {image &&
            <GatsbyImage className={'normalize-image'} alt={''}
                         image={image}></GatsbyImage>}
    </li>
}

const YourService = () => {

    const {autoservicePageData} = useGlobalContext()

const [image] = usePrefixImage(autoservicePageData?.wpPage?.yourTechcenter?.yourTechcenterIzobrazhenie?.gatsbyImage)
    return (
        <div className={stack('section-indent', 'container', styles.body)}>
            <div className={styles.top}>
                <div className={styles.content}>
                    {autoservicePageData?.wpPage?.yourTechcenter?.yourTechcenterTitle &&
                        <h1 className={stack('title-prime', styles.title)}
                            dangerouslySetInnerHTML={{__html: autoservicePageData?.wpPage?.yourTechcenter?.yourTechcenterTitle}}></h1>}
                    <p className={stack('text-prime', styles.text)}
                       dangerouslySetInnerHTML={{__html: autoservicePageData?.wpPage?.yourTechcenter?.yourTechcenterTekst}}></p>

                    <a className={stack(styles.button, 'button-prime')}
                       href={autoservicePageData?.wpPage?.yourTechcenter?.yourTechcenterHrefKnopki}>{autoservicePageData?.wpPage?.yourTechcenter?.yourTechcenterTekstKnopki}</a>
                </div>
                <div className={styles.image}>
                    {image &&
                        <GatsbyImage className={'normalize-image'}
                                     image={image}
                                     alt={''}></GatsbyImage>}
                </div>
            </div>
            <div className={styles.bottom}>
                <h2 className={stack('title-secondary', styles.bottom__title)}>{autoservicePageData?.wpPage?.yourTechcenter?.yourTechcenterZagolovokSpiska}</h2>
                <ul className={styles.gallery}>
                    {//@ts-ignore
                        autoservicePageData?.wpPage?.yourTechcenter?.yourTechcenterSpisok?.map((item, index) => <IconItem key={index} {...item}></IconItem>)}
                </ul>
            </div>

        </div>
    );

};

export default YourService;
