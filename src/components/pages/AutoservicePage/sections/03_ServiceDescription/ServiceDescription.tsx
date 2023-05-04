import React, {useEffect, useState} from 'react';
import {GatsbyImage} from "gatsby-plugin-image";
import {useGatsbyImage} from "../../../../../hooks/useGatsbyImage";
import * as styles from './ServiceDescription.module.css'
import {stack} from "../../../../../hooks/useClassName";
import {useGlobalContext} from "../../../../../context/context";
import {usePrefixImage} from "../../../../../hooks/usePrefixImage";


type ServiceDescriptionItemProps = Queries.WpPage_Techservicedescription_techserviceDescriptionSpisok & {
    index: number
}
const ServiceDescriptionItem = ({
                              index,
    techserviceDescriptionTekstInnerhtml,
    techserviceDescriptionTekstSnoski,
    techserviceDescriptionZagolovok,
    techserviceDescriptionIzobrazhenie
                              }: ServiceDescriptionItemProps) => {
    const isItemHonest = (index + 1) % 2 === 0
    const [objectPosition, setObjectPosition] = useState('center')

    const {autoservicePageData: {wpPage}} = useGlobalContext()


    // useEffect(() => {
    //     const itemNumber = index + 1
    //     if (document.body.clientWidth < 990) {
    //         (itemNumber === 1 || itemNumber === 4) && setObjectPosition('right')
    //     }
    // }, [])

    const [image] = usePrefixImage(techserviceDescriptionIzobrazhenie?.gatsbyImage)


    return <li className={stack(styles.item, isItemHonest ? styles.honest : '')}>
        {image &&
            <GatsbyImage className={styles.item__image} objectPosition={objectPosition}
                         image={image} alt={''}></GatsbyImage>}
        <div className={styles.item__content}>
            {techserviceDescriptionZagolovok && <h2 className={stack('title-secondary', styles.item__title)}
                                               dangerouslySetInnerHTML={{__html: techserviceDescriptionZagolovok}}></h2>}
            {techserviceDescriptionTekstInnerhtml && <p className={stack('text-prime', styles.item__text)}
                                          dangerouslySetInnerHTML={{__html: techserviceDescriptionTekstInnerhtml}}></p>}
            {techserviceDescriptionTekstSnoski && <p className={styles.item__note}>*{techserviceDescriptionTekstSnoski}</p>}
        </div>
    </li>
}

const ServiceDescription = () => {

    const {autoservicePageData} = useGlobalContext()

    return (
        <section className={stack('container', 'section-indent')}>
            <ul className={styles.list}>
                {
                    // @ts-ignore
                    autoservicePageData?.wpPage?.techserviceDescription?.techserviceDescriptionSpisok?.map((item, index) => <ServiceDescriptionItem
                        key={index}
                        {...item} index={index}></ServiceDescriptionItem>)}
            </ul>
        </section>

    );
};

export default ServiceDescription;
