import {createContext, Dispatch, SetStateAction, useContext, useEffect, useState} from "react";
import {Data, Node, RootQuery} from "../types/types";
import {Car, CarListItem} from "../components/pages/EvacuatorPage/sections/03_EvacuatorPageWeReadySection/Cars/Cars";
import {AUTOSERVICE_PAGE_SLUG, EVACUATOR_PAGE_SLUG, MAIN_PAGE_SLUG, TECH_HELP_PAGE_SLUG} from "../config";


type Data =Queries.MainPageQuery | Queries.EvacuatorPageQuery | Queries.TechHelpPageQuery | Queries.AutoservicePageQuery

export type GlobalContextType = {
    isSuccessModalOpen: boolean,
    setIsSuccessModalOpen: Dispatch<SetStateAction<boolean>>,
    // carType: Car | undefined,
    // setCarType: Dispatch<SetStateAction<Car | undefined>>,
    isBottomAvailable: boolean,
    setIsBottomAvailable: Dispatch<SetStateAction<boolean>>,
    isNavOpen: boolean,
    setIsNavOpen: Dispatch<SetStateAction<boolean>>,
    isTopAvailable: boolean,
    setIsTopAvailable: Dispatch<SetStateAction<boolean>>,
    topHeight: number,
    setTopHeight: Dispatch<SetStateAction<number>>,
    isMobile: boolean,
    setIsMobile: Dispatch<SetStateAction<boolean>>,

    findFile: (name: string) => Queries.File | undefined | null,
    findPost: (slug: string) => Queries.WpPost | null | undefined
    data: Data,
    mainPageData: Queries.MainPageQuery,
    evacuatorPageData: Queries.EvacuatorPageQuery

    techHelpPageData: Queries.TechHelpPageQuery

    autoservicePageData: Queries.AutoservicePageQuery

    pageWidth: number | undefined,
    setPageWidth: Dispatch<SetStateAction<number | undefined>>
    pageHeight: number | undefined,
    setPageHeight: Dispatch<SetStateAction<number | undefined>>
    carType: CarListItem | undefined,
    setCarType: Dispatch<SetStateAction<CarListItem | undefined>>

}


export const globalState = (data: Data) => {
    const [carType, setCarType] = useState<CarListItem>()
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
    const [isBottomAvailable, setIsBottomAvailable] = useState(true)
    const [isMobile, setIsMobile] = useState(false)
    const [isTopAvailable, setIsTopAvailable] = useState(true)
    const [topHeight, setTopHeight] = useState(0)

    const [isNavOpen, setIsNavOpen] = useState(false)
    const [pageWidth, setPageWidth] = useState<number>()
    const [pageHeight, setPageHeight] = useState<number>()
    const [mainPageData, setMainPageData] = useState<Queries.MainPageQuery>()
    const [evacuatorPageData, setEvacuatorPageData ] = useState<Queries.EvacuatorPageQuery>()
    const [techHelpPageData, setTechHelpPageData ] = useState<Queries.TechHelpPageQuery>()
const [autoservicePageData, setAutoservicePageData] = useState<Queries.AutoservicePageQuery>()

    useEffect(() => {
        // @ts-ignore
    data.wpPage?.slug === MAIN_PAGE_SLUG && setMainPageData(data)
        // @ts-ignore
        data.wpPage?.slug === EVACUATOR_PAGE_SLUG && setEvacuatorPageData(data)
        // @ts-ignore
        data.wpPage?.slug === TECH_HELP_PAGE_SLUG && setTechHelpPageData(data)
        // @ts-ignore
        data.wpPage?.slug === AUTOSERVICE_PAGE_SLUG && setAutoservicePageData(data)


    }, [data])


    const findFile = (name: string) => {
        if (!data || !data.allFile || !data.allFile.nodes) {
            return null
        }
        return data.allFile.nodes.find(item => item.name === name)
    }

    const findPost = (slug: string) => {
        // if (!data ||  !data.allWpPost ||  !data.allWpPost.nodes) {
        //     return null
        // }
        //
        // return data.allWpPost.nodes.find(item => item.slug === slug)

    }

    useEffect(() => {
        if (document.body.clientWidth < 990) {
            setIsMobile(true)
            setIsBottomAvailable(false)
        }

    }, [])

    useEffect(() => {
        if (isSuccessModalOpen) {
            setTimeout(() => setIsSuccessModalOpen(false), 4000)
        }
    }, [isSuccessModalOpen])

    return {
        isSuccessModalOpen,
        setIsSuccessModalOpen,
        carType,
        setCarType,
        isBottomAvailable,
        setIsBottomAvailable,
        isNavOpen,
        setIsNavOpen,
        isTopAvailable,
        setIsTopAvailable,
        setTopHeight,
        topHeight,
        isMobile,
        setIsMobile,
        findFile,
        pageWidth,
        setPageWidth,
        data, pageHeight, setPageHeight, findPost, mainPageData, evacuatorPageData, techHelpPageData, autoservicePageData
    }
}

export const GlobalContext = createContext<GlobalContextType | null>(null)

export const useGlobalContext = () => {
    const currentContext = useContext(GlobalContext);

    if (!currentContext) {
        throw new Error(
            "GlobalContext has to be used within <GlobalContext.Provider>"
        );
    }

    return currentContext;
};


