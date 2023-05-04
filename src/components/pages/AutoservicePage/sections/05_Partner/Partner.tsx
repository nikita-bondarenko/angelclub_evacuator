import React from 'react';
import {stack} from "../../../../../hooks/useClassName";
import * as styles from "./Partner.module.css";
import {GatsbyImage} from "gatsby-plugin-image";
import {useGlobalContext} from "../../../../../context/context";
import {usePrefixImage} from "../../../../../hooks/usePrefixImage";

const GalleryItem = ({partnerGalereyaIzobrazhenie} : Queries.WpPage_Partner_partnerGalereya) => {

    const [image] = usePrefixImage(partnerGalereyaIzobrazhenie?.gatsbyImage)
    if (!image) return null
    return <GatsbyImage image={image} alt={''}
                        className={styles.gallery__item}></GatsbyImage>
}

const Partner = () => {


    const {autoservicePageData} = useGlobalContext()
    const [image] = usePrefixImage(autoservicePageData?.wpPage?.partner?.partnerIzobrazhenieVverhu?.gatsbyImage)

    return (
        <div className={stack('container', 'section-indent')}>
            <div className={styles.top}>
                <h2 className={[styles.title, styles.first].join(' ')}>{autoservicePageData?.wpPage?.partner?.partnerZagolovok}</h2>
                {image &&
                    <GatsbyImage  objectFit={'contain'}
                                  image={image}
                                  alt={''}
                                  className={styles.top__picture}></GatsbyImage>
                }
                <div className={styles.top__content}>
                    <h2 className={[styles.title, styles.second].join(' ')}>{autoservicePageData?.wpPage?.partner?.partnerZagolovok}</h2>
                    {autoservicePageData?.wpPage?.partner?.partnerTekst && <p className={styles.top__text}
                                                                                            dangerouslySetInnerHTML={{__html: autoservicePageData?.wpPage?.partner?.partnerTekst}}></p>}
                </div>
            </div>
            <div className={styles.gallery}>
                {//@ts-ignore
                    autoservicePageData?.wpPage?.partner?.partnerGalereya?.map((item, index) => <GalleryItem {...item} key={index}></GalleryItem>)}
            </div>
            <div id={'orderform'}></div>
        </div>
    );
};

export default Partner;
