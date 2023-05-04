import React from 'react';
import * as styles from './EvacuatorPageAutopark.module.css'
import {useGatsbyImage} from "../../../../../hooks/useGatsbyImage";
import {GatsbyImage, IGatsbyImageData} from "gatsby-plugin-image";
import {useGlobalContext} from "../../../../../context/context";
import {usePrefixImage} from "../../../../../hooks/usePrefixImage";


const GalleryItem = (image: IGatsbyImageData) => {
    const [picture] = usePrefixImage(image)

    if (!picture) return null

    return <GatsbyImage image={picture} alt={''}
                        className={styles.gallery__item}></GatsbyImage>
}

const EvacuatorPageAutopark = () => {


    const [mainImage] = useGatsbyImage('autopark-main')
    const [image1] = useGatsbyImage('autopark-1')
    const [image2] = useGatsbyImage('autopark-2')
    const [image3] = useGatsbyImage('autopark-3')

    const {evacuatorPageData} = useGlobalContext()
    const [image] = usePrefixImage(evacuatorPageData?.wpPage?.autopark?.autoparkIzobrazhenieVverhu?.gatsbyImage)

    return (
        <div className={['container', styles.body].join(' ')}>
            <div className={styles.top}>
                <h2 className={[styles.title, styles.first].join(' ')}>{evacuatorPageData?.wpPage?.autopark?.autoparkZagolovok}</h2>
                {image &&
                    <GatsbyImage  objectFit={'contain'}
                                 image={image}
                                 alt={''}
                                 className={styles.top__picture}></GatsbyImage>
                }
                <div className={styles.top__content}>
                    <h2 className={[styles.title, styles.second].join(' ')}>{evacuatorPageData?.wpPage?.autopark?.autoparkZagolovok}</h2>
                    {evacuatorPageData?.wpPage?.autopark?.autoparkTekstPosleZagolovka && <p className={styles.top__text}
                                                                                            dangerouslySetInnerHTML={{__html: evacuatorPageData?.wpPage?.autopark?.autoparkTekstPosleZagolovka}}></p>}
                </div>
            </div>
            <div className={styles.gallery}>
                {//@ts-ignore
                    evacuatorPageData?.wpPage?.autopark?.autoparkGalereya?.map((item, index) => <GalleryItem key={index} {...item?.autoparkGalleryIzobrazhenie?.gatsbyImage}></GalleryItem>)}
            </div>
            {evacuatorPageData?.wpPage?.autopark?.autoparkTekstSnizu && <p className={styles.text}
                dangerouslySetInnerHTML={{__html: evacuatorPageData?.wpPage?.autopark?.autoparkTekstSnizu}}></p>}
        </div>
    );
};

export default EvacuatorPageAutopark;
