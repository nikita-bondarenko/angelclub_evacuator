import React, {Dispatch, SetStateAction, useEffect} from 'react';
import * as styles from './Select.module.css'
import {stack} from "../../../../hooks/useClassName";
import arrow from "./image/arrow-up.png";

export type SelectItem = {
    name: string
}

type SelectProps = {
    items: SelectItem[],
    setValue: Dispatch<SetStateAction<SelectItem>>,

    value?: SelectItem
    className?: string,
    placeholder?: string,
    disabled?: boolean

}

const Select = ({items, setValue, className, placeholder, disabled, value}: SelectProps) => {
    useEffect(() => {
        console.log(value)
    }, [value])
    return (
        <div className={stack(styles.select, className)}>
            <input value={value?.name || ''} onChange={() => null} placeholder={placeholder} type="text" className={stack('text-prime', styles.select__input, disabled || items.length === 0 && styles.disable)}/>
            <img className={styles.select__arrow} src={arrow} alt={''}></img>
            <div className={styles.select__dropdown}>
                <ul className={styles.select__list}>
                    {items.map(item => <li onMouseDown={() => setValue(item)} className={stack('text-prime', styles.select__item)}
                                           key={item.name}>{item.name}</li>)}
                </ul>
            </div>
        </div>
    );
};

export default Select;
