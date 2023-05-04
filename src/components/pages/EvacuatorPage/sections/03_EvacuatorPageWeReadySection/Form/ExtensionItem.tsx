import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import * as styles from "./ReadyForm.module.css";
import Checkbox from "./checkbox/Checkbox";
import {Extension} from "./ReadyForm";
import {stack} from "../../../../../../hooks/useClassName";

type ExtensionItemProps = {
    price: number,
    id: number,
    label: string,
    pulldown?: string,
    selectedExtensions: Extension[],
    updateSelectedExtensions: (id: number, value: boolean) => void,

    setInputValue: Dispatch<SetStateAction<number>>
}
const ExtensionItem = ({
                           id,
                           label,
                           pulldown,
                           updateSelectedExtensions,
                           selectedExtensions,

                           price, setInputValue
                       }: ExtensionItemProps) => {
    const [isHovered, setIsHovered] = useState(false)
    const [isChecked, setIsChecked] = useState(false)
    const [value, setValue] = useState<number>()
    const isSpecial = id === 1
    const [isMkadAhead, setIsMkadAhead] = useState(false)

    useEffect(() => {
        value !== undefined ? setInputValue(value) : setInputValue(0)
    }, [value])

    useEffect(() => {
        setIsMkadAhead(label.toLowerCase().includes('мкад'))
    }, [])



    useEffect(() => {
        setIsChecked(selectedExtensions.some(item => item.id === id))
    }, [selectedExtensions])

    useEffect(() => {
    }, [value])

    return (<li className={styles.ext__item} key={id}>
        <label className={styles.ext__label}>
            <Checkbox value={isChecked}
                      onChange={value => updateSelectedExtensions(id, value)}></Checkbox>
            <div
                className={[styles.text, styles.ext__text].join(' ')}
            >{label && <span className={[styles.text, styles.ext__text].join(' ')}
                             dangerouslySetInnerHTML={{__html: label}}></span>}
                {pulldown && <span
                    className={styles.ext__symbol} onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}>?
                                            <div className={[styles.pulldown, isHovered ? styles.open : ''].join(' ')}>
                                                <div className={styles.pulldown__wrapper}>
                                                    <div
                                                        className={[styles.pulldown__body, isSpecial ? styles.high : ''].join(' ')}
                                                        dangerouslySetInnerHTML={{__html: pulldown}}>
                                                    </div>
                                                    <div className={styles.pulldown__triangle}></div>
                                                </div>
                                            </div>
                                            </span>}

            </div>
        </label>
        {isMkadAhead && <div className={styles.ext__wrapper}>
            {/*@ts-ignore  */}
            <input value={value || ''} onChange={e => setValue(e.target.value)}
                   className={stack(styles.ext__input, isChecked && styles.open)}
                   placeholder={'Расстояние в километрах'} type="number"/>
        </div>}
    </li>)
}

export default ExtensionItem;
