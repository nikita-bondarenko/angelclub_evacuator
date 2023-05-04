import React from 'react';
import * as styles from './SuccessMessage.module.css'

const SuccessMessage = () => {
    return (
        <div className={styles.body}>
            <h2 className={styles.title}>Спасибо! </h2>
            <p className={styles.text}>В ближайшее время с вами свяжется наш
                сотрудник</p>
        </div>
    );
};

export default SuccessMessage;
