import React from 'react';
import * as styles from './SupportLine.module.css'
import Background from "../Background/Background";
import {useGlobalContext} from "../../../context/context";
import {useWpCommonSection} from "../../../hooks/useWpCommonSection";

const SupportLine = () => {

    const [section] = useWpCommonSection('my-na-svyazi')

    return (
        <Background>
            <div className={['container', styles.body].join(' ')}>
                <p className={styles.text}> {section?.online?.onlineTekst && <span className={styles.text}
                    dangerouslySetInnerHTML={{__html: section?.online?.onlineTekst}}></span>}<span className={styles.point}>.</span> <br className={styles.br}/> {
                    (section?.online?.onlineHrefSsylki && section?.online?.onlineTekstSsylki) &&  <a
                        className={styles.link}
                        href={section?.online?.onlineHrefSsylki} dangerouslySetInnerHTML={{__html: section?.online?.onlineTekstSsylki}}></a>}</p>
            </div>
        </Background>
    );
};

export default SupportLine;
