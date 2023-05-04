import React, {useEffect, useState} from 'react';
import InputMask from "react-input-mask";
import * as styles from './ReadyForm.module.css'
import Checkbox from "./checkbox/Checkbox";
import Cars, {getCars} from "../Cars/Cars";
import {useGlobalContext} from "../../../../../../context/context";
import {useExtensions} from "../hooks/useExtensions";
import ExtensionItem from "./ExtensionItem";
import {useMutation} from "@apollo/client";
import {SEND_MAIL} from "../../../../../../mutations/sendMail";
import {gql} from "apollo-boost";
import {EMAIL, EMAIL_SECOND} from "../../../../../../config";
import {v4} from 'uuid'

export type Extension = { id: number, label: string, value: string, funcOn?: (arg: number) => number, funcOff?: (arg: number) => number, pulldown?: string, price: number }


const initAmount = 3500

const ReadyForm = () => {

    const [phone, setPhone] = useState<string>('')
    const [amount, setAmount] = useState<number>(initAmount)
    const [blockedWheelAmount, setBlockedWheelAmount] = useState(0)
    const [totalPrice, setTotalPrice] = useState<number>(0)
    const [priceForBlockedWheels, setPriceForBlockedWheels] = useState(0)
    const [blockedWheels, setBlockedWheels] = useState<boolean[]>([true, false, false, false, false])
    const [isSymbolHovered, setIsSymbolHovered] = useState(false)
    const [selectedExtensions, setSelectedExtensions] = useState<Extension[]>([])
    const [isPhoneInvalid, setIsPhoneInvalid] = useState(false)
    const [isKmSelected, setIsKmSelected] = useState(false)
    const [kmInputValue, setKmInputValue] = useState(0)
    const [kmPrice, setKmPrice] = useState(0)


    const [cars] = getCars()

    const {
        carType, setIsSuccessModalOpen, setCarType, evacuatorPageData
    } = useGlobalContext()

    const [extensions] = useExtensions()

    const updateBlockedWheels = (index: number, value: boolean) => {
        const arr = [false, false, false, false, false]
        arr[index] = value
        setBlockedWheels(arr)
    }

    useEffect(() => {
        if (blockedWheels && evacuatorPageData && evacuatorPageData?.wpPage?.whereAreYou?.whereAreYouCalculatorCzenaZaOdnoZablokirovannoeKoleso) {
            let coficient = 0
            const item = blockedWheels.find(wheel => wheel)
            if (item) {
                coficient = blockedWheels.indexOf(item)
            }
            setPriceForBlockedWheels(coficient * evacuatorPageData?.wpPage?.whereAreYou?.whereAreYouCalculatorCzenaZaOdnoZablokirovannoeKoleso)
            setBlockedWheelAmount(coficient)
        }
    }, [blockedWheels, evacuatorPageData])

    useEffect(() => {
        setTotalPrice(priceForBlockedWheels + amount)
    }, [priceForBlockedWheels, amount])

    useEffect(() => {
        setIsKmSelected(selectedExtensions.some(item => item.label.toLowerCase().includes('мкад')))
    }, [selectedExtensions])
    useEffect(() => {
        if (extensions) {
            const item = extensions.find(el => el.label.toLowerCase().includes('мкад'))
            if (item) {
                setKmPrice(item.price)
            }
        }
    }, [extensions])

    useEffect(() => {

        if (carType) {
            if (isKmSelected) {
                const initPrice = carType.price
                console.log(initPrice)
                const price = selectedExtensions.reduce((acc: number, item) => {
                    return item.funcOn ? item.funcOn(acc) : acc
                }, initPrice)

                const res = price + kmPrice * kmInputValue
                console.log(res)

                setAmount(res)
                return () => {
                    setAmount(prev => {
                        return prev - kmPrice * kmInputValue
                    })
                }
            }
        }
    }, [kmInputValue, isKmSelected])
    // const updatePrice = () => {
    //     price = selectedExtensions.reduce((acc: number, item) => {
    //         return item.funcOn ? item.funcOn(acc) : acc
    //     }, totalPrice)
    //     setAmount(price)
    // }

    useEffect(() => {
        if (carType) {
            let price = carType.price
            price = selectedExtensions.reduce((acc: number, item) => {
                return item.funcOn ? item.funcOn(acc) : acc
            }, price)
            setAmount(price)
        }
    }, [carType])

    const updateSelectedExtensions = (id: number, value: boolean) => {
        if (!extensions) return
        const extension = extensions.find(item => item.id == id)
        if (extension) {
            if (value) {
                // @ts-ignore
                extension.funcOn && setAmount(prev => extension.funcOn(prev))
                setSelectedExtensions(prev => [...prev, extension])
            } else {
                // @ts-ignore
                extension.funcOff && setAmount(prev => extension.funcOff(prev))
                setSelectedExtensions(prev => prev.filter(item => item.id !== id))
            }
        }
    }

    const id = v4()

    const [mutation] = useMutation(gql`
                mutation SEND_EMAIL {
                    sendEmail(
                        input: {
                            to: "${EMAIL}"
                            from: "mail@testingplace.ru"
                            subject: "Вызов эвакуатора"
                            body: "<p><strong>Телефон</strong>: ${phone}</p><p><strong>Количество заблокированных колес</strong>: ${blockedWheelAmount}</p><p><strong>Тип авто</strong>: ${carType?.value}</p><p><strong>Дополнительно</strong>:${selectedExtensions.reduce((str: string, item, index) => str  + (str.length  ? `, ` : '') + item.value.replace('?', ''), '')}</p><p><strong>Итого</strong>: ${totalPrice.toLocaleString('ru')} руб.</p>"
                            clientMutationId: "${id}"
                        }
                    ) {
                        origin
                        sent
                        message
                    }
                }
        `
    )

    const [mutation2] = useMutation(gql`
                mutation SEND_EMAIL {
                    sendEmail(
                        input: {
                            to: "${EMAIL_SECOND}"
                            from: "mail@testingplace.ru"
                            subject: "Вызов эвакуатора"
                            body: "<p><strong>Телефон</strong>: ${phone}</p><p><strong>Количество заблокированных колес</strong>: ${blockedWheelAmount}</p><p><strong>Тип авто</strong>: ${carType?.value}</p><p><strong>Дополнительно</strong>:${selectedExtensions.reduce((str: string, item, index) => str  + (str.length  ? `, ` : '') + item.value.replace('?', ''), '')}</p><p><strong>Итого</strong>: ${totalPrice.toLocaleString('ru')} руб.</p>"
                            clientMutationId: "${id}"
                        }
                    ) {
                        origin
                        sent
                        message
                    }
                }
        `
    )


    const initValues = () => {
        setIsSuccessModalOpen(true)
        setIsPhoneInvalid(false)
        setBlockedWheels([true, false, false, false, false])
        cars && setCarType(cars[0])
        setPhone('')
        setSelectedExtensions([])
    }

    const submitHandler = () => {

        if (!phone || phone.includes('_')) {
            setIsPhoneInvalid(true)

        } else {

            mutation()
            mutation2()
            initValues()
        }

    }


    return (
        <div className={styles.body}>
            <div className={styles.cars}>
                <Cars></Cars>
            </div>
            <div className={styles.top}>
                <div className={styles.top__row}>
                    <div>
                        <h3 className={styles.label}>Сколько колёс заблокировано? <span
                            className={styles.label__simbol} onMouseEnter={() => setIsSymbolHovered(true)}
                            onMouseLeave={() => setIsSymbolHovered(false)}>!
                            <div className={[styles.pulldown, isSymbolHovered ? styles.open : ''].join(' ')}>
                                <div className={styles.pulldown__wrapper}>
                                    <div className={styles.pulldown__body}>Индивидуальная цена при блоке 4 колёс</div>
                                    <div className={styles.pulldown__triangle}></div>
                                </div>
                            </div>
                        </span></h3>
                        <ul className={styles.wheels}>
                            {blockedWheels.map((wheel, index) => <li className={styles.wheels__block} key={index}>
                                    <label className={styles.wheels__item}>
                                        <Checkbox value={wheel}
                                                  onChange={value => updateBlockedWheels(index, value)}></Checkbox>
                                        <span className={styles.text}>{index}</span>
                                    </label>
                                </li>
                            )}
                        </ul>
                    </div>
                    <div className={[styles.phone, styles.first].join(' ')}>
                        <h3 className={styles.label}>Ваш телефон?</h3>

                        <InputMask value={phone} mask={'+7\\ (999) - 999 - 99 - 99'}
                                   onChange={e => setPhone(e.target.value)}
                                   placeholder={'+7 (999)-999-99-99'}
                                   className={[styles.phone__input, isPhoneInvalid ? styles.invalid : '', styles.first].join(' ')}
                                   type="text"
                        ></InputMask>
                    </div>
                </div>
                <div className={styles.ext}>
                    <h3 className={styles.label}>Дополнительно:</h3>
                    <ul className={styles.ext__list}>
                        {extensions && extensions.map(item => <ExtensionItem
                            setInputValue={setKmInputValue}
                            {...item} key={item.id}
                            selectedExtensions={selectedExtensions}
                            updateSelectedExtensions={updateSelectedExtensions}
                           ></ExtensionItem>)}
                    </ul>

                </div>
                <div className={[styles.phone, styles.second].join(' ')}>
                    <h3 className={styles.label}>Ваш телефон?</h3>

                    <InputMask value={phone} mask={'+7\\ (999) - 999 - 99 - 99'}
                               onChange={e => setPhone(e.target.value)}
                               placeholder={'+7 (999)-999-99-99'}
                               className={[styles.phone__input, isPhoneInvalid ? styles.invalid : '', styles.first].join(' ')}
                               type="text"
                    ></InputMask>
                </div>
            </div>
            <div className={styles.bottom}>
                <div className={styles.bottom__amount}>
                    <p className={styles.amount__text}>Сумма заказа:</p>
                    <span className={styles.amount__value}>{Math.floor(totalPrice).toLocaleString('ru')} руб.</span>
                </div>
                {evacuatorPageData?.wpPage?.whereAreYou?.whereAreYouCalculatorHrefSsylki &&
                    <a href={evacuatorPageData?.wpPage?.whereAreYou?.whereAreYouCalculatorHrefSsylki}
                       className={[styles.bottom__link, styles.first].join(' ')}>{evacuatorPageData?.wpPage?.whereAreYou?.whereAreYouCalculatorTekstSsylki}</a>}
                <div className={styles.bottom__link_wrapper}>
                    {evacuatorPageData?.wpPage?.whereAreYou?.whereAreYouCalculatorHrefSsylki &&
                        <a href={evacuatorPageData?.wpPage?.whereAreYou?.whereAreYouCalculatorHrefSsylki}
                           className={[styles.bottom__link, styles.second].join(' ')}>{evacuatorPageData?.wpPage?.whereAreYou?.whereAreYouCalculatorTekstSsylki}</a>}
                    <div className={styles.bottom__button_section}>
                        <button onClick={submitHandler}
                                className={styles.bottom__button}>{evacuatorPageData?.wpPage?.whereAreYou?.whereAreYouCalculatorTekstKnopki}</button>
                        <span className={[styles.error, isPhoneInvalid ? styles.visible : ''].join(' ')}>Заполните все необходимые поля</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReadyForm;
