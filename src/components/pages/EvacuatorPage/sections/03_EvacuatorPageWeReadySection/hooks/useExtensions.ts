import {useEffect, useState} from "react";
import {Extension} from "../Form/ReadyForm";
import {useGlobalContext} from "../../../../../../context/context";

export const useExtensions = () => {
    const [extensions, setExtensions] = useState<Extension[]>()
    const {
        evacuatorPageData
    } = useGlobalContext()


    useEffect(() => {

        if (evacuatorPageData) {

            // @ts-ignore
            const list: Extension[] = evacuatorPageData?.wpPage?.whereAreYou?.whereAreYouCalculatorDopolnitelno?.map((item, index) => ({
                id: index + 1,
                price: item?.whereAreYouCalculatorDopStoimost,
                value: item?.whereAreYouCalculatorDopTekstVPisme,
                label: item?.whereAreYouCalculatorDopTekst,
                pulldown: item?.whereAreYouCalculatorDopTekstPodskazki,
                // @ts-ignore
                funcOn: (value) => item?.whereAreYouCalculatorDopTekst?.toLowerCase().includes('мкад') ? value : (item?.whereAreYouCalculatorDopStoimost < 10 ? value * item?.whereAreYouCalculatorDopStoimost : value + item?.whereAreYouCalculatorDopStoimost),
                // @ts-ignore
                funcOff: (value) => item?.whereAreYouCalculatorDopTekst?.toLowerCase().includes('мкад') ? value : (item?.whereAreYouCalculatorDopStoimost < 10 ? value / item?.whereAreYouCalculatorDopStoimost : value - item?.whereAreYouCalculatorDopStoimost),
            }))

            setExtensions(list)

        }
    }, [evacuatorPageData])

    const updateExtension = (id: number, key:  'pulldown' | 'label' | 'value' | 'funcOn' | 'funcOff', value: any) => {
        setExtensions(prev => {
            return prev?.map(item => item.id === id ? ({...item, [key]: value}) : item)
        })
    }

    return [extensions]
}
