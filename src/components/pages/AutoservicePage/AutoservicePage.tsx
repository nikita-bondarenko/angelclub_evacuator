import React from 'react';
import YourService from './sections/01_YourService/YourService';
import SelectMark from "./sections/02_SelectMark/SelectMark";
import ServiceDescription from "./sections/03_ServiceDescription/ServiceDescription";
import Bottom from "../../common/Bottom/Bottom";
import AutoserviceAdvantage from "./sections/04_AutoserviceAdvantage/AutoserviceAdvantage";
import OrderForm from "../../common/OrderForm/OrderForm";
import CardsSection from "../../common/09_CardsSection/CardsSection";
import BookTime from "./sections/08_BookTime/BookTime";
import PriceList from "./sections/07_PriceList/PriceList";
import {useGlobalContext} from "../../../context/context";
import Partner from "./sections/05_Partner/Partner";

const AutoservicePage = () => {

    const {autoservicePageData} = useGlobalContext()
    return (
        <>
            <YourService></YourService>
            {/*<SelectMark></SelectMark>*/}
            <ServiceDescription></ServiceDescription>
            <AutoserviceAdvantage></AutoserviceAdvantage>
            <Partner></Partner>
            <OrderForm title={autoservicePageData?.wpPage?.formOrder?.formOrderZagolovok || ''}
                       emailSubject={'Заявка со страницы автосервиса'}
                       buttonText={autoservicePageData?.wpPage?.formOrder?.formOrderTekstKnopki || ''}
                       subtitle={autoservicePageData?.wpPage?.formOrder?.formOrderPodzagolovok || ''}></OrderForm>
            <CardsSection></CardsSection>
            <Bottom>
                <PriceList></PriceList>
                <BookTime></BookTime>
            </Bottom>
        </>
    );
};

export default AutoservicePage;
