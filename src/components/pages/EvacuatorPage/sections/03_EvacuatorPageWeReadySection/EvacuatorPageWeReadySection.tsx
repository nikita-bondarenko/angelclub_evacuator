import React from 'react';
import * as styles from './EvacuatorPageWeReadySection.module.css'
import MapBlock from "./Map/MapBlock";
import Cars from "./Cars/Cars";
import ReadyForm from "./Form/ReadyForm";
import {useGlobalContext} from "../../../../../context/context";

const EvacuatorPageWeReadySection = () => {

    const {evacuatorPageData} = useGlobalContext()
    return (
        <section id={'calculator'} className={['container', styles.body].join(' ')}>
            {evacuatorPageData?.wpPage?.whereAreYou?.whereAreYouZagolovok && <h2 className={styles.title}
                 dangerouslySetInnerHTML={{__html: evacuatorPageData?.wpPage?.whereAreYou?.whereAreYouZagolovok}}></h2>}
            <MapBlock></MapBlock>
            <div className={styles.cars}>
                <Cars></Cars>
            </div>
            <ReadyForm></ReadyForm>
        </section>
    );
};

export default EvacuatorPageWeReadySection;
