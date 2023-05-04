import {useEffect, useState} from "react";
import {useGlobalContext} from "../context/context";

export const useWpCommonSection = (slug: string) => {
    const [section, setSection] = useState<Queries.WpCommonSections>()

    const {data} = useGlobalContext()

    useEffect(() => {
        if (data) {
            const item = data.allWpCommonSections.nodes.find(section => section.slug === slug)
            // @ts-ignore
            item && setSection(item)
        }
    }, [data])
    return [section]
}
