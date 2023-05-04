import React, {useEffect, useState} from 'react';
import * as styles from './MainPageOrder.module.css'
import InputMask from "react-input-mask";
import {useGlobalContext} from "../../../../../context/context";
import Background from "../../../../common/Background/Background";
import {useMutation} from '@apollo/client';
import {gql} from "apollo-boost";
import {EMAIL} from "../../../../../config";
import {SEND_MAIL} from "../../../../../mutations/sendMail";
import {SEND_MAIL_SECOND} from "../../../../../mutations/sendMailSecond";

const MainPageOrder = () => {
    const [phone, setPhone] = useState<string>('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isNameInvalid, setIsNameInvalid] = useState(true)
    const [isMailInvalid, setIsMailInvalid] = useState(true)

    const [isPhoneInvalid, setIsPhoneInvalid] = useState(true)
    const [isFormInvalid, setIsFormInvalid] = useState(true)

    const [mutation, {data, loading, error}] = useMutation(SEND_MAIL({phone, email, name, subject: 'Заявка на членство автоклуба с главной страницы'}))
    const [mutation2] = useMutation(SEND_MAIL_SECOND({phone, email, name, subject: 'Заявка на членство автоклуба с главной страницы'}))


    const {setIsSuccessModalOpen,mainPageData} = useGlobalContext()

    useEffect(() => {
        setIsNameInvalid(!name.trim() || name.split(' ').filter(item => !!item.trim()).length !== 3)
        setIsPhoneInvalid(!phone.trim() || phone.includes('_'))
        setIsMailInvalid(!email.trim() || !email.includes('.') || !email.includes('@') || email.length < 8)

    }, [phone, name, email])

    useEffect(() => {
        setIsFormInvalid(isMailInvalid || isNameInvalid || isPhoneInvalid)

    }, [isPhoneInvalid, isMailInvalid, isNameInvalid])

    const successSending = () => {
        setIsFormInvalid(false)
        setIsNameInvalid(false)
        setIsPhoneInvalid(false)
        setIsMailInvalid(false)
        setIsSuccessModalOpen(true)
        setPhone('')
        setName('')
        setEmail('')
    }


    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault()
        mutation()
        mutation2()
            // .then(res => console.log(res))
        successSending()
    }


    return (
        <Background>

            <div className={['container', styles.body].join(' ')}>
                {mainPageData?.wpPage?.becomeMember?.memberZagolovok && <h2 className={styles.title}
                     dangerouslySetInnerHTML={{__html: mainPageData?.wpPage?.becomeMember?.memberZagolovok}}></h2>}
                <p className={styles.text}>{mainPageData?.wpPage?.becomeMember?.memberPodzagolovok}</p>
                <form onSubmit={submitHandler} className={styles.form} action="/">
                    <input placeholder={'ФИО'}
                           className={[styles.form__input, isNameInvalid ? '' : styles.accent].join(' ')} value={name}
                           onChange={e => setName(e.target.value)} type="text"/>
                    <input placeholder={'whatever@gmail.com'}
                           className={[styles.form__input, isMailInvalid ? '' : styles.accent].join(' ')} value={email}
                           onChange={e => setEmail(e.target.value)} type="text"/>
                    <InputMask value={phone} mask={'+7\\ (999) - 999 - 99 - 99'}
                               onChange={e => setPhone(e.target.value)}
                               placeholder={'+7 (999)-999-99-99'}
                               className={[styles.form__input, isPhoneInvalid ? '' : styles.accent].join(' ')}
                               type="text"
                    ></InputMask>
                    <div className={styles.form__submit}>
                        <button className={[styles.button, isFormInvalid ? styles.disable : ''].join(' ')}>{mainPageData?.wpPage?.becomeMember?.memberTekstKnopki}
                        </button>
                    </div>
                </form>
            </div>
        </Background>
    );
};

export default MainPageOrder;
