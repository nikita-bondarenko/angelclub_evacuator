import React, {useEffect, useState} from 'react';
import InputMask from 'react-input-mask';
import * as styles from './HeroSection.module.css'
import {useGlobalContext} from "../../../../../../context/context";
import {useMutation} from "@apollo/client";
import {SEND_MAIL} from "../../../../../../mutations/sendMail";
import {SEND_MAIL_SECOND} from "../../../../../../mutations/sendMailSecond";
import {sendCustomMail} from "../../../../../../mutations/sendCustomMail";
import {EMAIL, EMAIL_FROM, EMAIL_SECOND} from "../../../../../../config";

const HeroSection = () => {

    const [phone, setPhone] = useState<string>('')
    const [isInputInvalid, setIsInputInvalid] = useState(false)
    const {setIsSuccessModalOpen} = useGlobalContext()
    const {evacuatorPageData} = useGlobalContext()


    const [mailBody, setMailBody] = useState('')
    const emailSubject = 'Заявка на обратный звонок со страницы эвакуатора'

    const [mutation] = useMutation(sendCustomMail({mailTo: EMAIL, mailFrom: EMAIL_FROM, body: mailBody, subject: emailSubject}))
    const [mutation2] = useMutation(sendCustomMail({mailTo: EMAIL_SECOND, mailFrom: EMAIL_FROM, body: mailBody, subject: emailSubject}))

    useEffect(() => {
        setMailBody(`<p><strong>Телефон:</strong>&nbsp; ${phone}</p>`)
    }, [phone])

    const submitHandler = () => {

        if (phone.includes('_') || !phone) {
            setIsInputInvalid(true)
        } else {
            setIsSuccessModalOpen(true)
            mutation()
            mutation2()
        }
    }

    return (
        <section className={[styles.body, 'container'].join(' ')}>
            {evacuatorPageData?.wpPage?.needEvacuator?.needEvacuatorZagolovok && <h1 className={styles.title}
                 dangerouslySetInnerHTML={{__html: evacuatorPageData?.wpPage?.needEvacuator?.needEvacuatorZagolovok}}></h1>}
            <ul className={styles.list}>
                {evacuatorPageData?.wpPage?.needEvacuator?.needEvacuatorSpisok?.map((item, index )=> item?.needEvacuatorTekst ? <li key={index} dangerouslySetInnerHTML={{__html: item?.needEvacuatorTekst}} className={styles.item}></li> : null
                )}
            </ul>
            <form className={styles.form} action="" onSubmit={e => e.preventDefault()}>
                <InputMask value={phone} mask={'+7\\ (999)-999-99-99'} onChange={e => setPhone(e.target.value)}
                           placeholder={'+7 (089)-790-98-34'} type="text"
                           className={[styles.input, isInputInvalid ? styles.invalid : ''].join(' ')}></InputMask>
                <div className={styles.form__submit}>
                    <button onClick={submitHandler} className={styles.button} type={'submit'}>
                        {evacuatorPageData?.wpPage?.needEvacuator?.needEvacuatorTekstKnopki}
                    </button>
                    <span className={[styles.error, isInputInvalid ? styles.visible : ''].join(' ')}>Заполните все необходимые поля</span>
                </div>
            </form>
        </section>
    );
};

export default HeroSection;
