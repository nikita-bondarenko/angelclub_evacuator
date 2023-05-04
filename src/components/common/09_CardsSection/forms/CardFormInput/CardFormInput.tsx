import React, {Dispatch, useEffect, useState} from 'react';
import InputMask from "react-input-mask";
import * as styles from './CardFormInput.module.css'
import {CardType, CarMark, CarModel, SearchItem} from "../../config";
import {useCardContext} from "../../context";
import InputArrow from "./InputArrow";


type CardFormInput = {
    type: 'select' | 'text' | 'phone' | 'search',
    value: string | undefined,
    setValue: (arg: string | undefined) => void,
    isInvalid?: boolean,
    placeholder?: string,
    className?: string,
    items?: SearchItem[] | CarMark[] | CarModel[] | CardType[]
    isBlocked?: boolean,
    onClick?: () => void,
    label?: string,
    isLight?:boolean
}

const CardFormInput = ({
                           type,
                           value,
                           setValue,
                           isInvalid,
                           placeholder,
                           className,
                           items,
                           isBlocked,
                           onClick, label, isLight
                       }: CardFormInput) => {


    const [selectedSearchItem, setSelectedSearchItem] = useState<SearchItem | CarMark | CarModel | CardType>()
    const [searchValue, setSearchValue] = useState<string>()
    const [filteredItems, setFilteredItems] = useState<SearchItem[] | CarMark[] | CarModel[] | CardType[] | undefined>()
    const [isSearchedListOpen, setIsSearchedListOpen] = useState(false)

    const clickHandler = () => {
        onClick && onClick()
    }

    useEffect(() => {
        if (searchValue) {
            const arr = items?.filter(item => item.name.toLowerCase().includes(searchValue.toLowerCase()) || searchValue.toLowerCase().includes(item.name.toLowerCase()))
            setFilteredItems(arr)
            const searchedItem = items?.find(item => item.name === searchValue)
            if (searchedItem) {
            } else {
                setSelectedSearchItem(undefined)
            }
            return () => {
                setFilteredItems(items)
            }
        } else {
            setSelectedSearchItem(undefined)
        }
    }, [searchValue])

    useEffect(() => {
        if (items) {
            setFilteredItems(items)
        }
    }, [items])

    useEffect(() => {
        setValue(selectedSearchItem ? selectedSearchItem.name : undefined)
        if (selectedSearchItem) setSearchValue(selectedSearchItem.name)
    }, [selectedSearchItem])

    if (type === 'text') {
        return (<div onClick={clickHandler}
                     className={[isLight ? styles.light : '',styles.body, className ? className : '', isBlocked ? styles.blocked : ''].join(' ')}>
            {label && <h3 className={styles.label}>{label}</h3>}
            <input className={[styles.input, isInvalid ? styles.invalid : ''].join(' ')} value={value}
                   placeholder={placeholder} onChange={e => setValue(e.target.value)} type="text"/>
        </div>)
    }

    if (type === 'phone') {
        return (<div onClick={clickHandler}
                     className={[isLight ? styles.light : '',styles.body, className ? className : '', isBlocked ? styles.blocked : ''].join(' ')}>
            {label && <h3 className={styles.label}>{label}</h3>}

            <InputMask className={[styles.input, isInvalid ? styles.invalid : ''].join(' ')} value={value}
                       mask={'+7\\ (999) - 999 - 99 - 99'}
                       onChange={e => setValue(e.target.value)}
                       placeholder={placeholder} type="text"
            ></InputMask>
        </div>)
    }

    useEffect(() => {
        if (searchValue !== value) {
            setSearchValue(value)

        }
    }, [value])

    if (type === 'search') {
        return (
            <div onClick={clickHandler}
                 onBlur={() => setIsSearchedListOpen(false)}
                 className={[isLight ? styles.light : '',styles.body, className ? className : '', isBlocked ? styles.blocked : ''].join(' ')}>

                <input placeholder={placeholder} onClick={() => setIsSearchedListOpen(prev => !prev)}
                       value={searchValue || ''} onChange={(e) => setSearchValue(e.target.value)}
                       className={[styles.input, isInvalid ? styles.invalid : ''].join(' ')} type="text"/>
                <InputArrow></InputArrow>

                <ul className={[styles.list, isSearchedListOpen ? styles.open : ''].join(' ')}>
                    {filteredItems ? filteredItems.map(({id, name}) => <li
                            onClick={() => (setSelectedSearchItem({id, name}), setIsSearchedListOpen(false))}
                            className={styles.list__item} key={id}>{name}</li>) :
                        <span>Ничего не найдено</span>}
                </ul>
            </div>
        )
    }


    if (type === 'select') {
        return (
            <div onClick={clickHandler}
                 onBlur={() => setIsSearchedListOpen(false)}
                 className={[isLight ? styles.light : '',styles.body, className ? className : '', isBlocked ? styles.blocked : ''].join(' ')}>
                {label && <h3 className={styles.label}>{label}</h3>}
                <div className={styles.content}>
                    <button onClick={() => setIsSearchedListOpen(prev => !prev)}
                            className={[styles.input, isInvalid ? styles.invalid : ''].join(' ')}>{value || placeholder}</button>

                    <InputArrow></InputArrow>
                    <ul className={[styles.list, isSearchedListOpen ? styles.open : ''].join(' ')}>
                        {items ? items.map(({id, name}) => <li
                                onClick={() => (setSelectedSearchItem({id, name}), setIsSearchedListOpen(false))}
                                className={styles.list__item} key={id}>{name}</li>) :
                            <span>Ничего не найдено</span>}
                    </ul>
                </div>

            </div>
        )
    }

    return null
        ;
};

export default CardFormInput;
