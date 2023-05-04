import React, {useEffect, useState} from 'react';
import InputMask from "react-input-mask";
import * as styles from './EmergencyHelp.module.css'
import {useGlobalContext} from "../../../../../context/context";
import {useMutation} from "@apollo/client";
import {SEND_MAIL} from "../../../../../mutations/sendMail";
import {GatsbyImage} from "gatsby-plugin-image";
import {stack} from "../../../../../hooks/useClassName";
import {usePrefixImage} from "../../../../../hooks/usePrefixImage";
import {SEND_MAIL_SECOND} from "../../../../../mutations/sendMailSecond";

const EmergencyHelp = () => {
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
const [icon] = usePrefixImage(techHelpPageData?.wpPage?.orderEmergency?.emergencyHelpIzobrazhenie?.gatsbyImage)

    return (
        <div className={['container', 'section-indent', styles.body].join(' ')}>
            {techHelpPageData?.wpPage?.orderEmergency?.emergencyHelpZagolovok &&<h2 className={styles.title}
                 dangerouslySetInnerHTML={{__html: techHelpPageData?.wpPage?.orderEmergency?.emergencyHelpZagolovok}}></h2>}
            {techHelpPageData?.wpPage?.orderEmergency?.emergencyHelpPodzagolovok &&<p className={styles.text}
                dangerouslySetInnerHTML={{__html: techHelpPageData?.wpPage?.orderEmergency?.emergencyHelpPodzagolovok}}></p>}
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
                    <button className={[styles.button, isFormInvalid ? styles.disable : ''].join(' ')}>{techHelpPageData?.wpPage?.orderEmergency?.emergencyHelpTekstKnopki}
                    </button>
                </div>
            </form>
            <div className={styles.bottom}>
                {icon && <GatsbyImage objectFit={'contain'} className={stack(styles.bottom__image)} alt={''}
                              image={icon}></GatsbyImage>}
                {techHelpPageData?.wpPage?.orderEmergency?.emergencyHelpTekst && <p className={stack('text-prime', styles.bottom__text)} dangerouslySetInnerHTML={{__html: techHelpPageData?.wpPage?.orderEmergency?.emergencyHelpTekst}}></p>}
            </div>
        </div>
    );
};

export default EmergencyHelp;
