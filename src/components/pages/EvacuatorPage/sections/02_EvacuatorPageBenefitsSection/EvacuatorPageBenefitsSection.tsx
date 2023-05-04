import React from 'react';
import * as styles from './EvacuatorPageBenefitsSection.module.css'
import {useGatsbyImage} from "../../../../../hooks/useGatsbyImage";
import {GatsbyImage} from "gatsby-plugin-image";
import {useGlobalContext} from "../../../../../context/context";
import {usePrefixImage} from "../../../../../hooks/usePrefixImage";


const BenefitsItem = ({advantageEvacuatorZagolovok, advantageEvacuatorOpisanie, advantageEvacuatorIkonka}: Queries.WpPage_Evacuatorbenefits_advantageEvacuatorSpisok) => {
const [image] = usePrefixImage(advantageEvacuatorIkonka?.gatsbyImage)
   return <li
         className={styles.item}>
        {image &&
            <GatsbyImage image={image} alt={''}
                         className={styles.decor}></GatsbyImage>
        }
       {advantageEvacuatorZagolovok && <h2 className={styles.title} dangerouslySetInnerHTML={{__html: advantageEvacuatorZagolovok}}></h2>}
        {advantageEvacuatorOpisanie && <p className={styles.text}
                                                dangerouslySetInnerHTML={{__html: advantageEvacuatorOpisanie}}></p>}
    </li>
}

const EvacuatorPageBenefitsSection = () => {

    const [decor1] = useGatsbyImage('evacuator-benefits-1')
    const [decor2] = useGatsbyImage('evacuator-benefits-2')
    const [decor3] = useGatsbyImage('evacuator-benefits-3')
    const [decor4] = useGatsbyImage('evacuator-benefits-4')

    const {evacuatorPageData} = useGlobalContext()

    return (
        <ul className={[styles.body, 'container'].join(' ')}>
            {//@ts-ignore
                evacuatorPageData?.wpPage?.evacuatorBenefits?.advantageEvacuatorSpisok?.map((item, index) => <BenefitsItem {...item} key={index}></BenefitsItem>)}
        </ul>
    );
};

export default EvacuatorPageBenefitsSection;
