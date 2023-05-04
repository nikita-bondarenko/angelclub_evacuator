import React from 'react';
import * as styles from './CardCheckbox.module.css'
import {useCardContext} from "../../context";


const CardCheckbox = () => {

    const { isAgreed, setIsAgreed} = useCardContext()

    return (
        <div className={styles.checkbox}>
            <input style={{display: 'none'}} checked={isAgreed} onChange={e => setIsAgreed(e.target.checked) } type="checkbox"/>
            <div className={[styles.checkbox__point,isAgreed ? styles.checked : '' ].join(' ')}>

            </div>
        </div>
    );
};

export default CardCheckbox;
