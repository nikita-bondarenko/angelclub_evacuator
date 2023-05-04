import React, {createRef, useEffect, useState} from 'react';
import * as styles from './Checkbox.module.css'

type CheckboxProps = {
    value: boolean,
    onChange: (arg: boolean) => void
}
const Checkbox = ({value, onChange}: CheckboxProps) => {

    return (
        <div className={[styles.body, value ? styles.checked : ''].join(' ')}>
            <input style={{display: 'none'}} type="checkbox" checked={value} onChange={() => onChange(!value)}/>
            <div className={styles.point}>
            </div>
        </div>
    );
};

export default Checkbox;
