import React from 'react';
import Background from "../../../../common/Background/Background";
import * as styles from './AutoserviceAdvantage.module.css'
import {stack} from "../../../../../hooks/useClassName";
import {useGlobalContext} from "../../../../../context/context";
import {GatsbyImage} from "gatsby-plugin-image";
import {usePrefixImage} from "../../../../../hooks/usePrefixImage";

const ListItem = (item : Queries.WpPage_Autoserviceadvantage_autoserviceAdvantageSpisok) => {
    const [image] = usePrefixImage(item?.autoserviceAdvantageIzobrazhenie?.gatsbyImage)

    return <li className={styles.item}>
        {image && <GatsbyImage image={image} alt={''} className={styles.item__image}></GatsbyImage>}
        <h3 className={stack('title-small', styles.item__title)}>{item?.autoserviceAdvantageZagolovok}</h3>
        {item?.autoserviceAdvantageTekst && <p className={stack('text-secondary', styles.item__text)}
                                               dangerouslySetInnerHTML={{__html: item?.autoserviceAdvantageTekst}}></p>}
    </li>
}

const AutoserviceAdvantage = () => {

    const {autoservicePageData} = useGlobalContext()
    return (
        <Background>
            <ul className={stack('container', styles.body)} >
                {//@ts-ignore
                    autoservicePageData?.wpPage?.autoserviceAdvantage?.autoserviceAdvantageSpisok?.map((item, index) => <ListItem key={index} {...item}></ListItem>)}
            </ul>
        </Background>
    );
};

export default AutoserviceAdvantage;
