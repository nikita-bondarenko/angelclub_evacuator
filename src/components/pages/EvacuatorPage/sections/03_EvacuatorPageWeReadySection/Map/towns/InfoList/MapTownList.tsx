import React, {ReactElement, ReactNode, useEffect, useState} from 'react';
import MapTownItem from "../item/MapTownItem";
import CAO from "../CAO";
import SVAO from "../SVAO";
import SAO from "../SAO";
import UAO from "../UAO";
import SZAO from "../SZAO";
import Newmoscow from "../Newmoscow";
import UZAO from "../UZAO";
import Zelenograd from "../Zelenograd";
import VAO from "../VAO";
import Troitsk from "../Troitsk";
import UVAO from "../UVAO";
import ZAO from "../ZAO";
import {useGlobalContext} from "../../../../../../../../context/context";

export type TownInfoType = {
    townShort: string,
    townFull: string,
    id: string,
    price: number,
    time: string,
    top: number,
    left: number,
    width: number,
    isMouseEnter: boolean,
    svg: ReactNode | ReactElement,
    list?: Queries.WpPage_Whereareyou_whereAreYouOkrugInformacziyaObOkrugah_whereAreYouOkrugSpisok
}


export const towns: TownInfoType[] = [

    {
        id: 'uzao',
        townShort: 'ЮЗАО',
        price: 3500,
        townFull: 'Юго-западный административный округ',
        time: '30-60',
        left: 0,
        top: 0,
        width: 0,
        isMouseEnter: false,
        svg: <UZAO/>
    },
    {
        id: 'uao',
        townShort: 'ЮАО',
        price: 3500,
        townFull: 'Южный административный округ',
        time: '30-60',
        left: 0,
        top: 0,
        width: 0,
        isMouseEnter: false,
        svg: <UAO/>
    },
    {
        id: 'uvao',
        townShort: 'ЮВАО',
        price: 3500,
        townFull: 'Юго-восточный административный округ',
        time: '30-60',
        left: 0,
        top: 0,
        width: 0,
        isMouseEnter: false,
        svg: <UVAO/>
    },
    {
        id: 'vao',
        townShort: 'ВАО',
        price: 3500,
        townFull: 'Восточный административный округ',
        time: '30-60',
        left: 0,
        top: 0,
        width: 0,
        isMouseEnter: false,
        svg: <VAO/>
    },
    {
        id: 'svao',
        townShort: 'СВАО',
        price: 3500,
        townFull: 'Северо-восточный административный округ',
        time: '30-60',
        left: 0,
        top: 0,
        width: 0,
        isMouseEnter: false,
        svg: <SVAO/>
    },
    {
        id: 'sao',
        townShort: 'САО',
        price: 3500,
        townFull: 'Северный административный округ',
        time: '30-60',
        left: 0,
        top: 0,
        width: 0,
        isMouseEnter: false,
        svg: <SAO/>
    },
    {
        id: 'szao',
        townShort: 'СЗАО',
        price: 3500,
        townFull: 'Северо-западный административный округ',
        time: '30-60',
        left: 0,
        top: 0,
        width: 0,
        isMouseEnter: false,
        svg: <SZAO/>
    },

    {
        id: 'zao',
        townShort: 'ЗАО',
        price: 3500,
        townFull: 'Западный административный округ',
        time: '30-60',
        left: 0,
        top: 0,
        width: 0,
        isMouseEnter: false,
        svg: <ZAO/>
    },
    {
        id: 'cao',
        townShort: 'ЦАО',
        price: 3500,
        townFull: 'Центральный административный округ',
        time: '30-60',
        left: 0,
        top: 0,
        width: 0,
        isMouseEnter: false,
        svg: <CAO/>
    },
    {
        id: 'zelenograd',
        townShort: 'ЗелАО',
        price: 3500,
        townFull: 'Зеленоградский административный округ',
        time: '30-60',
        left: 0,
        top: 0,
        width: 0,
        isMouseEnter: false,
        svg: <Zelenograd/>
    },
    {
        id: 'newmoscow',
        townShort: 'Новомосковский',
        price: 3500,
        townFull: 'Новомосковский административный округ',
        time: '30-60',
        left: 0,
        top: 0,
        width: 0,
        isMouseEnter: false,
        svg: <Newmoscow/>
    },
    {
        id: 'troitsk',
        townShort: 'Троицкий',
        price: 3500,
        townFull: 'Троицкий административный округ',
        time: '30-60',
        left: 0,
        top: 0,
        width: 0,
        isMouseEnter: false,
        svg: <Troitsk/>
    },
]

export type TownListItem = TownInfoType & {
    query: Queries.WpPage_Whereareyou_whereAreYouOkrugInformacziyaObOkrugah
}

export const getTownsList = () => {
    const [townsList, setTownsList] = useState<TownListItem[]>()
    const {evacuatorPageData} = useGlobalContext()

    useEffect(() => {
        if (evacuatorPageData) {
            // @ts-ignore
            const list: TownListItem[] = towns.map(town => {
                const item = evacuatorPageData?.wpPage?.whereAreYou?.whereAreYouOkrugInformacziyaObOkrugah?.find(i => i?.whereAreYouOkrugId === town.id)

                return {
                    ...town,
                    query: item
                }
            })
            setTownsList(list)
        }
    }, [evacuatorPageData])

    return [townsList]

}

const MapTownList = () => {

    const [list] = getTownsList()

    if (!list) return null
    return (
        <>
            {
                list.map(item => <MapTownItem key={item.id} {...item}></MapTownItem>)
            }
        </>
    );
};

export default MapTownList;
