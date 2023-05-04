import React from 'react';
import AutoCrush from "./sections/01_AutoCrush/AutoCrush";
import HowWeHelp from "./sections/02_HowWeHelp/HowWeHelp";
import CallMechanic from "./sections/03_CallMechanic/CallMechanic";
import WeArrive from "./sections/06_WeArrive/WeArrive";
import EmergencyHelp from "./sections/09_EmergencyHelp/EmergencyHelp";
import ServiceSteps from "./sections/04_ServiceSteps/ServiceSteps";
import WhenToCall from "./sections/08_WhenToCall/WhenToCall";
import WhyAngelTech from "./sections/07_WhyAngelTech/WhyAngelTech";
import PriceTables from "./sections/05_PriceTables/PriceTables";
import CardsSection from "../../common/09_CardsSection/CardsSection";
import {useGlobalContext} from "../../../context/context";
import FeedbackSection from "../../common/10_FeedbackSection/FeedbackSection";
import Bottom from "../../common/Bottom/Bottom";
import Gift from "./sections/07_Gift/Gift";

const TechHelpPage = () => {
    const {techHelpPageData} = useGlobalContext()
    return (
        <>
            <AutoCrush></AutoCrush>
            <HowWeHelp></HowWeHelp>
            <CallMechanic></CallMechanic>
            <ServiceSteps></ServiceSteps>
            <PriceTables></PriceTables>
            <WeArrive></WeArrive>
            <CardsSection pageName={'techhelp'} title={techHelpPageData?.wpPage?.cards?.cardsZagolovok || undefined}></CardsSection>
           <Bottom>
               {/*<Gift></Gift>*/}
               <WhyAngelTech></WhyAngelTech>
               <WhenToCall></WhenToCall>
               {techHelpPageData?.wpPage?.feedbacks && <FeedbackSection dataFromProps={techHelpPageData?.wpPage?.feedbacks}></FeedbackSection>}
               <EmergencyHelp></EmergencyHelp>
           </Bottom>
        </>
    );
};

export default TechHelpPage;
