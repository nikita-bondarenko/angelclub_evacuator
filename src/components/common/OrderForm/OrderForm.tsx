import React, {useEffect, useState} from 'react';
import * as styles from './OrderForm.module.css'
import InputMask from "react-input-mask";
import {useMutation} from "@apollo/client";
import {useGlobalContext} from "../../../context/context";
import {SEND_MAIL} from "../../../mutations/sendMail";
import {SEND_MAIL_SECOND} from "../../../mutations/sendMailSecond";
import {sendCustomMail} from "../../../mutations/sendCustomMail";
import {EMAIL, EMAIL_FROM, EMAIL_SECOND} from "../../../config";

type OrderFormProps = {
    title: string,
    subtitle: string,
    buttonText: string,
    emailSubject: string
}
const OrderForm = ({title, buttonText, emailSubject,subtitle}: OrderFormProps) => {
    const [phone, setPhone] = useState<string>('')
    const [name, setName] = useState('')
    const [isNameInvalid, setIsNameInvalid] = useState(true)
    const [isPhoneInvalid, setIsPhoneInvalid] = useState(true)
    const [isFormInvalid, setIsFormInvalid] = useState(true)

    const {setIsSuccessModalOpen} = useGlobalContext()

    useEffect(() => {
        setIsNameInvalid(!name.trim())
        setIsPhoneInvalid(!phone.trim())
        setIsFormInvalid(!name.trim() || !phone || phone.includes('_'))
    }, [phone, name])

    // const [mutation] = useMutation(SEND_MAIL({phone, name, subject: emailSubject}))
    // const [mutation2] = useMutation(SEND_MAIL_SECOND({phone, name, subject: emailSubject}))

    const [mailBody, setMailBody] = useState('')

    const [mutation] = useMutation(sendCustomMail({mailTo: EMAIL, mailFrom: EMAIL_FROM, body: mailBody, subject: emailSubject}))
    const [mutation2] = useMutation(sendCustomMail({mailTo: EMAIL_SECOND, mailFrom: EMAIL_FROM, body: mailBody, subject: emailSubject}))

    useEffect(() => {
        setMailBody(`<p><strong>Телефон:</strong>&nbsp; ${phone}</p><p><strong>ФИО:</strong>&nbsp; ${name}</p>`)
    }, [phone, name])


    const initValues = () => {
        setIsFormInvalid(false)
        setIsNameInvalid(false)
        setIsPhoneInvalid(false)
        setIsSuccessModalOpen(true)
        setPhone('')
        setName('')
    }

    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault()
        if (!isFormInvalid) {
            mutation()
            mutation2()
            initValues()
        }

    }


    return (
        <div className={['container', styles.body].join(' ')}>
            <h2 className={styles.title} dangerouslySetInnerHTML={{__html: title}}></h2>
            <p className={styles.text}>{subtitle}</p>
            <form onSubmit={submitHandler} className={styles.form} action="/">
                <input placeholder={'ФИО'}
                       className={[styles.form__input, isNameInvalid ? '' : styles.accent].join(' ')} value={name}
                       onChange={e => setName(e.target.value)} type="text"/>
                <InputMask value={phone} mask={'+7\\ (999) - 999 - 99 - 99'}
                           onChange={e => setPhone(e.target.value)}
                           placeholder={'+7 (999)-999-99-99'}
                           className={[styles.form__input, isPhoneInvalid ? '' : styles.accent].join(' ')} type="text"
                ></InputMask>
                <div className={styles.form__submit}>
                    <button className={[styles.button, isFormInvalid ? styles.disable : ''].join(' ')}>{buttonText}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default OrderForm;
