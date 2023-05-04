import React from 'react';
import Background from "../../../../common/Background/Background";
import {GatsbyImage} from "gatsby-plugin-image";
import {useGlobalContext} from "../../../../../context/context";
import * as styles from './CallMechanic.module.css'
import {stack} from "../../../../../hooks/useClassName";
import {usePrefixImage} from "../../../../../hooks/usePrefixImage";

const CallMechanic = () => {
    const {techHelpPageData} = useGlobalContext()

    const [image] = usePrefixImage(techHelpPageData?.wpPage?.callMechanic?.callMechanicIzobrazhenie?.gatsbyImage)
    return (
        <Background>
            <div className={stack('container',styles.body)}>
                <div className={styles.content}>
                    {techHelpPageData?.wpPage?.callMechanic?.callMechanicTekstInnerhtml &&
                        <p className={stack('text-prime', styles.text)}
                           dangerouslySetInnerHTML={{__html: techHelpPageData?.wpPage?.callMechanic?.callMechanicTekstInnerhtml}}></p>}
                    {techHelpPageData?.wpPage?.callMechanic?.callMechanicZhirnyjTekstVnizu && <p className={stack('text-prime', styles.text_strong)}
                        dangerouslySetInnerHTML={{__html: techHelpPageData?.wpPage?.callMechanic?.callMechanicZhirnyjTekstVnizu}}></p>}
                    {techHelpPageData?.wpPage?.callMechanic?.callMechanicHrefKnopki &&
                        <a className={stack('button-secondary', styles.button)}
                           href={techHelpPageData?.wpPage?.callMechanic?.callMechanicHrefKnopki}>{techHelpPageData?.wpPage?.callMechanic?.callMechanicTekstKnopki}</a>}
                </div>
                <div className={styles.image}>
                    {image &&
                        <GatsbyImage alt={''} className={'normalize-image'}
                                     image={image}></GatsbyImage>}
                </div>

            </div>
        </Background>
    );
};

export default CallMechanic;
