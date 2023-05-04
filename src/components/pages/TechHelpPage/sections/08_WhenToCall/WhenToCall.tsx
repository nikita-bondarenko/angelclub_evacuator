import React from 'react';
import {useGlobalContext} from "../../../../../context/context";
import {GatsbyImage} from "gatsby-plugin-image";
import * as styles from './WhenToCall.module.css'
import {stack} from "../../../../../hooks/useClassName";
import {usePrefixImage} from "../../../../../hooks/usePrefixImage";

const WhenToCallItem = (item: Queries.WpPage_WhenToCall_whenToCallSpisok) => {
    const [image] = usePrefixImage(item?.whenToCallIzobrazhenie?.gatsbyImage)
    return <li className={styles.item}>
        {image && <GatsbyImage className={styles.item__image} alt={''} image={image}></GatsbyImage>}
        {item?.whenToCallZagolovokInnerhtml && <h3 className={stack('title-small',styles.item__title)} dangerouslySetInnerHTML={{__html: item?.whenToCallZagolovokInnerhtml}}></h3>}
        {item?.whenToCallTekstInnerhtml && <p className={stack('text-secondary',styles.item__text)} dangerouslySetInnerHTML={{__html: item?.whenToCallTekstInnerhtml}}></p>}
    </li>
}

const WhenToCall = () => {
    const {techHelpPageData} = useGlobalContext()
    const [gift] = usePrefixImage(techHelpPageData?.wpPage?.gift?.giftIzobrazhenie?.gatsbyImage)

    return (
        <div className={stack('section-indent', 'container', styles.body)}>
            {techHelpPageData?.wpPage?.when_to_call?.whenToCallZagolovok && <h2 className={stack('title-secondary', styles.title)}
                 dangerouslySetInnerHTML={{__html: techHelpPageData?.wpPage?.when_to_call?.whenToCallZagolovok}}></h2>}
            <ul className={styles.list}>
                {//@ts-ignore
                    techHelpPageData?.wpPage?.when_to_call?.whenToCallSpisok?.map((item, index) => <WhenToCallItem {...item} key={index}></WhenToCallItem>)}
            </ul>
            <div className={stack(styles.bottom)}>
                {gift &&
                    <GatsbyImage className={styles.bottom__image} alt={''}
                                 image={gift}></GatsbyImage>}
                <div className={styles.bottom__content}>
                    {techHelpPageData?.wpPage?.gift?.giftTekstVverhu && <p className={stack('text-secondary', styles.bottom__title)}
                        dangerouslySetInnerHTML={{__html: techHelpPageData?.wpPage?.gift?.giftTekstVverhu}}></p>}
                    {techHelpPageData?.wpPage?.gift?.giftTekstVnizu &&
                        <p className={stack('text-secondary', styles.bottom__text)}
                           dangerouslySetInnerHTML={{__html: techHelpPageData?.wpPage?.gift?.giftTekstVnizu}}></p>}
                </div>
            </div>
        </div>
    );
};

export default WhenToCall;
