import React from 'react';
import MapPopupItem from "./MapPopupItem";
import {useMapContextContext} from "../context/MapContext";

const MapPopupList = () => {

    const {towns} = useMapContextContext()

    return (
       <>
           {towns.map(item => <MapPopupItem {...item} key={item.id}/>)}
       </>
    );
};

export default MapPopupList;
