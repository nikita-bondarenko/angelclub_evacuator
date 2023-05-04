import React, {useEffect, useMemo, useState} from 'react';
import * as styles from './NewCardForm.module.css'

import CardFormItem from "../CardFormItem/CardFormItem";
import {useCardContext} from "../../context";
import CardCheckbox from "../CardCheckbox/CardCheckbox";
import {CardType, CarMark, CarModel, SearchItem} from "../../config";
import {useGlobalContext} from "../../../../../context/context";
import Payment from '../../../Payment/Payment';
import {v4} from "uuid";
import {useMutation} from "@apollo/client";
import {gql} from "apollo-boost";
import {EMAIL, EMAIL_FROM, EMAIL_SECOND, ID_PREFIX, MODAL_SEARCH} from "../../../../../config";
import uniqid from "uniqid";
import {sendCustomMail} from "../../../../../mutations/sendCustomMail";

export type CardInputItem = {
    id: number,
    sectionId: 'first' | 'second'
    placeholder: string,
    value?: string,
    isBlocked: boolean,
    isInvalid: boolean,
    isClosed?: boolean
    type: 'select' | 'text' | 'phone' | 'search',
    items?: SearchItem[] | CarMark[] | CarModel[] | CardType[],
    key: 'name' |
        'secondName' |
        'thirdName' |
        'email' |
        'phone' |
        'carYear' |
        'carModel' |
        'carMark' |
        'carNumber'
}

const cardInputsInit: CardInputItem[] = [
    {id: 1, sectionId: 'first', isBlocked: false, isInvalid: false, placeholder: 'Имя', type: 'text', key: 'name'},
    {
        id: 2,
        sectionId: 'first',
        isBlocked: false,
        isInvalid: false,
        placeholder: 'Фамилия',
        type: 'text',
        key: 'secondName'
    },
    {
        id: 3,
        sectionId: 'first',
        isBlocked: false,
        isInvalid: false,
        placeholder: 'Отчество',
        type: 'text',
        key: 'thirdName'
    },
    {
        id: 4,
        sectionId: 'first',
        isBlocked: false,
        isInvalid: false,
        placeholder: 'Телефон',
        type: 'phone',
        key: 'phone'
    },
    {
        id: 5,
        sectionId: 'first',
        isBlocked: false,
        isInvalid: false,
        placeholder: 'Почта',
        type: 'text',
        key: 'email'
    },
    {
        id: 6,
        sectionId: 'first',
        isBlocked: false,
        isInvalid: false,
        placeholder: 'Марка автомобиля',
        type: 'search',
        key: 'carMark',
        items: []
    },
    {
        id: 7,
        sectionId: 'first',
        isBlocked: false,
        isClosed: true,
        isInvalid: false,
        placeholder: 'Модель автомобиля',
        type: 'search',
        key: 'carModel',
        items: []
    },
    {
        id: 8,
        sectionId: 'first',
        isBlocked: false,
        isInvalid: false,
        placeholder: 'Гос. номер автомобиля',
        type: 'text',
        key: 'carNumber'
    },
    {
        id: 9,
        sectionId: 'first',
        isBlocked: false,
        isInvalid: false,
        placeholder: 'Год выпуска а/м',
        type: 'search',
        key: 'carYear',
        items: []
    },
    {
        id: 11,
        sectionId: 'second',
        isBlocked: false,
        isInvalid: false,
        placeholder: 'Имя',
        type: 'text',
        key: 'name'
    },
    {
        id: 12,
        sectionId: 'second',
        isBlocked: false,
        isInvalid: false,
        placeholder: 'Фамилия',
        type: 'text',
        key: 'secondName'
    },
    {
        id: 13,
        sectionId: 'second',
        isBlocked: false,
        isInvalid: false,
        placeholder: 'Отчество',
        type: 'text',
        key: 'thirdName'
    },
    {
        id: 14,
        sectionId: 'second',
        isBlocked: false,
        isInvalid: false,
        placeholder: 'Телефон',
        type: 'phone',
        key: 'phone'
    },
    {
        id: 15,
        sectionId: 'second',
        isBlocked: false,
        isInvalid: false,
        placeholder: 'Почта',
        type: 'text',
        key: 'email'
    },
    {
        id: 16,
        sectionId: 'second',
        isBlocked: false,
        isInvalid: false,
        placeholder: 'Марка автомобиля',
        type: 'search',
        key: 'carMark',
        items: []
    },
    {
        id: 17,
        sectionId: 'second',
        isBlocked: false,
        isClosed: true,
        isInvalid: false,
        placeholder: 'Модель автомобиля',
        type: 'search',
        key: 'carModel',
        items: []
    },
    {
        id: 18,
        sectionId: 'second',
        isBlocked: false,
        isInvalid: false,
        placeholder: 'Гос. номер автомобиля',
        type: 'text',
        key: 'carNumber'
    },
    {
        id: 19,
        sectionId: 'second',
        isBlocked: false,
        isInvalid: false,
        placeholder: 'Год выпуска а/м',
        type: 'search',
        key: 'carYear',
        items: []
    },
]

