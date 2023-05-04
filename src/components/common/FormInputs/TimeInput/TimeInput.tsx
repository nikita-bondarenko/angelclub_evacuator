import React, {createRef, Dispatch, forwardRef, SetStateAction, useEffect, useRef, useState} from 'react';
import * as styles from './TimeInput.module.css'
import './TimePickerCustomStyles.css'
import {stack} from "../../../../hooks/useClassName";
import icon from '../images/times.png'
import useIsClient from "../../../../hooks/useIsClient";
import TimePicker from 'react-times';
import 'react-times/css/material/default.css';

type TimeInputProps = {
    className?: string,
    setValue: Dispatch<SetStateAction<string>>,
    placeholder?: string,

}
const TimeInput = ({className, placeholder, setValue}: TimeInputProps) => {
    const initTime = '00:00'
    const [value, onChange] = useState(initTime);
    const [isPlaceholder, setIsPlaceholder] = useState(true)

    const onClickHandler = () => {
        setIsPlaceholder(false)
    }

    useEffect(() => {
        value !== initTime && setValue(value)
    }, [value])

    return (
        <div className={stack(className, styles.wrapper)}>
            <div  onMouseDown={onClickHandler} className={stack(styles.input, isPlaceholder && styles.disable)}>
                <TimePicker  theme="material" withoutIcon focused={false} showTimezone={false} time={value} onTimeChange={({hour, minute} : {hour: string, minute:string}) => onChange(`${hour}:${minute}`)}/>
            </div>
            <div  className={stack(styles.body)}>
                {isPlaceholder && <div className={styles.placeholder}>{placeholder}</div>}
                <div className={stack(styles.decor)}>
                    <img className={stack(styles.icon)} src={icon} alt=""/>
                </div>

            </div>
        </div>

    );
};

export default TimeInput;
