import React, {createRef, Dispatch, SetStateAction, useEffect, useLayoutEffect} from 'react';
import {FeedbackType} from "../config";
import * as styles from './FeedbackItem.module.css'
import start from '../images/star.svg'
import {Swiper, SwiperSlide} from 'swiper/react';
import {usePrefixImage} from "../../../../hooks/usePrefixImage";
import {GatsbyImage} from "gatsby-plugin-image";
// import 'swiper/css';

type FeedbackItemProps = {
    height?: number;
}

const FeedbackItem = (props: Queries.WpCommonSections_Feedbacks_feedbacksSlajder &  FeedbackItemProps ) => {

const [image] = usePrefixImage(props?.feedbacksFotoKlienta?.gatsbyImage)
    return (
        //  @ts-ignore
        <swiper-slide>
        {/*// <SwiperSlide className={styles.body}>*/}
            <div  className={styles.body} style={props.height ? {height: props.height} : {}}>
                <span className={styles.date}>{props.feedbacksData}</span>
                <div className={styles.top}>
                    <div className={styles.top__person}>
                         <div className={styles.person__image}>
                             {image && <GatsbyImage className={styles.person__picture} image={image} alt={''}></GatsbyImage>}
                        </div>
                        <h3 className={styles.person__name}>{props.feedbacksImyaKlienta}</h3>
                    </div>
                    <div className={styles.top__stars}>
                        <img className={styles.stars__item} src={start} alt=""/>
                        <img className={styles.stars__item} src={start} alt=""/>
                        <img className={styles.stars__item} src={start} alt=""/>
                        <img className={styles.stars__item} src={start} alt=""/>
                        <img className={styles.stars__item} src={start} alt=""/>
                    </div>
                </div>
                {props.feedbacksTekst &&<p className={styles.text} dangerouslySetInnerHTML={{__html: props.feedbacksTekst}}></p>}
            </div>
        {/*</SwiperSlide>)*/}
            {/*   @ts-ignore*/}
         </swiper-slide>
    );
};

export default FeedbackItem;
