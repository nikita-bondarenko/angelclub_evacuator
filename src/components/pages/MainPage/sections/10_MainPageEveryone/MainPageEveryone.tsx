import React from 'react';
import * as styles from './MainPageEveryone.module.css'
import {stack} from "../../../../../hooks/useClassName";
import number1 from './images/1.svg'
import number2 from './images/2.svg'
import number3 from './images/3.svg'
import number4 from './images/4.svg'
import number5 from './images/5.svg'
import number6 from './images/6.svg'
import {it} from "node:test";
import ToTopButton from "../../../../common/ToTopButton/ToTopButton";
import {useGlobalContext} from "../../../../../context/context";

const listData = ['Предоставим <strong style="font-weight: 600">скидку 20% на эвакуацию</strong>, если вы решите ремонтировать автомобиль в нашем сервисе. На линии работают механики <strong style="font-weight: 600">со стажем более 10 лет</strong>. После комплексной диагностики вы получите всю информацию о необходимом ремонте, сроках и стоимости работы. Мы не навязываем ненужные дорогостоящие услуги, как это делают другие сервисы. <strong style="font-weight: 600">70% наших клиентов</strong> возвращаются к нам для ремонта и обслуживания своих авто.', '<strong style="font-weight: 600">Получите 10% скидку</strong> даже без карты члена клуба при заказе эвакуатора за сутки до подачи. Предварительный заказ машины гарантирует подачу в&nbsp;назначенное время.']

const numbers: { [key: string]: string } = {
    number1,
    number2,
    number3,
    number4,
    number5,
    number6,
}

type ListItem = {
    text?: string | null,
    index: number
}
const ListItem = ({text, index} : ListItem) => {

    return  <li className={styles.item}>
        <img src={numbers[`number${index + 1}`]} className={styles.number} alt=""/>
        {text && <p className={stack('text-prime', styles.text)} dangerouslySetInnerHTML={{__html: text}}></p>}
    </li>
}

const MainPageEveryone = () => {

    const {mainPageData} = useGlobalContext()

    return (
        <section className={stack('container', 'section-indent', styles.body)}>
            {mainPageData?.wpPage?.discoutsForEveryone?.promotionToEveryoneZagolovok && <h2 className={stack('title-prime', styles.title)}
                 dangerouslySetInnerHTML={{__html: mainPageData?.wpPage?.discoutsForEveryone?.promotionToEveryoneZagolovok}}></h2>}
            <ul className={styles.list}>
                {mainPageData?.wpPage?.discoutsForEveryone?.promotionToEveryoneSpisok?.map((item, index) => <ListItem key={index} text={item?.promotionToEveryoneTekst} index={index}></ListItem>)}
            </ul>
            {mainPageData?.wpPage?.discoutsForEveryone?.hrefSsylki && <a href={mainPageData?.wpPage?.discoutsForEveryone?.hrefSsylki} target={"_blank"}
                className={stack('button-prime', styles.button)}>{mainPageData?.wpPage?.discoutsForEveryone?.tekstSsylki}</a>}
            <ToTopButton></ToTopButton>
        </section>
    );
};

export default MainPageEveryone;
