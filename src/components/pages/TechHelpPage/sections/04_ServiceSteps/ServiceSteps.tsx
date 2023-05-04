import React, {Fragment} from 'react';
import {stack} from "../../../../../hooks/useClassName";
import {useGlobalContext} from "../../../../../context/context";
import {GatsbyImage} from "gatsby-plugin-image";
import * as styles from './ServiceSteps.module.css'
import {usePrefixImage} from "../../../../../hooks/usePrefixImage";

const ServiceStepsItem = (item: Queries.WpPage_Servicesteps_serviceStepsSpisok & {index: number}) => {
    const [image] = usePrefixImage(item?.serviceStepsIzobrazhenie?.gatsbyImage)
    return <Fragment >
        {item.index !== 0 && <div className={styles.divider}></div>}
        <li className={styles.item} >
            {image && <GatsbyImage className={styles.item__image} alt={''} image={image}></GatsbyImage>}
            {item?.serviceStepsZagolovok && <h3 className={stack('title-small', styles.item__title)}
                 dangerouslySetInnerHTML={{__html: item?.serviceStepsZagolovok}}></h3>}
            {item?.serviceStepsTekst && <p className={stack('text-secondary', styles.item__text)}
                                           dangerouslySetInnerHTML={{__html: item?.serviceStepsTekst}}></p>}
        </li>
    </Fragment>
}
const ServiceSteps = () => {
    const {techHelpPageData} = useGlobalContext()

    return (
        <div className={stack('container', 'section-indent', styles.body)} >
            <ul className={styles.list}>
                {//@ts-ignore
                    techHelpPageData?.wpPage?.serviceSteps?.serviceStepsSpisok?.map((item, index) => <ServiceStepsItem {...item} index={index} key={index}></ServiceStepsItem>)}
            </ul>
        </div>
    );
};

export default ServiceSteps;
