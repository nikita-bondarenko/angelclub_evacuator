import React, {useEffect, useState} from 'react';
import {useGlobalContext} from '../../../../../../context/context';
import * as styles from './Cars.module.css'
import {useGatsbyImage} from "../../../../../../hooks/useGatsbyImage";
import {GatsbyImage} from "gatsby-plugin-image";
import {usePrefixImage} from "../../../../../../hooks/usePrefixImage";

export type Car = {
    id: number, image: string, value: string, price: number, html: string
}

const cars: Car[] = [
    {id: 1, image: '/images/car-1.png', value: 'Легковая', price: 3500, html: 'Легковая'},
    {id: 2, image: '/images/car-2.png', value: 'Внедорожник', price: 4000, html: 'Внедорожник'},
    {id: 3, image: '/images/car-3.png', value: 'Грузовая', price: 5000, html: 'Грузовая (до&nbsp;3.5т)'},
    {id: 4, image: '/images/car-4.png', value: 'Спецтехника', price: 5000, html: 'Спецтехника (до&nbsp;4т)'},
]

export type CarListItem = Car & {
    query: Queries.WpPage_Whereareyou_whereAreYouVyborMashiny
}

export const getCars = () => {
    const [items, setItems] = useState<CarListItem[]>()
    const {evacuatorPageData} = useGlobalContext()

    useEffect(() => {
        if (evacuatorPageData) {
            //@ts-ignore
            const list: CarListItem[] = evacuatorPageData?.wpPage?.whereAreYou?.whereAreYouVyborMashiny?.map((item, index) => {
                const pare = cars.find(i => i.id === index + 1)
                return {
                    ...pare,
                    price: item?.whereAreYouVyborMashinyStoimost,
                    html: item?.whereAreYouVyborMashinyTekst,
                    value: item?.whereAreYouVyborMashinyTekst,
                    query: item
                }
            })
            setItems(list)
        }
    }, [evacuatorPageData])
    return [items]
}

const CarsItem = (item: CarListItem) => {

    const {setCarType, carType} = useGlobalContext()


    const [image] = usePrefixImage(item?.query?.whereAreYouVyborMashinyIzobrazhenie?.gatsbyImage)

    return <React.Fragment key={item.id}>
        {item.id !== 1 && <div  className={styles.divider}></div>}
        <button onClick={() => setCarType(item)}
                className={[styles.block, carType && carType.id === item.id ? styles.selected : ''].join(' ')}>
            <span className={styles.block__text} dangerouslySetInnerHTML={{__html: item.html}}></span>
            {image && <GatsbyImage image={image} alt={''} className={styles.block__image}></GatsbyImage>
            }                    </button>
    </React.Fragment>
}

const Cars = () => {

    const {setCarType, carType} = useGlobalContext()
    const [items] = getCars()

    useEffect(() => {
        if (items) {
            setCarType(items[0])
        }

    }, [items])


    if (!items) return null

    return (
        <div className={styles.body}>
            {items.map((item, index) => <CarsItem key={item.id} {...item}></CarsItem>)}

        </div>
    );
};

export default Cars;
