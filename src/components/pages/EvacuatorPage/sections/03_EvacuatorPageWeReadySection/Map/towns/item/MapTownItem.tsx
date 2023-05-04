import React, {createRef, ReactElement, ReactNode, useEffect, useLayoutEffect, useState} from 'react';
import {TownInfoType, TownListItem} from "../InfoList/MapTownList";
import * as styles from './MapTownItem.module.css'
import {useMapContextContext} from "../../context/MapContext";
import {createPortal} from "react-dom";

type MapTownItemProps = {
    children?: ReactNode | ReactElement,
} & TownListItem

const MapTownItem = ({children, townShort, townFull, id, price, time, query}: MapTownItemProps) => {

    const {y, x, scrollY, updateTownById, size} = useMapContextContext()
    const [log, setLog] = useState(0)

    const ref = createRef<any>()

    useEffect(() => {

        const info = ref.current.getBoundingClientRect()
        updateTownById({id, data: {top: info.top, left: info.left, width: info.width}})

    }, [y, x, scrollY, log])

    useEffect(() => {
        setTimeout(() => {
            setLog(size)
        }, 200)
    }, [size])
    return (
        <>
            <div onClick={e => (e.preventDefault(), e.stopPropagation())} ref={ref}
                 className={[styles.towtrucks__district, styles['towtrucks__district__' + id]].join(' ')}>
                <span>{query.whereAreYouSokrashhennoeNazvanie}</span>
            </div>
        </>

    );
};

export default MapTownItem;
