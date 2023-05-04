import React, {useEffect, useState} from 'react';
import InputMask from "react-input-mask";
import * as styles from './WeArrive.module.css'
import {useGlobalContext} from "../../../../../context/context";
import {useMutation} from "@apollo/client";
import {SEND_MAIL} from "../../../../../mutations/sendMail";
import {SEND_MAIL_SECOND} from "../../../../../mutations/sendMailSecond";

const WeArrive = () => {
    const [phone, setPhone] = useState<string>('')
    const [name, setName] = useState('')
    const [isNameInvalid, setIsNameInvalid] = useState(true)
    const [isPhoneInvalid, setIsPhoneInvalid] = useState(true)
    const [isFormInvalid, setIsFormInvalid] = useState(true)

    const {setIsSuccessModalOpen, techHelpPageData} = useGlobalContext()

    useEffect(() => {
        setIsNameInvalid(!name.trim())
        setIsPhoneInvalid(!phone.trim())
        setIsFormInvalid(!name.trim() || !phone || phone.includes('_'))
    }, [phone, name])

    const [mutation] = useMutation(SEND_MAIL({phone, name, subject: 'Вызов техпомощи'}))
    const [mutation2] = useMutation(SEND_MAIL_SECOND({phone, name, subject: 'Вызов техпомощи'}))


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
            {techHelpPageData?.wpPage?.orderTech?.weArriveZagolovok && <h2 className={styles.title}
                 dangerouslySetInnerHTML={{__html: techHelpPageData?.wpPage?.orderTech?.weArriveZagolovok}}></h2>}
            {techHelpPageData?.wpPage?.orderTech?.weArrivePodzagolovok && <p className={styles.text}
                dangerouslySetInnerHTML={{__html: techHelpPageData?.wpPage?.orderTech?.weArrivePodzagolovok}}></p>}
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
                    <button className={[styles.button, isFormInvalid ? styles.disable : ''].join(' ')}>{techHelpPageData?.wpPage?.orderTech?.weArriveTekstKnopki}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default WeArrive;
