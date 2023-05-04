import {getImage, IGatsbyImageData} from "gatsby-plugin-image";
import {useEffect, useState} from "react";

export const useImage = (image?: Queries.Maybe<IGatsbyImageData>) => {
    const [result, setResult] = useState<IGatsbyImageData>()
    useEffect(() => {
        if (image) {
            const result = getImage(image)
            setResult(result)
        }

    }, [image])

    return [result]
}
