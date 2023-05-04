import React, {useEffect, useState} from 'react';
import {GatsbyImage, getImage, IGatsbyImageData} from "gatsby-plugin-image";
import {useGlobalContext} from "../../../../../context/context";
import * as styles from './MainPageHero.module.css'
import {stack} from "../../../../../hooks/useClassName";
import BackgroundImage from 'gatsby-background-image'
import styled from 'styled-components'
import {convertToBgImage} from "gbimage-bridge"
import {useGatsbyBgImage} from "../../../../../hooks/useGatsbyBgImage";
import {useGatsbyImage} from "../../../../../hooks/useGatsbyImage";
import {useImage} from "../../../../../hooks/useImage";
import {withAssetPrefix} from "gatsby";
import {usePrefixImage} from "../../../../../hooks/usePrefixImage";


const list: { title: string, text: string }[] = [
    {title: '30', text: 'лет на рынке'},
    {title: '> 250 000', text: 'довольных клиентов'},
    {title: '> 10 000', text: 'членов клуба'}
]

const BottomLine = () => {

    const [bgImage] = useGatsbyBgImage('print')
    const {mainPageData} = useGlobalContext()

    return <BackgroundImage Tag={'div'} className={styles.bottom} {...bgImage} preserveStackingContext>
        <div className={'container'}>
            <ul className={styles.bottom__list}>
                {mainPageData?.wpPage?.yourWelfare?.welfareCzifry?.map((item, index) => <li key={index}>
                    {item?.welfareGlavnyjTekst && <p className={stack('title-prime', styles.item__strong)}
                        dangerouslySetInnerHTML={{__html: item?.welfareGlavnyjTekst}}></p>}
                    {item?.welfareVtorostepennyjTekst && <span className={stack('text-prime', styles.item__text)}
                           dangerouslySetInnerHTML={{__html: item?.welfareVtorostepennyjTekst}}></span>}
                </li>)}
            </ul>
        </div>
    </BackgroundImage>
}

const StyledBottomLine = styled(BottomLine)`
  background-repeat: repeat-y;
  background-size: cover;
`

const MainPageHero = () => {

    const {mainPageData} = useGlobalContext()
    const [image, setImage] = useState<IGatsbyImageData | null>()
    const [prefixedImage] = usePrefixImage(mainPageData?.wpPage?.yourWelfare?.welfareImage?.gatsbyImage)

    useEffect(() => {
        console.log(prefixedImage)
    }, [prefixedImage])


    return (
        <div className={stack('section-indent', styles.body)}>
            <div className={styles.content}>
                {mainPageData?.wpPage?.yourWelfare?.welfareZagolovok && <h1 className={stack('title-prime', styles.title)}
                     dangerouslySetInnerHTML={{__html: mainPageData?.wpPage?.yourWelfare?.welfareZagolovok}}></h1>}
                <a className={stack('button-prime', styles.button)} href="#cards" target={"_self"}>{mainPageData?.wpPage?.yourWelfare?.welfareTekstKnopki}</a>
                {/*{image?.images?.fallback?.srcSet && <img className={styles.image} src={withAssetPrefix(image?.images?.fallback?.srcSet )} alt={''}></img>}*/}
                {prefixedImage && <GatsbyImage className={styles.image} image={prefixedImage} alt={''}></GatsbyImage>}

            </div>

            <StyledBottomLine></StyledBottomLine>
        </div>
    );
};

export default MainPageHero;
