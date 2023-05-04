import React, {useEffect, useState} from 'react';
import * as styles from './SelectMark.module.css'
import Background from "../../../../common/Background/Background";
import {useGlobalContext} from "../../../../../context/context";
import Select, {SelectItem} from "../../../../common/FormInputs/Select/Select";
import {stack} from "../../../../../hooks/useClassName";
const SelectMark = () => {

    const {autoservicePageData} = useGlobalContext()
    const [marks, setMarks] = useState<SelectItem[]>()
    const [models, setModels] = useState<SelectItem[]>()
    const [problems, setProblems] = useState<SelectItem[]>()
    const [mark, setMark] =useState<SelectItem>()
    const [model, setModel] =useState<SelectItem>()
    const [problem, setProblem] =useState<SelectItem>()

    useEffect(() => {
        if (autoservicePageData) {
            // @ts-ignore
            setMarks(autoservicePageData?.wpPage?.selectMark?.selectMarkSpisokMarok?.map(item => ({name: item?.selectMarkNazvanieMarkiMashiny})))
            // @ts-ignore
            setProblems(autoservicePageData?.wpPage?.selectMark?.selectMarkSpisokPolomok?.map(item => ({name: item?.selectMarkNazvaniePolomki})))
        }
    }, [autoservicePageData])

    useEffect(() => {
        if (mark ) {
            const currentMark = autoservicePageData?.wpPage?.selectMark?.selectMarkSpisokMarok?.find(item => item?.selectMarkNazvanieMarkiMashiny === mark.name)

            if (currentMark) {
                // @ts-ignore
                setModels(currentMark.selectMarkSpisokModelej.map(item => ({name: item.selectMarkNazvanieModeli})))
            }
        }
    }, [mark])



    return (
        <Background>
            <div className={stack('container',styles.body)}>
                <h2 className={stack('title-secondary',styles.title)}>{autoservicePageData?.wpPage?.selectMark?.selectMarkZagolovok}</h2>
                <div className={styles.wrapper}>
                    <Select items={marks || []} value={mark} setValue={setMark} className={styles.select} placeholder={'Марка автомобиля'}></Select>
                    <Select items={models || []} value={model} setValue={setModel} className={styles.select} placeholder={'Модель автомобиля'} ></Select>
                    <Select items={problems || []} value={problem} setValue={setProblem} className={styles.select} placeholder={'Вид поломки'}></Select>
                </div>
            </div>
        </Background>
    );
};

export default SelectMark;
