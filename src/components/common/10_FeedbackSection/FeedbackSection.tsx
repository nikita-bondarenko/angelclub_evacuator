import React, {ButtonHTMLAttributes, createRef, useEffect, useLayoutEffect, useState} from 'react';
import * as styles from './FeedbackSection.module.css'
import FeedbackItem from "./FeedbackItem/FeedbackItem";
import {feedbackList} from "./config";
import touch from './images/touch.png'
import prevArrow from './images/prev-arrow.svg'
import nextArrow from './images/next-arrow.svg'
import {register} from 'swiper/element/bundle';
import {useGlobalContext} from "../../../context/context";
import {useWpCommonSection} from "../../../hooks/useWpCommonSection";
import techHelpPage from "../../pages/TechHelpPage/TechHelpPage";

register();

type FeedbackSectionProps = {
    dataFromProps?: Queries.WpPage_Feedbacks
}
const FeedbackSection = ({dataFromProps}: FeedbackSectionProps) => {

    const refNext = createRef<HTMLButtonElement>()
    const refPrevious = createRef<HTMLButtonElement>()
    const refSwiper = createRef<HTMLButtonElement>()
    const [spaceBetween, setSpaceBetween] = useState(20)
    const [slidePerPage, setSlidePerPage] = useState(3)
    const [height, setHeight] = useState<number>()
    const [data, setData] = useState<Queries.WpPage_Feedbacks>()
    const [section] = useWpCommonSection('otzyvy')
    const {isBottomAvailable} = useGlobalContext()
    const [isStretch, setIsStretch] = useState(false)
    const [heightArr, setHeightArr] = useState<number[]>([])
    useEffect(() => {

        if (section) {
            if (dataFromProps) {
                setData(dataFromProps)
                return
            }
            // @ts-ignore
            setData(section.feedbacks)
        }

    }, [section, dataFromProps])

    useEffect(() => {
        if (refSwiper && refNext && refPrevious && refNext.current && refPrevious.current && refSwiper.current) {
            refPrevious.current.addEventListener('click', () => {
                // @ts-ignore
                refSwiper.current && refSwiper.current.swiper.slidePrev()
            })
            refNext.current.addEventListener('click', () => {
                // @ts-ignore
                refSwiper.current && refSwiper.current.swiper.slideNext()
            })
        }
    }, [refNext, refPrevious, refSwiper])

    useEffect(() => {
        if (document.body.clientWidth < 480) {
            setSlidePerPage(1)
            setSpaceBetween(20)
        } else if (document.body.clientWidth < 990) {
            setSlidePerPage(1.25)
            setSpaceBetween(14)
        } else if (document.body.clientWidth < 1299) {
            setSlidePerPage(3)
            setSpaceBetween(20)
        } else {
            setSlidePerPage(3)
            setSpaceBetween(30)
        }
        setTimeout(() => setIsStretch(true), 600)
    }, [])


    useLayoutEffect(() => {

        if (isStretch && refSwiper && refSwiper.current?.clientHeight !== height) {
            refSwiper.current?.clientHeight && setHeight(refSwiper.current?.clientHeight + 10)

        }
    }, [isStretch, isBottomAvailable])

    // useEffect(() => {
    //     if (heightArr && heightArr.length === data?.feedbacksSlajder?.length) {
    //         console.log(heightArr)
    //         const max = heightArr.reduce((max,item) => item > max ? item : max, 0)
    //         console.log(max)
    //
    //         setHeight(max)
    //     }
    // }, [heightArr, isBottomAvailable])

    return (
        <div className={[styles.body, 'container'].join(' ')}>
            <h2 className={styles.title}>{data?.feedbacksZagolovok}</h2>
            {data?.feedbacksPodzagolovok &&
                <p className={styles.text} dangerouslySetInnerHTML={{__html: data?.feedbacksPodzagolovok}}></p>}
            <div className={styles.swiper}>
                <div className={styles.swiper__nav}>
                    <img className={styles.swiper__touch} src={touch} alt=""/>
                    <button className={styles.swiper__button} ref={refPrevious}><img className={styles.swiper__icon}
                                                                                     src={prevArrow} alt=""/></button>
                    <button className={styles.swiper__button} ref={refNext}><img className={styles.swiper__icon}
                                                                                 src={nextArrow} alt=""/>
                    </button>
                </div>
                <div className={styles.swiper__wrapper}>

                    {/*   @ts-ignore*/}
                    <swiper-container ref={refSwiper} space-between={spaceBetween} slides-per-view={slidePerPage}
                                      speed="400">
                        {
                            /*   @ts-ignore*/
                            data?.feedbacksSlajder?.map(item => <FeedbackItem height={height}
                                                                              key={item?.feedbacksData}
                                                                              fieldGroupName={''} {...item} ></FeedbackItem>)}
                        {/*@ts-ignore*/}
                    </swiper-container>
                </div>
            </div>


        </div>
    );
};

export default FeedbackSection;
