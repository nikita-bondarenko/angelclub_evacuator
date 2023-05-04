import {IGatsbyImageData} from "gatsby-plugin-image";
import {useEffect, useState} from "react";
import {withAssetPrefix} from "gatsby";
import config from '../../gatsby-config'

export const usePrefixImage = (image: IGatsbyImageData | null | undefined) => {
    const [res, setRes] = useState<IGatsbyImageData>()

    const withAssetPrefixMany = (str: string) => str.split(',').map(item => withAssetPrefix(item)).join(',')
    useEffect(() => {
        if (image) {
            const prefixedImage: IGatsbyImageData = {
                ...image,
                images: {
                    ...image.images,
                    fallback: {
                        sizes: image?.images?.fallback?.sizes,
                        src: withAssetPrefixMany(image?.images?.fallback?.src || ''),
                        srcSet: withAssetPrefixMany(image?.images?.fallback?.srcSet || '')
                    }
                }
            }
            setRes(prefixedImage)
        }
    }, [image])
    return [res]
}
