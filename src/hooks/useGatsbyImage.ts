import {useGlobalContext} from "../context/context";
import {getImage} from "gatsby-plugin-image";
import {useEffect, useState} from "react";

export const useGatsbyImage = (name: string) => {
    const { findFile, data} = useGlobalContext()
    const [image, setImage] = useState<any>()

    useEffect(() => {
        if(data.allFile && data.allFile.nodes) {
            // @ts-ignore
            const image = getImage(findFile(name))
            image && setImage(image)
        }
    }, [data])

    return [image]
}
