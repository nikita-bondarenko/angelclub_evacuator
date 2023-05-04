import React from 'react';
import * as styles from './MainPageTrust.module.css'
import {stack} from "../../../../../hooks/useClassName";
import {GatsbyImage, StaticImage} from "gatsby-plugin-image";
import {useGlobalContext} from "../../../../../context/context";
import {useGatsbyImage} from "../../../../../hooks/useGatsbyImage";
import number1 from './images/1.svg'
import number2 from './images/2.svg'
import number3 from './images/3.svg'
import number4 from './images/4.svg'
import number5 from './images/5.svg'
import number6 from './images/6.svg'
import {usePrefixImage} from "../../../../../hooks/usePrefixImage";


const listData: { title: string, text: string }[] = [
    {
        title: 'Репутация',
        text: '30 лет на рынке, обслуживаем более 10к клиентов в год. 70% клубных карт продлеваются ежегодно'
    },
    {title: 'Техника', text: 'Современный автопарк спецтехники. Всегда есть свободная машина, готовая приехать 24/7'},
    {
        title: 'Цена',
        text: 'Члены клуба бесплатно получают большое количество услуг: от вызова эвакуатора до запуска двигателя. На дополнительные услуги от наших партнёров даём скидку до 50%'
    },
    {
        title: 'Скорость',
        text: 'Подача эвакуатора от 20 минут в черте города. Выезжаем даже в труднодоступную местность – для нас нет невозможных задач'
    },
    {
        title: 'Доступность',
        text: 'Мы на связи 24/7, без перерывов и выходных. Готовы помочь вам в праздники, когда другие отдыхают'
    },
    {
        title: 'Опыт',
        text: 'В нашей компании работают механики со стажем работы до 30 лет. Опытный водитель приедет к вам кратчайшим путём и бережно погрузит ваш автомобиль'
    }
]

const numbers: { [key: string]: string } = {
    number1,
    number2,
    number3,
    number4,
    number5,
    number6,
}

const TrustItem = ({reasonsToTrustZagolovok, reasonsToTrustTekst, reasonsToTrustIzobrazhenieSKrayu, index} : Queries.WpPage_Reasonstotrust_reasonsToTrustSpisok & {index: number}) => {
    const [image] = usePrefixImage(reasonsToTrustIzobrazhenieSKrayu?.gatsbyImage)
    return <li key={index} className={styles.item}>
        {image &&  <div className={styles.item__decor}>
            <GatsbyImage image={image} alt={''} className={'normalize-image'}></GatsbyImage>
        </div>}
        <div className={styles.item__top}>
            <img className={styles.number} src={numbers[`number${index + 1}`]} alt=""/>
            <h3 className={stack('title-small', styles.item__title)}>{reasonsToTrustZagolovok}</h3>
        </div>
        {reasonsToTrustTekst && <p className={stack('text-secondary')} dangerouslySetInnerHTML={{__html: reasonsToTrustTekst}}></p>}
    </li>
}

const MainPageTrust = () => {

    const {mainPageData} = useGlobalContext()


    return (
        <div className={stack('section-indent', 'container')}>
            <h2 className={stack('title-secondary', styles.title)}>6 причин доверить нам свой автомобиль</h2>
            <ul className={stack(styles.list)}>
                {//@ts-ignore
                    mainPageData?.wpPage?.reasonsToTrust?.reasonsToTrustSpisok?.map((item, index) => <TrustItem key={index} index={index} {...item}></TrustItem>)}
            </ul>
        </div>
    );
};

export default MainPageTrust;
