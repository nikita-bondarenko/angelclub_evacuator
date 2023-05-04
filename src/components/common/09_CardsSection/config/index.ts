import dayjs from "dayjs";
import {useEffect, useState} from "react";
import {useGlobalContext} from "../../../../context/context";
import {useWpCommonSection} from "../../../../hooks/useWpCommonSection";

export type CardItem = {
    id: number
    title: string,
    image: string,
    price: number,
    list: { accent?: string, text: string }[]
}

export const cards: CardItem[] = [
    {
        id: 1,
        title: 'GOLD',
        image: 'card-gold',
        price: 6000,
        list: [{text: 'Бесплатная эвакуация'}, {
            accent: 'Бесплатная',
            text: 'техническая помощь на дороге'
        }, {text: 'Скидки на услуги до 30%'}, {text: '1 владелец'}, {text: '1 транспортное средство'}]
    },
    {
        id: 2,
        title: 'PLATINUM',
        image: 'card-platinum',
        price: 8000,
        list: [
            {
                text: 'Бесплатная эвакуация'
            },
            {
                accent: 'Бесплатная',
                text: 'техническая помощь на дороге'
            },
            {
                text: 'Скидки на услуги до 50%'
            },
            {
                text: '1 владелец + 2 транспортных средства'
            },
            {
                text: '2 владельца + 1 транспортное средство'
            }
        ]
    },
    {
        id: 3,
        title: 'PLATINUM FAMILY',
        image: 'card-platinum',
        price: 12000,
        list: [
            {text: 'Бесплатная эвакуация'},
            {
                accent: 'Бесплатная',
                text: 'техническая помощь на дороге'
            },
            {
                text: 'Скидки на услуги до 50%'
            },
            {text: '2 владельца'},
            {text: '2 транспортных средства'}
        ]
    }
]

export const getCarBirthYears = () => {

    const now = dayjs()

    let years: SearchItem[] = []
    const addYear = (year: string) => {

        const id = (years.length + 1).toString()
        const name = year
        years = [...years, {id, name}]

        const number = Number(year)
        if (number <= 1900) {
            return
        } else {
            addYear(String(number - 1))
        }
    }

    addYear(now.format('YYYY'))
    return years
}

export type CarModel = {
    id: string;
    name: string;
    'cyrillic-name': string;
    class: string;
    'year-from': number;
    'year-to'?: number;
}

export type CarMark = {
    id: string;
    name: string;
    'cyrillic-name': string;
    popular: boolean;
    country: string;
    models: CarModel[];
}

export type SearchItem = {
    id: string,
    name: string
}

export type CardType = {
    id: number,
    name: string,
    price: number
}

export const getCardTypes = (list?: Queries.WpPage_Cards_cardsSpisokKart[]): [CardType[]] => {

    const [cardTypes, setCardTypes] = useState<CardType[]>([])
    const [cards] = useWpCommonSection('klubnye-karty')


    useEffect(() => {
        if (cards) {
            //@ts-ignore
            const items: CardType[] | undefined = cards?.cards?.cardsSpisokKart?.map((item, index) => ({
                id: index + 1,
                name: item?.cardsItemNazvanieKarty,
                price: item?.cardsItemStoimost
            }))
            items && setCardTypes(items)

        }
    }, [cards])

    return [cardTypes]
}


export type PossessorData = {
    name?: string,
    secondName?: string,
    thirdName?: string,
    email?: string,
    phone?: string,
    carYear?: string,
    carModel?: string,
    carMark?: string,
    carNumber?: string
}
