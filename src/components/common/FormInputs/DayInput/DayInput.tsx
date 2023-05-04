import React, {createRef, Dispatch, SetStateAction, useEffect, useState} from 'react';
import * as styles from './DayInput.module.css'
import './DatePickerCustomStyles.css'
import {stack} from "../../../../hooks/useClassName";
import icon from '../images/dates.png'
import {SelectItem} from "../Select/Select";
import DatePicker, {ReactDatePicker, registerLocale} from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import dayjs from 'dayjs'

import ru from 'date-fns/locale/ru';


registerLocale('ru', ru)


type DayInputProps = {
    className?: string,
    setValue: Dispatch<SetStateAction<string>>,
    placeholder?: string,

}
const DayInput = ({className, placeholder, setValue} : DayInputProps) => {
    const [startDate, setStartDate] = useState(new Date());
    const [isPlaceholder, setIsPlaceholder] = useState(true)
    const [isCalendarOpen, setIsCalendarClose] = useState(false)
    const ref = createRef<ReactDatePicker>()
const onChangeHandler = (date: Date | null) => {
   if (date)   {
       setStartDate(date)
   }
}

useEffect(() => {
    const date = dayjs(startDate)
    !isPlaceholder && setValue(date.format('DD.MM.YYYY'))

}, [startDate])

const onClickHandler = () => {
    isPlaceholder && ref.current?.setOpen(true)

    setIsPlaceholder(false)
}

// useEffect(() => {
//     console.log(isCalendarOpen)
// }, [isCalendarOpen])
    return (
        <div onClick={onClickHandler} className={stack(className, styles.wrapper)}>
            <div className={stack(styles.input, isPlaceholder && styles.disable)}>
                <DatePicker  shouldCloseOnSelect={true} onCalendarOpen={() => setIsCalendarClose(true)} onCalendarClose={()  => setIsCalendarClose(false)} popperClassName={stack(isCalendarOpen && 'openwrap')}  ref={ref}  dateFormat={'dd.MM.yyyy'} selected={startDate} locale="ru"
                            onChange={onChangeHandler}/>
            </div>
                      <div  className={stack(styles.body )}>
            {isPlaceholder && <div className={styles.placeholder}>{placeholder}</div>}
                            <div className={stack(styles.decor)}>
                    <img className={stack(styles.icon)} src={icon} alt=""/>
                </div>

            </div>
        </div>

    );
};

export default DayInput;
