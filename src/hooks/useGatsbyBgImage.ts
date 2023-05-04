import {useGlobalContext} from "../context/context";
import {getImage} from "gatsby-plugin-image";
import {convertToBgImage} from "gbimage-bridge";
import {useGatsbyImage} from "./useGatsbyImage";
import {useEffect, useState} from "react";

export const useGatsbyBgImage = (name: string) => {
    const [bgImage, setBgImage] = useState<any>()
    const [image] = useGatsbyImage(name)
    useEffect(() => {
        if(image) {
            const bgImage = convertToBgImage(image)
            setBgImage(bgImage)
        }
    }, [image])
    return [bgImage]
}
