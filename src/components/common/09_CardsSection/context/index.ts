import {createContext, Dispatch, SetStateAction, useContext} from "react";
import {CardItem, CardType, CarMark, CarModel, SearchItem} from "../config";
import {CardInputItem} from "../forms/NewCardForm/NewCardForm";

export type CardContextType = {
    selectedCard: Queries.WpPage_Cards_cardsSpisokKart | undefined,
    setSelectedCard: Dispatch<SetStateAction<Queries.WpPage_Cards_cardsSpisokKart | undefined>>,

    isNewCardModalOpen: boolean,
    setIsNewCardModalOpen: Dispatch<SetStateAction<boolean>>,
    isProlongCardModalOpen: boolean,
    setIsProlongCardModalOpen: Dispatch<SetStateAction<boolean>>,
    years: SearchItem[],
    carMarks: CarMark[],
    cardTypes: CardType[],
    selectedCardType: CardType | undefined,
    setSelectedCardType: Dispatch<SetStateAction<CardType | undefined>>,
    setIsAgreed: Dispatch<SetStateAction<boolean>>,
    isAgreed: boolean,
    firstCarModels: CarModel[],
    setFirstCarModels: Dispatch<SetStateAction<CarModel[]>>,
    secondCarModels: CarModel[],
    setSecondCarModels: Dispatch<SetStateAction<CarModel[]>>,
    cardInputs: string,
    setCardInputs: Dispatch<SetStateAction<string>>,
    updateCardInput: (id: number, key: 'value' | 'isInvalid' | 'isBlocked', value: any) => void,
    isSecondPossessor: boolean | undefined,
    setIsSecondPossessor: Dispatch<SetStateAction<boolean | undefined>>
    gap: number,
    width: number
}


export const CardContext = createContext<CardContextType | null>(null)

export const useCardContext = () => {
    const currentContext = useContext(CardContext)

    if (!currentContext) {
        throw new Error(
            "usePurchaseSaleContext has to be used within <CardContext.Provider>"
        );
    }
    return currentContext
}
