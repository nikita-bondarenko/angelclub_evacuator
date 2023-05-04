import React, {useEffect, useState} from 'react';
import * as styles from "./ProlongCardForm.module.css";
import CardFormItem from "../CardFormItem/CardFormItem";
import CardCheckbox from "../CardCheckbox/CardCheckbox";
import {CardInputItem} from "../NewCardForm/NewCardForm";
import {CardType, getCardTypes} from "../../config";
import {useCardContext} from "../../context";
import CardFormInput from "../CardFormInput/CardFormInput";
import {useMutation} from "@apollo/client";
import {gql} from "apollo-boost";
import {EMAIL, EMAIL_SECOND, ID_PREFIX, MODAL_SEARCH} from "../../../../../config";
import {v4} from "uuid";
import Payment from "../../../Payment/Payment";
import uniqid from "uniqid";


const ProlongCardForm = () => {
    const {
        setSelectedCardType,
        selectedCardType,
        cardTypes
    } = useCardContext()
    const [isFormInvalid, setIsFormInvalid] = useState(true)
    const [name, setName] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [email, setEmail] = useState<string>('')

    const [isNameInvalid, setIsNameInvalid] = useState(true)
    const [isPhoneInvalid, setIsPhoneInvalid] = useState(true)
    const [isEmailInvalid, setIsEmailInvalid] = useState(true)
    const [isSubmit, setIsSubmit] = useState(false)
    const [submitDescription, setSubmitDescription] = useState<string>('')
    const [price, setPrice] = useState<number>(0)
    const [successUrl, setSuccessUrl] = useState<string>('https://angel-frontend.testingplace.ru#cards')
    const [mailSubject, setMailSubject] = useState<string>('')
    const [mailBody, setMailBody] = useState<string>('')
    const [mailId, setMailId] = useState<string>('')
    const [mutation] = useMutation(gql`
        mutation SEND_EMAIL {
            sendEmail(
                input: {
                    to: "${EMAIL}"
                    from: "mail@testingplace.ru"
                    subject: "${mailSubject}"
                    body: "${mailBody}"
                    clientMutationId: "${mailId}"
                }
            ) {
                origin
                sent
                message
            }
        }
    `)

    const [mutation2] = useMutation(gql`
        mutation SEND_EMAIL {
            sendEmail(
                input: {
                    to: "${EMAIL_SECOND}"
                    from: "mail@testingplace.ru"
                    subject: "${mailSubject}"
                    body: "${mailBody}"
                    clientMutationId: "${mailId}"
                }
            ) {
                origin
                sent
                message
            }
        }
    `)

    const setId = () => {
        const id = uniqid(ID_PREFIX)
        // console.log('prolong',id)
        setMailId(id)
    }

    const setMailData = () => {
        const subject = `Оформление заказа ${mailId}`
        const body = selectedCardType ? `<p><strong>Заказ ${mailId}</strong></p><p><strong>Тип операции:</strong> Продление карты;</p><p><strong>Название карты:</strong> ${selectedCardType?.name};</p><p><strong>ФИО:</strong> ${name.trim()};</p><p><strong>Email:</strong> ${email.trim()};</p><p><strong>Телефон:</strong> ${phone.trim()};</p>` : ''
        const res = body.split('"').join('')
        setMailBody(res)
        setMailSubject(subject)
    }

    useEffect(() => {
        setId()
        setSuccessUrl(location.href  + '?' + MODAL_SEARCH + '#cards')
    }, [])

    useEffect(() => {
        if (mailId) setSubmitDescription(`Оплата заказа ${mailId}`)
    }, [mailId])

    useEffect(() => {
        if (selectedCardType) setPrice(selectedCardType?.price)
    }, [selectedCardType])

    useEffect(() => {
        setMailData()
    }, [email, name, phone, selectedCardType])

    useEffect(() => {
        setIsNameInvalid(!(!!name.trim() && name.trim().split(' ').length >= 3))
    }, [name])

    useEffect(() => {
        setIsPhoneInvalid(!(!!phone.trim() && !phone.includes('_')))
    }, [phone])

    useEffect(() => {
        setIsEmailInvalid(!(!!email.trim() && email.includes('@') && email.includes('.') && email.length >= 8))
    }, [email])

    useEffect(() => {
        setIsFormInvalid(isNameInvalid || isPhoneInvalid || isEmailInvalid)
    }, [isNameInvalid, isPhoneInvalid, isEmailInvalid])


    const submitHandler = () => {
        if (!isFormInvalid) {
            mutation()
            mutation2()
            setIsSubmit(true)
        }
    }

    const selectChangeHandle = (value: string | undefined) => {
        const card = cardTypes.find(item => item.name === value)
        setSelectedCardType(card)
    }

    return (<div className={styles.body}>
            <div className={styles.content}>
                <CardFormInput value={selectedCardType?.name} items={cardTypes} setValue={selectChangeHandle}
                               type={'select'} label={'Тариф карты'}></CardFormInput>
                <CardFormInput isLight={isNameInvalid} value={name} setValue={value => value && setName(value)}
                               type={'text'} label={'ФИО'}></CardFormInput>
                <CardFormInput isLight={isPhoneInvalid} value={phone} setValue={value => value && setPhone(value)}
                               type={'phone'} label={'Телефон'}></CardFormInput>
                <CardFormInput isLight={isEmailInvalid} value={email} setValue={value => value ? setEmail(value) : setEmail('')}
                               type={'text'} label={'Email'}></CardFormInput>
            </div>

            <div className={styles.bottom}>
                <button onClick={submitHandler}
                        className={[styles.submit, isFormInvalid ? styles.disabled : ''].join(' ')}>ОПЛАТИТЬ
                </button>
            </div>
            <Payment successUrl={successUrl} submitSignal={isSubmit} price={price}
                     description={submitDescription}></Payment>
        </div>
    );
};

export default ProlongCardForm;
