import React from 'react';
import * as styles from "./ToTopButton.module.css";
import arrow from './images/big-arrow.svg'

const ToTopButton = () => {
    const topButtonClickHandler = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }
    return (
        <button className={styles.buttonNav} onClick={topButtonClickHandler}>
            <div className={styles.buttonNav__body}>
                <img className={styles.buttonNav__icon} src={arrow} alt=""/>
                <span className={styles.buttonNav__point}></span>
            </div>
        </button>
    );
};

export default ToTopButton;
