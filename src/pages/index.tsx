import React, {ReactNode, useEffect, useState} from 'react';

import {GlobalContext, GlobalContextType, globalState, useGlobalContext} from "../context/context";


import '../styles/index.css';
import {graphql, PageProps, useStaticQuery} from "gatsby";
import Layout from "../components/layout/Layout";
import {RootQuery} from "../types/types";
import MainPage from "../components/pages/MainPage/MainPage";
import useIsClient from "../hooks/useIsClient";
import EvacuatorPage from "../components/pages/EvacuatorPage/EvacuatorPage";
import Seo from "../components/layout/Seo";


export const Head = ({data}: PageProps<Queries.EvacuatorPageQuery>) =>{
    // @ts-ignore
    return   <Seo metaData={data?.wpPage?.metaData}></Seo>
}

function Index({data}: PageProps<Queries.EvacuatorPageQuery> ) {
    const state = globalState(data)
    return (
        <GlobalContext.Provider  value={state}>
            <Layout>
                <EvacuatorPage></EvacuatorPage>
            </Layout>
        </GlobalContext.Provider>
    );
}

export default Index;

export const query = graphql`  query EvacuatorPage {
    wpPage(slug: {eq: "evakuator"}) {
        slug
        needEvacuator {
            needEvacuatorSpisok {
                needEvacuatorTekst
            }
            needEvacuatorTekstKnopki
            needEvacuatorZagolovok
            needEvacuatorIzobrazhenie {
                gatsbyImage(formats: WEBP, width: 800)
            }
        }
        evacuatorBenefits {
            advantageEvacuatorSpisok {
                advantageEvacuatorOpisanie
                advantageEvacuatorZagolovok
                advantageEvacuatorIkonka {
                    gatsbyImage(formats: WEBP, width: 73)
                }
            }
        }
        whereAreYou {
            whereAreYouZagolovok
            whereAreYouPopupLinkText
            whereAreYouPopupLinkHref
            whereAreYouCalculatorTekstSsylki
            whereAreYouCalculatorTekstKnopki
            whereAreYouCalculatorHrefSsylki
            whereAreYouCalculatorCzenaZaOdnoZablokirovannoeKoleso
            whereAreYouVyborMashiny {
                whereAreYouVyborMashinyTekst
                whereAreYouVyborMashinyStoimost
                whereAreYouVyborMashinyIzobrazhenie {
                    gatsbyImage(formats: WEBP, width: 73)
                }
            }
            whereAreYouPopupImage {
                gatsbyImage(formats: WEBP, width: 38)
            }
            whereAreYouOkrugInformacziyaObOkrugah {
                whereAreYouKolichestvoEvakuatorov
                whereAreYouOkrugId
                whereAreYouPolnoeNazvanie
                whereAreYouSokrashhennoeNazvanie
                whereAreYouOkrugSpisok {
                    whereAreYouOkrugSpisokTekst
                    whereAreYouOkrugSpisokNazvanie
                }
            }
            whereAreYouCalculatorDopolnitelno {
                whereAreYouCalculatorDopTekstPodskazki
                whereAreYouCalculatorDopTekst
                whereAreYouCalculatorDopStoimost
                whereAreYouCalculatorDopEstPodskazka
                whereAreYouCalculatorDopTekstVPisme
            }
        }
        whyAngel {
            whyAngelZagolovok
            whyAngelSpisok {
                whyAngelSpisokZagolovok
                whyAngelSpisokTekst
            }
        }
        orderEvacuator {
            podzagolovok
            tekstKnopki
            zagolovok
        }
        howWork {
            howWorkZagolovok
            howWorkSpisok {
                howWorkZagolovok
                howWorkTekst
            }
        }
        autopark {
            autoparkZagolovok
            autoparkTekstSnizu
            autoparkTekstPosleZagolovka
            autoparkIzobrazhenieVverhu {
                gatsbyImage(formats: WEBP, width: 520)
            }
            autoparkGalereya {
                autoparkGalleryIzobrazhenie {
                    gatsbyImage(width: 380, formats: WEBP)
                }
            }
        }
        promotion {
            promotionZagolovok
            promotionTekstSsylki
            promotionHrefSsylki
            promotionSpisok {
                promotionSpisokTekst
                promotionSpisokKartinka {
                    gatsbyImage(formats: WEBP, width: 45)
                }
            }
        }

        metaData {
            metaTitle
            metaDescription
            metaAdresSajta
        }

        questions {
            questionsZagolovok
            questionsSpisok {
                questionsListOtvet
                questionsListZagolovok
            }
        }
    }
    allWpCommonSections {
        nodes {
            cards {
                cardsPodzagolovok
                cardsSpisokKart {
                    cardsItemNazvanieKarty
                    cardsItemPeriod
                    cardsItemStoimost
                    cardsItemTekstKnopki
                    cardsItemOpisanie {
                        cardsItemEstTekstDlyaKotorogoNuzhnaPodskazka
                        cardsItemOstavshijsyaTekstElementa
                        cardsItemTekstKKotoromuPrilagaetsyaPodskazka
                        cardsListTekstElementa
                        cardsListTekstPodskazki
                        fieldGroupName
                    }
                    cardsItemSpisokIzobrazhenij {
                        cardsItemIzobrazhenieKarty {
                            gatsbyImage(formats: WEBP, width: 300)
                        }
                        fieldGroupName
                    }
                    fieldGroupName
                }
                cardsTekst
                cardsTekstKnopkiPodKartami
                cardsZagolovok
                fieldGroupName
            }
            slug
            header {
                tekstLogotipa
                tekstKnopkiVyzova
                hrefKnopkiVyzova
                hrefDlyaKnopkiLogotipa
                ikonkaLogotipa {
                    gatsbyImage(width: 95, formats: WEBP)
                }
            }
            feedbacks {
                feedbacksZagolovok
                feedbacksPodzagolovok
                feedbacksSlajder {
                    feedbacksData
                    feedbacksImyaKlienta
                    feedbacksTekst
                }
            }
            online {
                onlineTekstSsylki
                onlineTekst
                onlineHrefSsylki
            }

            footer {
                tekstLogo
                footerPlaceKoordinatyCzentraKarty
                footerPlaceKoordinatyMarkera
                footerRemarka
                footerAdresa {
                    footerPlaceTekst
                    footerPlaceZagolovok
                }
                footerSocialSpisok {
                    fieldGroupName
                    footerSocialHrefSsylki
                    footerSocialTekstSsylki
                    footerSocialZagolovok
                    footerSocialIkonka {
                        gatsbyImage(width: 90, formats: WEBP)
                    }
                }
                footerSpisokTelefonov {
                    footerPhonesBolshojTekst
                    footerPhonesMalenkijTekst
                    footerPhonesZagolovok
                    footerPhonesIkonka {
                        gatsbyImage(width: 90, formats: WEBP)
                    }
                }
                polzovatelskoeSoglashenie {
                    publicUrl
                }
                politikaKonfidenczialnosti {
                    publicUrl
                }
            }
            cookies {
                cookiesTekstSsylki
                cookiesTekstKnopki
                cookiesTekst
                cookiesPolitikaKonfidenczialnosti {
                    publicUrl
                }
            }
        }
    }
    allFile {
        nodes {
            childImageSharp {
                gatsbyImageData
            }
            name
        }
    }
    allWpMenuItem(filter: {parentId: {eq: null}}, sort: {order: ASC}) {
        nodes {
            label
            url
            childItems {
                nodes {
                    url
                    label
                    childItems {
                        nodes {
                            url
                            label
                        }
                    }
                }
            }
        }
    }
}`

// console.log(query)


// allFile {
//     nodes {
//         childImageSharp {
//             gatsbyImageData
//         }
//         name
//     }
// }
