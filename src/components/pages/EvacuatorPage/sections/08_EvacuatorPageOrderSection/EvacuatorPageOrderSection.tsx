import React, {useEffect, useState} from 'react';
import * as styles from './EvacuatorPageOrderSection.module.css'
import InputMask from "react-input-mask";
import {useGlobalContext} from "../../../../../context/context";
import {useMutation} from "@apollo/client";
import {SEND_MAIL} from "../../../../../mutations/sendMail";
import {SEND_MAIL_SECOND} from "../../../../../mutations/sendMailSecond";
import {sendCustomMail} from "../../../../../mutations/sendCustomMail";
import {EMAIL, EMAIL_FROM, EMAIL_SECOND} from "../../../../../config";

const EvacuatorPageOrderSection = () => {
    const [phone, setPhone] = useState<string>('')
    const [name, setName] = useState('')
    const [isNameInvalid, setIsNameInvalid] = useState(true)
    const [isPhoneInvalid, setIsPhoneInvalid] = useState(true)
    const [isFormInvalid, setIsFormInvalid] = useState(true)

    const {setIsSuccessModalOpen, evacuatorPageData} = useGlobalContext()

    useEffect(() => {
        setIsNameInvalid(!name.trim())
        setIsPhoneInvalid(!phone.trim())
        setIsFormInvalid(!name.trim() || !phone || phone.includes('_'))
    }, [phone, name])


    const [mailBody, setMailBody] = useState('')
    const emailSubject = 'Вызов эвакуатора'

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
            {evacuatorPageData?.wpPage?.orderEvacuator?.zagolovok && <h2 className={styles.title}
                 dangerouslySetInnerHTML={{__html: evacuatorPageData?.wpPage?.orderEvacuator?.zagolovok}}></h2>}
            <p className={styles.text}>{evacuatorPageData?.wpPage?.orderEvacuator?.podzagolovok}</p>
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
                    <button className={[styles.button, isFormInvalid ? styles.disable : ''].join(' ')}>{evacuatorPageData?.wpPage?.orderEvacuator?.tekstKnopki}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EvacuatorPageOrderSection;
