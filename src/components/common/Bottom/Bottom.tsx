import React, {ReactElement, ReactNode} from 'react';
import {useGlobalContext} from "../../../context/context";
import * as styles from './Bottom.module.css'
type BottomProps = {
    children: ReactElement | ReactNode
}
const Bottom = ({ children} : BottomProps) => {

    const {isBottomAvailable} = useGlobalContext()

    return (
        <div className={styles.bottom} style={{display: isBottomAvailable ? 'block' : 'none'}}>
            { children}
        </div>

    );
};

export default Bottom;
