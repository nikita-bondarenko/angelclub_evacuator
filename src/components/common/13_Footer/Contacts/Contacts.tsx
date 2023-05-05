import React, {useEffect, useLayoutEffect, useState} from 'react';
import * as styles from './Contacts.module.css'
import {GatsbyImage, getImage, ImageDataLike} from "gatsby-plugin-image";
import useWa from "../hooks/useWa";
import {useGlobalContext} from "../../../../context/context";
import {YMaps, Map, Placemark} from '@pbe/react-yandex-maps';
import marker from './marker.png'
import {useWpCommonSection} from "../../../../hooks/useWpCommonSection";
import {usePrefixImage} from "../../../../hooks/usePrefixImage";
import ContactItem from "./ContactItem/ContactItem";
import {stack} from "../../../../hooks/useClassName";
import {ignore} from "gatsby/dist/schema/infer/inference-metadata";
import {AllWpMenuItemNode} from "../../../../types/types";

const PhoneListItem = ({
                           footerPhonesIkonka,
                           footerPhonesZagolovok,
                           footerPhonesBolshojTekst, footerPhonesMalenkijTekst
                       }: Queries.WpCommonSections_Footer_footerSpisokTelefonov) => {
    const [image] = usePrefixImage(footerPhonesIkonka?.gatsbyImage)
    return <li className={styles.listItem}>
        {footerPhonesZagolovok &&
            <h3 className={styles.listTitle} dangerouslySetInnerHTML={{__html: footerPhonesZagolovok}}></h3>}
        <div className={styles.listItem__body}>
            {image && <GatsbyImage image={image} alt={''} className={styles.listIcon}></GatsbyImage>}
            <div className={styles.listItem__content}>
                <p className={styles.listText}>{footerPhonesBolshojTekst} </p>
                <p className={styles.listSubtext}>{footerPhonesMalenkijTekst}</p>
            </div>
        </div>

    </li>
}

const SocialListItem = ({footerSocialHrefSsylki, footerSocialTekstSsylki, footerSocialZagolovok, footerSocialIkonka} : Queries.WpCommonSections_Footer_footerSocialSpisok) => {
    const [image] = usePrefixImage(footerSocialIkonka?.gatsbyImage)

    return <li className={styles.listItem}>
        {footerSocialZagolovok &&
            <h3 className={styles.listTitle} dangerouslySetInnerHTML={{__html: footerSocialZagolovok}}></h3>}
        <div className={styles.listItem__body}>
            {image && <GatsbyImage image={image} alt={''} className={styles.listIcon}></GatsbyImage>}
                {footerSocialHrefSsylki && <a className={styles.listLink} href={footerSocialHrefSsylki}>{footerSocialTekstSsylki} </a>}
        </div>
    </li>
}

const NavItem = ({label, childItems, url}: AllWpMenuItemNode) => {

   
    return <li className={styles.nav__item}>
        {childItems?.nodes.length ? <h3 className={stack(styles.nav__main, styles.nav__title)}>{label}</h3> : <a target={!url.includes('#') ? '_blank' : '_self'} className={stack(styles.nav__main, styles.nav__link)} href={url}>{label}</a>}
        {!!childItems?.nodes.length && <ul className={styles.nav__subList}>
            {
                childItems?.nodes.map(({url, label}, index) => <li key={index} className={styles.nav__subItem}>
                <a target={url.includes('#') ?  '_self' : '_blank'}  className={stack(styles.nav__sub, styles.nav__link)} href={url}>{label}</a>
            </li>)}
        </ul>}
    </li>

}

const PlaceListItem = ({index, footerPlaceTekst, footerPlaceZagolovok}: Queries.WpCommonSections_Footer_footerAdresa & {index: number}) => {
    const [section] = useWpCommonSection('podval')
    const [mapCenter, setMapCenter] = useState<[number, number]>()
    const [markerPosition, setMarkerPosition] = useState<[number, number]>()
    useEffect(() => {
        if (section && section?.footer?.footerPlaceKoordinatyCzentraKarty && section?.footer?.footerPlaceKoordinatyMarkera && index === 1) {
            const position = JSON.parse(section?.footer?.footerPlaceKoordinatyCzentraKarty)
            position && setMapCenter(position)
            const center = JSON.parse(section?.footer?.footerPlaceKoordinatyMarkera)
            center && setMarkerPosition(center)
        }
    }, [section])
    return <React.Fragment>
        <li className={styles.places__item}>
            <span className={styles.places__label}>{footerPlaceZagolovok}</span> <span className={styles.places__text} dangerouslySetInnerHTML={{__html: footerPlaceTekst}}></span>
        </li>
        {(index === 1 && mapCenter)&& <YMaps>
            <Map className={styles.map}
                 defaultState={{center: mapCenter, zoom: 13,}}>
                <Placemark defaultGeometry={markerPosition}
                           defaultOptions={{
                               iconImageSize: [30, 30],
                               iconImageHref: marker,
                               iconLayout: 'default#image'
                           }}></Placemark>
            </Map>
        </YMaps>}
    </React.Fragment>
}
const Contacts = () => {

    const { data} = useGlobalContext()
    const [section] = useWpCommonSection('podval')

    return (
        <div id={'contacts'} className={styles.body}>
            <ul className={stack(styles.phones)}>
                {section?.footer?.footerSpisokTelefonov?.map((item, index) => <PhoneListItem {...item} key={index}></PhoneListItem>)}
            </ul>
            <ul className={styles.social}>
                {section?.footer?.footerSocialSpisok?.map((item, index) => <SocialListItem {...item} key={index}></SocialListItem>)}
            </ul>

            <ul className={styles.nav}>
                {data?.allWpMenuItem?.nodes?.map((item, index) => <NavItem {...item} key={index}></NavItem>)}
            </ul>
<ul className={styles.places}>
    {section?.footer?.footerAdresa?.map((item, index) => <PlaceListItem {...item} index={index} key={index}></PlaceListItem>)}
</ul>
        </div>
    );
};

export default Contacts;
