import React, {Dispatch, ReactElement, ReactNode, SetStateAction, useEffect} from 'react';
import * as styles from './Modal.module.css'
import {StaticImage} from "gatsby-plugin-image";
import close from './images/close.svg'
import {useGlobalContext} from "../../context/context";

type ModalProps = {
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>,
    isBackTransparent?: boolean,
    children: ReactElement | ReactNode
}
const Modal = ({isOpen, setIsOpen, isBackTransparent , children}:ModalProps) => {

    useEffect(() => {
        if(isOpen) {
            document.body.style.overflowY = 'hidden'
            return () => {
                document.body.style.overflowY = 'auto'
            }
        }
    }, [isOpen])

    return (
        <div className={[styles.modal, isOpen ? styles.open : ''].join(' ')}>
           <div onClick={() => setIsOpen(false)} className={styles.modal__wrapper}>
               {/*<div  className={[styles.modal__back].join(' ')}></div>*/}
               <div onClick={(e) => e.stopPropagation()} className={[styles.modal__content, isBackTransparent ? styles.higher : ''].join(' ')}>
                   <button onClick={() => setIsOpen(false)} className={styles.content__close}>
                       <img className={styles.close__image} src={close} alt=""></img>
                   </button>
                   {children}
               </div>
           </div>
        </div>
    );
};

export default Modal;
