import React from 'react';
import EvacuatorPageHero from "./sections/01_EvacuatorPageHero/EvacuatorPageHero";
import EvacuatorPageBenefitsSection from "./sections/02_EvacuatorPageBenefitsSection/EvacuatorPageBenefitsSection";
import EvacuatorPageWeReadySection from "./sections/03_EvacuatorPageWeReadySection/EvacuatorPageWeReadySection";
import EvacuatorPageHowWorkSection from "./sections/04_EvacuatorPageHowWorkSection/EvacuatorPageHowWorkSection";
import EvacuatorPageAutopark from "./sections/05_EvacuatorPageAutopark/EvacuatorPageAutopark";
import EvacuatorPageWhyAngelSection from "./sections/06_EvacuatorPageWhySection/EvacuatorPageWhyAngelSection";
import EvacuatorPageStockSection from "./sections/07_EvacuatorPageStockSection/EvacuatorPageStockSection";
import EvacuatorPageOrderSection from "./sections/08_EvacuatorPageOrderSection/EvacuatorPageOrderSection";
import CardsSection from "../../common/09_CardsSection/CardsSection";
import Bottom from "../../common/Bottom/Bottom";
import FeedbackSection from "../../common/10_FeedbackSection/FeedbackSection";
import SupportLine from "../../common/12_SupportLine/SupportLine";
import {evacuatorPageFaqs} from "./config";
import FaqSection from "../../common/11_FaqSection/FaqSection";

const EvacuatorPage = () => {
    return (
        <>
            <EvacuatorPageHero></EvacuatorPageHero>
            <EvacuatorPageBenefitsSection></EvacuatorPageBenefitsSection>
            <EvacuatorPageWeReadySection></EvacuatorPageWeReadySection>
            <EvacuatorPageHowWorkSection></EvacuatorPageHowWorkSection>
            <EvacuatorPageAutopark></EvacuatorPageAutopark>
            <EvacuatorPageWhyAngelSection></EvacuatorPageWhyAngelSection>
            <EvacuatorPageStockSection></EvacuatorPageStockSection>
            <EvacuatorPageOrderSection></EvacuatorPageOrderSection>
            <CardsSection pageName={'evacuator'}></CardsSection>
            <Bottom>
                <FeedbackSection></FeedbackSection>
                <FaqSection pageName={'evacuator'} faqs={evacuatorPageFaqs}></FaqSection>
                <SupportLine></SupportLine>
            </Bottom>
        </>
    );
};

export default EvacuatorPage;