const NewCardForm = () => {

    const {
        selectedCardType,
        carMarks,
        firstCarModels,
        years,
        secondCarModels,
        setCardInputs,
        isAgreed,
        cardInputs,
        updateCardInput,
        isNewCardModalOpen,
        setIsNewCardModalOpen,
        setIsAgreed,
    } = useCardContext()


    useEffect(() => {
        setCardInputs(JSON.stringify(cardInputsInit))
    }, [])


    const [isFormInvalid, setIsFormInvalid] = useState(false)
    const [isSubmit, setIsSubmit] = useState(false)
    const [submitDescription, setSubmitDescription] = useState<string>('')
    const [price, setPrice] = useState<number>(0)
    const [successUrl, setSuccessUrl] = useState<string>('https://angel-frontend.testingplace.ru#cards')
    const [mailSubject, setMailSubject] = useState<string>(``)
    const [mailBody, setMailBody] = useState<string>(``)
    const [mailId,setMailId] = useState<string>(``)

    const [mutation] = useMutation(sendCustomMail({mailTo: EMAIL, mailFrom: EMAIL_FROM, body: mailBody, subject: mailSubject}))
    const [mutation2] = useMutation(sendCustomMail({mailTo: EMAIL_SECOND, mailFrom: EMAIL_FROM, body: mailBody, subject: mailSubject}))

    const setMailData = () => {

        const firstSectionInputData = JSON.parse(cardInputs).reduce((str: string, item: CardInputItem) => {
            if (item.sectionId === 'first') {
                return str + `<p><strong>${item.placeholder}:</strong> ${item.value};</p>`
            }
            return str
        }, '')

        const fewSectionsInputData = JSON.parse(cardInputs).reduce((str: string, item: CardInputItem) => {

            const firstOwner = '(1)'
            const secondOwner = '(2)'
            const firstCar = '(1)'
            const secondCar = '(2)'
            if (item.sectionId === 'first') {
                const prefix = item.key.includes('car') ? firstCar : firstOwner
                return str + `<p><strong>${item.placeholder} ${prefix}:</strong> ${item.value};</p>`
            }
            if (item.sectionId === 'second') {
                const prefix = item.key.includes('car') ? secondCar : secondOwner
                return item.isBlocked ? str : str + `<p><strong>${item.placeholder} ${prefix}:</strong> ${item.value};</p>`
            }
            return str
        }, '')

        const subject = `Оформление заказа ${mailId}`

        const body = selectedCardType ? `<p><strong>Заказ ${mailId}</strong></p><p><strong>Тип операции:</strong> Покупка карты;</p> <p><strong>Название карты:</strong> ${selectedCardType?.name};</p>${// @ts-ignore
            selectedCardType.id === 1 ? firstSectionInputData : fewSectionsInputData}` : ''
        setMailSubject(subject)
        const res = body.split('"').join('')
        setMailBody(res)

    }

    const setId = () => {
        const id = uniqid(ID_PREFIX)
        // console.log('new',id)

        setMailId(id)
    }
    useEffect(() => {
        setId()
    },[])

    useEffect(() =>{
        setMailData()
    }, [cardInputs])
    const successSubmit = () => {
        mutation().then(res => console.log(res))
        mutation2()
        setIsFormInvalid(false)
        setIsNewCardModalOpen(false)
        // @ts-ignore
        setPrice(selectedCardType?.price)
        setSuccessUrl(location.href  + '?' + MODAL_SEARCH + '#cards')
        setSubmitDescription(`Оплата заказа ${mailId}`)


    }

    useEffect(() => {
        if (price && submitDescription && successUrl) {
            setIsSubmit(true)

        }
    }, [price, submitDescription, successUrl])

    const submitHandler = () => {
        const inputArr: CardInputItem[] = JSON.parse(cardInputs)
        let errors = 0

        inputArr.forEach(input => {

            const setInvalid = () => {
                updateCardInput(input.id, 'isInvalid', true)
                errors++
            }

            if (!input.value && !input.isBlocked) {
                if (selectedCardType?.id === 1 && input.sectionId === 'first') {
                    setInvalid()
                }
                if (selectedCardType?.id !== 1) {
                    setInvalid()
                }
            } else {

                if (selectedCardType?.id === 1 && input.key === 'phone' && input.sectionId === 'first' && input.value?.includes('_')) {
                    setInvalid()
                } else if (input.key === 'phone' && input.value?.includes('_')) {
                    setInvalid()
                } else if (!!input.value && input.key === 'email' && (!input.value.includes('.') || !input.value.includes('@') || input.value.length < 8) && !input.isBlocked) {
                    setInvalid()
                } else {
                    updateCardInput(input.id, 'isInvalid', false)
                }
            }
        })

        if (!!errors) {
            setIsFormInvalid(true)

        } else {
            successSubmit()
        }
    }

    useEffect(() => {
        if (!isNewCardModalOpen) {
            const inputArr: CardInputItem[] = JSON.parse(cardInputs)
            inputArr.forEach(input => {
                updateCardInput(input.id, 'isInvalid', false)
                updateCardInput(input.id, 'isBlocked', false)
                updateCardInput(input.id, 'value', undefined)
                setIsFormInvalid(false)
                setIsAgreed(false)
            })
        }
    }, [isNewCardModalOpen])

    return (
        <div className={styles.body}>
            <CardFormItem name={'Выбор карты'} type={'card'}></CardFormItem>
            <CardFormItem name={'Информация о владельце карты'} type={'possessor'}></CardFormItem>
            {selectedCardType?.id !== 1 && <CardFormItem
                name={'Информация о втором владельце / автомобиле'}
                type={selectedCardType?.id === 2 ? 'possessorOrCar' : 'possessorAndCar'}></CardFormItem>}
            <label className={styles.rules}>
                <CardCheckbox></CardCheckbox>
                Я согласен с <a className={styles.link} target={'_blank'}
                                href="https://www.angelclub.ru/autoclub/angel/pravila-kluba.html">правилами клуба</a>
            </label>
            <div className={styles.bottom}>
                <button onClick={submitHandler}
                        className={[styles.submit, !isAgreed ? styles.disabled : ''].join(' ')}>ОПЛАТИТЬ
                </button>
                <span className={[styles.error, isFormInvalid ? styles.visible : ''].join(' ')}>Заполните все необходимые поля</span>
            </div>
            <Payment successUrl={successUrl} submitSignal={isSubmit} price={price}
                     description={submitDescription}></Payment>
        </div>
    );
};

export default NewCardForm;
