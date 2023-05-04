import React, {useEffect, useState} from 'react';
import {GatsbyImage} from "gatsby-plugin-image";
import {useGatsbyImage} from "../../../../../hooks/useGatsbyImage";
import * as styles from './MainPageBenefits.module.css'
import {stack} from "../../../../../hooks/useClassName";
import {useGlobalContext} from "../../../../../context/context";
import {usePrefixImage} from "../../../../../hooks/usePrefixImage";

type BenefitItem = { imageName: string, title: string, text: string }

const benefits: BenefitItem[] = [
    {
        imageName: 'main-benefits-',
        title: 'Бесплатная эвакуация',
        text: 'Подача автомобиля <strong style="font-weight: 600">от 20 минут</strong> в любую точку Москвы и области. <br/> <br/> У нас современный парк спецтехники (все автомобили не&nbsp;старше 2022 г.в.), опытные водители бережно погрузят и отвезут ваше авто на сервис.'
    },
    {
        imageName: 'main-benefits-',
        title: "Бесплатная помощь на дороге",
        text: 'Оказываем полный спектр технических услуг на месте: от&nbsp;замены колеса и&nbsp;дозаправки топливом до запуска двигателя и&nbsp;отключения сигнализации.<br/> <br/> Даём гарантию на все виды работ.<br/> <br/> Ежегодно обслуживаем более 10 000 машин на дороге.'
    },
    {
        imageName: 'main-benefits-',
        title: 'Скидки от&nbsp;30% до&nbsp;50% на все работы в СТО',
        text: 'Собственный технический центр в Москве с квалифицированными и&nbsp;опытными мастерами. <br/> <br/>Проведём комплексную диагностику мотора и ходовой, заменим масло и тормозные колодки, переобуем и возьмём резину на хранение. Вам не&nbsp;придётся ездить от сервиса к&nbsp;сервису — всё сделаем в одном месте.'
    },
    {
        imageName: 'main-benefits-',
        title: 'Эксклюзивные скидки на услуги партнёров',
        text: 'Приятные скидки членам клуба от проверенных годами партнёров. <br/> <br/>Арендовать авто, купить запчасти, оформить страховку или получить помощь юриста — всегда лучшие цены от лидеров рынка.'
    }
]


type MainPageBenefitsItemProps = Queries.WpPage_Benefitssection_benefitsSpisok & {
    index: number
}
const MainPageBenefitsItem = ({
                                  benefitsIzobrazhenie,
                                  benefitsZagolovokInnerhtml,
                                  benefitsTekstInnerhtml,
                                  index
                              }: MainPageBenefitsItemProps) => {
    const isItemHonest = (index + 1) % 2 === 0
    const [objectPosition, setObjectPosition] = useState('center')

    const {mainPageData: {wpPage}} = useGlobalContext()


    useEffect(() => {
        const itemNumber = index + 1
        if (document.body.clientWidth < 990) {
            (itemNumber === 1 || itemNumber === 4) && setObjectPosition('right')
        }
    }, [])

    const [image] = usePrefixImage(benefitsIzobrazhenie?.gatsbyImage)
    return <li className={stack(styles.item, isItemHonest ? styles.honest : '')}>
        {image &&
            <GatsbyImage className={styles.item__image} objectPosition={objectPosition}
                         image={image} alt={''}></GatsbyImage>}
        <div className={styles.item__content}>
            {benefitsZagolovokInnerhtml && <h2 className={stack('title-secondary', styles.item__title)}
                                               dangerouslySetInnerHTML={{__html: benefitsZagolovokInnerhtml}}></h2>}
            {benefitsTekstInnerhtml && <p className={stack('text-prime', styles.item__text)}
                                          dangerouslySetInnerHTML={{__html: benefitsTekstInnerhtml}}></p>}
            {(benefits.length - 1 === index && wpPage?.benefitsSection?.benefitsHrefLink) &&
                <a className={stack('button-prime', styles.button)} href={wpPage?.benefitsSection?.benefitsHrefLink}
                   target={"_blank"}>{wpPage?.benefitsSection?.benefitsTextLink}</a>}
        </div>
    </li>
}

const MainPageBenefits = () => {

    const {mainPageData} = useGlobalContext()

    return (
        <section className={stack('container', 'section-indent')}>
            <ul>
                {
                    // @ts-ignore
                    mainPageData?.wpPage?.benefitsSection?.benefitsSpisok?.map((item, index) => <MainPageBenefitsItem
                    key={index}
                    {...item} index={index}></MainPageBenefitsItem>)}
            </ul>
        </section>

    );
};

export default MainPageBenefits;  
