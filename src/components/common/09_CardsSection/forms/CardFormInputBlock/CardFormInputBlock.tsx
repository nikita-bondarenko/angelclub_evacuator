import React, {useEffect, useState} from 'react';
import {CardInputItem} from "../NewCardForm/NewCardForm";
import CardFormInput from "../CardFormInput/CardFormInput";
import {useCardContext} from "../../context";

type CardFormInputBlockProps = {
    input: CardInputItem,
    inputs: CardInputItem[],
    type: 'card' | 'possessor' | 'possessorOrCar' | 'possessorAndCar',

}

const CardFormInputBlock = ({input, inputs, type} : CardFormInputBlockProps) => {

    const {updateCardInput} = useCardContext()
        const clickHandler = () => {
            if (input.sectionId === 'second' && type === 'possessorOrCar') {
                const callback = (arr: CardInputItem[], key: string) => {
                    const item = inputs.find(input => input.key === key && input.sectionId === 'second')
                    if (item) return [...arr, item]
                    return arr
                }

                const carInputArr: CardInputItem[] = ['carMark', 'carModel', 'carYear',
                    'carNumber'].reduce(callback, [])

                const possessorInputArr: CardInputItem[] = ['name', 'secondName', 'thirdName',
                    'email', 'phone'].reduce(callback, [])

                const isCar = input.key === 'carMark' || input.key === 'carModel' || input.key === 'carYear' || input.key === 'carNumber'
                carInputArr.forEach(item => updateCardInput(item.id, 'isBlocked', !isCar))
                possessorInputArr.forEach(item => updateCardInput(item.id, 'isBlocked', isCar))
            }
        }
        const [value, setValue] = useState<string>()

    const {isNewCardModalOpen} = useCardContext()

        useEffect(() => {
            updateCardInput(input.id, 'value', value)
        }, [value])

    useEffect(() => {
        if (!isNewCardModalOpen) {
            setValue(undefined)
        }
    }, [isNewCardModalOpen])

        return (
            <CardFormInput
                onClick={clickHandler}
                key={input.id}
                value={value || ''} placeholder={input.placeholder}
                setValue={setValue}
                isBlocked={input.isBlocked || input.isClosed} items={input.items}
                isInvalid={input.isInvalid}
                type={input.type}></CardFormInput>
        )
};

export default CardFormInputBlock;
