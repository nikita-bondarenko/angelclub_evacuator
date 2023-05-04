import React from 'react';
import * as styles from "./Gift.module.css";
import {GatsbyImage} from "gatsby-plugin-image";
import {stack} from "../../../../../hooks/useClassName";
import {useGlobalContext} from "../../../../../context/context";
import {usePrefixImage} from "../../../../../hooks/usePrefixImage";

const Gift = () => {

    const {techHelpPageData} = useGlobalContext()

    const [image] = usePrefixImage(techHelpPageData?.wpPage?.gift?.giftIzobrazhenie?.gatsbyImage)
    return (
       <section className={stack('section-indent', 'container')}>
        <div className={stack(styles.bottom)}>
            {image &&
                <GatsbyImage className={styles.bottom__image} alt={''}
                             image={image}></GatsbyImage>}
            <div className={styles.bottom__content}>
                <p className={stack('text-secondary', styles.bottom__title)}>{techHelpPageData?.wpPage?.gift?.giftTekstVverhu}</p>
                {techHelpPageData?.wpPage?.gift?.giftTekstVnizu &&
                    <p className={stack('text-secondary', styles.bottom__text)}
                       dangerouslySetInnerHTML={{__html: techHelpPageData?.wpPage?.gift?.giftTekstVnizu}}></p>}
            </div>
        </div>
       </section>
    );
};

export default Gift;
