import React from 'react';
import MainPageHero from "./sections/01_MainPageHero/MainPageHero";
import MainPageBenefits from "./sections/02_MainPageBenefits/MainPageBenefits";
import MainPageCeil from "./sections/04_MainPageCeil/MainPageCeil";
import MainPageTrust from "./sections/05_MainPageTrust/MainPageTrust";
import CardsSection from "../../common/09_CardsSection/CardsSection";
import FeedbackSection from "../../common/10_FeedbackSection/FeedbackSection";
import MainPageOrder from "./sections/07_MainPageOrder/MainPageOrder";
import SupportLine from "../../common/12_SupportLine/SupportLine";
import MainPageEveryone from "./sections/10_MainPageEveryone/MainPageEveryone";
import Bottom from "../../common/Bottom/Bottom";
import {mainPageFaqs} from "./config";
import FaqSection from "../../common/11_FaqSection/FaqSection";

const MainPage = () => {
    return (
        <>
            <MainPageHero></MainPageHero>
            <MainPageBenefits></MainPageBenefits>
            <CardsSection pageName={'main'}></CardsSection>
            <Bottom>
                <MainPageCeil></MainPageCeil>
                <MainPageTrust></MainPageTrust>
                <FeedbackSection></FeedbackSection>
                <MainPageOrder></MainPageOrder>
                <FaqSection faqs={mainPageFaqs}></FaqSection>
                <SupportLine></SupportLine>
                <MainPageEveryone></MainPageEveryone>
            </Bottom>
        </>
    );
};

export default MainPage;
