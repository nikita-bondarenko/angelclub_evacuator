import React, {ReactElement, ReactNode} from 'react';
import * as styles from './Pulldown.module.css';
import {stack} from "../../../hooks/useClassName";
import {Simulate} from "react-dom/test-utils";
import change = Simulate.change;

const Pulldown = ({ isOpen, className, triangleClassName, children}: {isOpen: boolean, className?: string, triangleClassName?: string, children: ReactNode | ReactElement}) => {

    return (
        <div className={[styles.pulldown, isOpen ? styles.open : '', className ? className : ''].join(' ')}>
            <div className={styles.pulldown__wrapper}>
                <div className={styles.pulldown__body}>{children}</div>
                <div className={stack(styles.pulldown__triangle, triangleClassName )}></div>
            </div>
        </div>
    );
};

export default Pulldown;
