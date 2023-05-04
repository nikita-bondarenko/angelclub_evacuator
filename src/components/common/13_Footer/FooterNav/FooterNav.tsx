import React, {Fragment, useEffect, useState} from 'react';
import {NavLink, navLinks} from "../../01_Header/config";
import * as styles from './FooterNav.module.css'
import {useGlobalContext} from "../../../../context/context";
import {useWpCommonSection} from "../../../../hooks/useWpCommonSection";
import {withAssetPrefix} from "gatsby";

const FooterNav = () => {

    const {data} = useGlobalContext()
    const [links, setLinks] = useState<NavLink[]>([])
    const [section] = useWpCommonSection('podval')
    useEffect(() => {
        if (data) {
            const array = data?.allWpMenuItem?.nodes?.map(item => ({
                name: item.label,
                sub: item?.childItems?.nodes?.map(link => ({name: link.label, url: link.url})),
                url: item.url
            }))
            // @ts-ignore
            setLinks(array)
        }
    }, [data])
    return (
        <div className={['container', styles.body].join(' ')}>
            <div className={styles.top}>
                <p className={styles.top__text} dangerouslySetInnerHTML={{__html: section?.footer?.footerRemarka}}></p>
            </div>
            <div className={styles.bottom}>
                {section?.footer?.polzovatelskoeSoglashenie?.publicUrl && <a href={withAssetPrefix(section?.footer?.polzovatelskoeSoglashenie?.publicUrl)}
                    className={styles.bottom__doc}
                    target={'_blank'}>Пользовательское соглашение</a>}
                {section?.footer?.politikaKonfidenczialnosti?.publicUrl && <a href={withAssetPrefix(section?.footer?.politikaKonfidenczialnosti?.publicUrl)}
                    className={styles.bottom__doc}
                    target={'_blank'}>Политика конфиденциальности</a>}
                <span className={styles.bottom__logo} dangerouslySetInnerHTML={{__html: section?.footer?.tekstLogo}}></span>
            </div>
        </div>
    );
};

export default FooterNav;
