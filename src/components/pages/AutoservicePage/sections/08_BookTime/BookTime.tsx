import React, {useEffect, useState} from 'react';
import * as styles from './BookTime.module.css'
import {stack} from "../../../../../hooks/useClassName";
import {useGlobalContext} from "../../../../../context/context";
import Select, {SelectItem} from "../../../../common/FormInputs/Select/Select";
import DayInput from "../../../../common/FormInputs/DayInput/DayInput";
import TimeInput from "../../../../common/FormInputs/TimeInput/TimeInput";
import Background from "../../../../common/Background/Background";
import TextInput from "../../../../common/FormInputs/TextInput/TextInput";
import {useMails} from "../../../../../hooks/useMails";
import {EMAIL, EMAIL_FROM, EMAIL_SECOND} from "../../../../../config";
import {useMutation} from "@apollo/client";
import {sendCustomMail} from "../../../../../mutations/sendCustomMail";

const BookTime = () => {
    const {setIsSuccessModalOpen} = useGlobalContext()
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [carModel, setCarModel] = useState('')
    const [carMark, setCarMark] = useState('')
    const [carNumber, setCarNumber] = useState('')
    const [isFormInvalid, setIsFormInvalid] = useState(true)
    const inputArr = [date, time, carModel, carMark, carNumber]
    const [mailBody, setMailBody] = useState('')

    const subject = 'Бронь со страницы автосервиса'
  const [mutation] = useMutation(sendCustomMail({mailTo: EMAIL, mailFrom: EMAIL_FROM, body: mailBody, subject}))
    const [mutation2] = useMutation(sendCustomMail({mailTo: EMAIL_SECOND, mailFrom: EMAIL_FROM, body: mailBody, subject}))

    useEffect(() => {
        setIsFormInvalid(inputArr.some(item => !item.trim()))
    }, inputArr)

    useEffect(() => {

        setMailBody(`<strong>Информация о брони</strong> <br/><p><strong>Марка автомобиля:</strong>&nbsp; ${carMark}</p><p><strong>Модель автомобиля:</strong>&nbsp; ${carModel}</p><p><strong>Гос. номер автомобиля:</strong>&nbsp; ${carNumber}</p><p><strong>Дата:</strong>&nbsp; ${date}</p><p><strong>Время:</strong>&nbsp; ${time}</p>`)

    }, [time, date, carMark, carNumber, carModel])

    const submitHandler = () => {
        if (!isFormInvalid) {
            mutation()
            mutation2()
            setIsSuccessModalOpen(true)
        }
    }

    const {autoservicePageData} = useGlobalContext()
    return (
        <Background>
            <div className={stack(styles.body)}>
                <div className={styles.content}>
                    <h2 className={stack('title-secondary', styles.title)}>{autoservicePageData?.wpPage?.bookTime?.bookTimeZagolovok}</h2>
                    <p className={stack('text-prime', styles.text)}
                       dangerouslySetInnerHTML={{__html: autoservicePageData?.wpPage?.bookTime?.bookTimeTekst}}></p>
                    <div className={styles.group}>
                        <TextInput setValue={setCarMark} placeholder={'Марка автомобиля'}
                                   className={styles.group__big__item}></TextInput>
                        <TextInput setValue={setCarModel} placeholder={'Модель автомобиля'}
                                   className={styles.group__small__item}></TextInput>
                        <TextInput setValue={setCarNumber} placeholder={'Гос. номер автомобиля'}
                                   className={styles.group__small__item}></TextInput>
                        <DayInput setValue={setDate} placeholder={'Дата'}
                                  className={styles.group__small__item}></DayInput>
                        <TimeInput setValue={setTime} className={styles.group__small__item}
                                   placeholder={'Время'}></TimeInput>
                    </div>
                    <button onClick={submitHandler}
                        className={stack('button-secondary', styles.submit, isFormInvalid && styles.disabled)}>{autoservicePageData?.wpPage?.bookTime?.bookTimeTekstKnopki}</button>
                </div>
            </div>
        </Background>

    );
};

export default BookTime;
