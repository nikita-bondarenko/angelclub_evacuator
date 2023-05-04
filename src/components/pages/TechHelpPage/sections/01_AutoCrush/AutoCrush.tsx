import React, {useEffect} from 'react';
import * as styles from './AutoCrush.module.css'
import {useGlobalContext} from "../../../../../context/context";
import {GatsbyImage} from "gatsby-plugin-image";
import {stack} from "../../../../../hooks/useClassName";
import {usePrefixImage} from "../../../../../hooks/usePrefixImage";

const AutoCrush = () => {
    const {techHelpPageData} = useGlobalContext()
    useEffect(() => {
        if (techHelpPageData) {
            // console.log(techHelpPageData.wpPage?.autoCrashed)
        }
    }, [techHelpPageData])

    const [image] = usePrefixImage(techHelpPageData?.wpPage?.autoCrashed?.autoCrashedIzobrazhenie?.gatsbyImage)
    return (
        <div className={stack('section-indent', 'container', styles.body)}>
            <div className={styles.content}>
                {techHelpPageData?.wpPage?.autoCrashed?.autoCrashedTitle && <h1 className={stack('title-prime',styles.title)}
                     dangerouslySetInnerHTML={{__html: techHelpPageData?.wpPage?.autoCrashed?.autoCrashedTitle}}></h1>}
                {techHelpPageData?.wpPage?.autoCrashed?.autoCrashedTekst && <p className={stack('text-prime', styles.text)}
                    dangerouslySetInnerHTML={{__html: techHelpPageData?.wpPage?.autoCrashed?.autoCrashedTekst}}></p>}
                {techHelpPageData?.wpPage?.autoCrashed?.autoCrashedHrefKnopki &&
                    <a className={stack(styles.button, 'button-prime')} href={techHelpPageData?.wpPage?.autoCrashed?.autoCrashedHrefKnopki}>{techHelpPageData?.wpPage?.autoCrashed?.autoCrashedTekstKnopki}</a>}
            </div>
            <div className={styles.image}>
                {image && <GatsbyImage className={'normalize-image'} image={image} alt={''} ></GatsbyImage>}
            </div>

        </div>
    );
};

export default AutoCrush;
