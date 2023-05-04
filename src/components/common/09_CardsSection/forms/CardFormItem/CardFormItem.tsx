import React, {Fragment, ReactElement, ReactNode, useEffect, useMemo, useState} from 'react';
import CardFormInput from "../CardFormInput/CardFormInput";
import {getCardTypes, CarModel, PossessorData} from "../../config";
import {useCardContext} from "../../context";
import * as styles from './CardFormItem.module.css'
import {CardInputItem} from "../NewCardForm/NewCardForm";
import CardFormInputBlock from "../CardFormInputBlock/CardFormInputBlock";

type CardFormItemProps = {
    name: string,
    type: 'card' | 'possessor' | 'possessorOrCar' | 'possessorAndCar',
}

const CardFormItem = ({name, type}: CardFormItemProps) => {

    const [inputs, setInputs] = useState<CardInputItem[]>([])

    const {
        setSelectedCardType,
        selectedCardType,
        cardInputs,
        updateCardInput,
        cardTypes
    } = useCardContext()

    const updateInputsArr = () => {
        if (cardInputs) {
            type === 'possessor' && setInputs(JSON.parse(cardInputs).filter((item: CardInputItem) => item.sectionId === 'first'))
            type === 'possessorOrCar' && setInputs(JSON.parse(cardInputs).filter((item: CardInputItem) => item.sectionId === 'second'))
            type === 'possessorAndCar' && setInputs(JSON.parse(cardInputs).filter((item: CardInputItem) => item.sectionId === 'second'))
        }
    }


    useEffect(() => {
        updateInputsArr()
    }, [cardInputs, type])

    useEffect(() => {
        if (cardInputs) {
            const inputArr: CardInputItem[] = ['name', 'secondName', 'thirdName',
                'email', 'phone', 'carMark', 'carModel', 'carYear',
                'carNumber'].reduce((arr: CardInputItem[], key: string) => {
                const item = JSON.parse(cardInputs).find((input: CardInputItem) => input.key === key && input.sectionId === 'second')
                if (item) return [...arr, item]
                return arr
            }, [])
            inputArr.forEach(item => updateCardInput(item.id, 'isBlocked', false))
            inputArr.forEach(item => updateCardInput(item.id, 'isInvalid', false))

        }
    }, [type])

    const selectChangeHandle = (value: string | undefined) => {
        const card = cardTypes.find(item => item.name === value)
        setSelectedCardType(card)
    }

    return (
        <div className={styles.content}>
            <h2 className={styles.title}>{name}</h2>
            <div className={styles.body}>
                {type === 'card' ?
                    <CardFormInput value={selectedCardType?.name} items={cardTypes} setValue={selectChangeHandle}
                                   type={'select'}></CardFormInput> :  <>
                        {inputs.map(input => <CardFormInputBlock key={input.id} input={input} type={type} inputs={inputs}/>)}
                    </>
                }
            </div>
        </div>
    )
        ;
};

export default CardFormItem;
