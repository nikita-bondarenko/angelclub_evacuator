import {createContext, Dispatch, RefObject, SetStateAction, useContext} from "react";
import {TownInfoType, TownListItem} from "../towns/InfoList/MapTownList";

export type MapContextType = {
    x: number,
    setX: Dispatch<SetStateAction<number>>,
    y: number,
    setY: Dispatch<SetStateAction<number>>,
    size: number,
    setSize: Dispatch<SetStateAction<number>>,
    screenRef: RefObject<HTMLDivElement>,
    scrollY: number,

    setTowns: Dispatch<SetStateAction<TownListItem[]>>
    towns: TownListItem[],

    updateTownById: (arg :  {id: string, data: any}) => void,
    openPopupById: (arg:string) => void
}

export const MapContext = createContext<MapContextType | null>(null)


export const useMapContextContext = () => {
    const currentUserContext = useContext(MapContext);

    if (!currentUserContext) {
        throw new Error(
            "usePurchaseSaleContext has to be used within <MapContext.Provider>"
        );
    }

    return currentUserContext;
};
