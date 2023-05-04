import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
type TextInputProps = {
    className?: string,
    setValue: Dispatch<SetStateAction<string>>,
    placeholder?: string,
}

import * as styles from './TextInput.module.css'
import {stack} from "../../../../hooks/useClassName";
const TextInput = ({className, placeholder, setValue}: TextInputProps) => {

    const [value, onChange] = useState('')

    useEffect(() => {
        setValue(value)
    }, [value])
    return (
        <div className={stack(styles.container, className)}>
            <input  className={stack(styles.input)} placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)} type="text"/>
        </div>
    );
};

export default TextInput;
