import React, {createRef, useEffect, useLayoutEffect, useState} from 'react';
import * as styles from './MapPopupItem.module.css'
import { TownListItem} from "../towns/InfoList/MapTownList";
import {useMapContextContext} from "../context/MapContext";
import {GatsbyImage} from "gatsby-plugin-image";
import {useGlobalContext} from "../../../../../../../context/context";
import {usePrefixImage} from "../../../../../../../hooks/usePrefixImage";

const MapPopupItem = ({id, left, width, top, townFull, price, time, isMouseEnter, query}: TownListItem) => {

    const {updateTownById} = useMapContextContext()
const {evacuatorPageData} = useGlobalContext()
    const onMouseEnterHandler = (e: React.MouseEvent) => {
        updateTownById({id, data: {isMouseEnter: true}})
    }

    const onMouseLeaveHandler = (e: React.MouseEvent) => {
        updateTownById({id, data: {isMouseEnter: false}})
    }
const [image] = usePrefixImage(evacuatorPageData?.wpPage?.whereAreYou?.whereAreYouPopupImage?.gatsbyImage)
    return (
        <div onClick={(e) => e.stopPropagation()} className={styles.point} style={{top: top, left: left, width: width}}>
            <div className={styles.point__wrapper}>
                <div onMouseLeave={onMouseLeaveHandler} onMouseEnter={onMouseEnterHandler} style={isMouseEnter ? {opacity: 1, visibility: 'visible' } : {opacity: 0, visibility: 'hidden'}} className={styles.popup}>
                    <div className={styles.popup__body}>
                        {query.whereAreYouPolnoeNazvanie &&<h3 className={styles.title}
                             dangerouslySetInnerHTML={{__html: query.whereAreYouPolnoeNazvanie}}></h3>}
                        <div className={styles.car}>
                            {image && <GatsbyImage image={image} alt={''} className={styles.car__image}></GatsbyImage>
                            }                            <p className={styles.car__text}>эвакуаторов: <strong>{query.whereAreYouKolichestvoEvakuatorov}</strong></p>
                        </div>
                        <div className={styles.devider}>
                        </div>
                        <div className={styles.content}>
                            {query.whereAreYouOkrugSpisok?.map((item, index) =>  <p key={index} className={styles.content__text}>{item?.whereAreYouOkrugSpisokNazvanie}: <strong>{item?.whereAreYouOkrugSpisokTekst}</strong></p>)}
                        </div>

                        {evacuatorPageData?.wpPage?.whereAreYou?.whereAreYouPopupLinkHref && <a href={evacuatorPageData?.wpPage?.whereAreYou?.whereAreYouPopupLinkHref}
                            className={styles.button}>{evacuatorPageData?.wpPage?.whereAreYou?.whereAreYouPopupLinkText}</a>}
                    </div>
                    <div className={styles.popup__decor}></div>
                    <div className={styles.popup__lack}></div>
                </div>
            </div>
        </div>
    );
};

export default MapPopupItem;
