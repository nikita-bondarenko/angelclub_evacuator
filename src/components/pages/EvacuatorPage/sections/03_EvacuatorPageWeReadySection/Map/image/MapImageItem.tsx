import React, {ReactElement, useEffect, useLayoutEffect, useState} from 'react';
import * as styles from "../MapBlock.module.css";
import {useMapContextContext} from "../context/MapContext";

const MapImageItem = ({element, id, isPopupOpen}: { element: ReactElement, id: string, isPopupOpen: boolean }) => {

    const {updateTownById, openPopupById} = useMapContextContext()
    const [isPopup, setIsPopup] = useState(false)

    const desktopProps = {
        onMouseEnter: () => updateTownById({id, data: {isMouseEnter: true}}), onMouseLeave: () => updateTownById({id, data: {isMouseEnter: false}}),
    }
    const mobileProps = {
        onClick:(e:React.MouseEvent) => (e.stopPropagation(),setIsPopup(prev => !prev))
    }

    const [props, setProps] = useState<any>(desktopProps)

    useEffect(() => {
        setIsPopup(isPopupOpen)
    }, [isPopupOpen])

    useEffect(() => {
        if (isPopup) {
            openPopupById(id)
            // updateTownById({id, data: {isMouseEnter: true}})
            return () => {
                updateTownById({id, data: {isMouseEnter: false}})
            }
        }
    }, [isPopup])

    useLayoutEffect(() => {
        if (document.body.clientWidth < 1200) {
            setProps(mobileProps)
        }
    }, [])

    return (
        <g {...props}
            className={[styles.district, styles.stroke, isPopup ? styles.hover : ''].join(' ')}>{element}</g>
    );
};

export default MapImageItem;
