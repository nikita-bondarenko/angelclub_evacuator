import React from 'react';
import {useGlobalContext} from "../../../../../context/context";
import {GatsbyImage} from "gatsby-plugin-image";
import * as styles from './HowWeHelp.module.css'
import {stack} from "../../../../../hooks/useClassName";
import {usePrefixImage} from "../../../../../hooks/usePrefixImage";

const HowWeHelpItem = (item: Queries.WpPage_Howcanwewelp_howCanWeHelpSpisok) => {
    const [image] = usePrefixImage(item?.howCanWeHelpIzobrazhenie?.gatsbyImage)

    return <li className={styles?.item}>
        {image && <GatsbyImage className={styles.item__image} image={image} alt={''} ></GatsbyImage>}
        {item?.howCanWeHelpZagolovok && <h3 className={stack(styles.item__title)}
             dangerouslySetInnerHTML={{__html: item?.howCanWeHelpZagolovok}}></h3>}
        {item?.howCanWeHelpTekst && <p className={stack('text-prime', styles.item__text)}
            dangerouslySetInnerHTML={{__html: item?.howCanWeHelpTekst}}></p>}
    </li>
}

const HowWeHelp = () => {
    const { techHelpPageData } = useGlobalContext()

    return (
        <div className={stack('section-indent', 'container', styles?.body)}>
            {techHelpPageData?.wpPage?.howCanWeWelp?.howCanWeHelpZagolovok && <h2 className={stack('title-secondary', styles.title)}
                 dangerouslySetInnerHTML={{__html: techHelpPageData?.wpPage?.howCanWeWelp?.howCanWeHelpZagolovok}}></h2>}
           <ul className={styles.list}>
               {//@ts-ignore
                   techHelpPageData?.wpPage?.howCanWeWelp?.howCanWeHelpSpisok?.map((item, index) => <HowWeHelpItem {...item} key={index}></HowWeHelpItem>)}
           </ul>
        </div>
    );
};

export default HowWeHelp;
