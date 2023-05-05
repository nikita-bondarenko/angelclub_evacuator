import React, {createRef, Dispatch, SetStateAction, useEffect, useLayoutEffect, useState} from 'react';
import {NavLink} from "../config";
import * as styles from './Navigation.module.css'
import PhoneButton from "../PhoneButton/PhoneButton";
import {useGlobalContext} from "../../../../context/context";
import arrow from '../images/nav-arrow.svg'
import {AllWpMenuItemNode} from "../../../../types/types";
import {usePost} from "../../../../hooks/usePost";
import {withAssetPrefix} from "gatsby";

type NavigationProps = {
    isOpen?: boolean,
}

type NavigationLinkProps = {
    id?: number,
    link: any,
    isSubmenu?: boolean,
    className?: string,
}

type Props = {
    [key: string]: () => void
}

const NavigationLink = ({link, isSubmenu, className}: NavigationLinkProps) => {

    const [isOpen, setIsOpen] = useState(false)
    const [isContactLink, setIsContactLink] = useState(false)
    const [submenuHeight, setSubmenuHeight] = useState(0)
    const {
        setIsNavOpen,
        isBottomAvailable,
        topHeight,
        setIsMobile,
        isMobile,
        pageWidth,
        pageHeight
    } = useGlobalContext()
    const desktopProps = {
        onMouseEnter: () => setIsOpen(true),
        onMouseLeave: () => setIsOpen(false)
    }

    const ref = createRef<HTMLUListElement>()

    const mobileProps = {
        onClick: () => setIsOpen(prev => !prev)
    }
    const [props, setProps] = useState<Props>(desktopProps)

    useLayoutEffect(() => {


        ref.current && setSubmenuHeight(ref.current?.clientHeight)
        setIsContactLink(link.url.includes('#'))
    }, [])

    useEffect(() => {
        if (pageWidth) {
            if (pageWidth < 990) {
                setProps(mobileProps)
                setIsMobile(true)
            } else {
                setIsMobile(false)
                setProps(desktopProps)

            }
        }

    }, [pageWidth])


    const clickHandler = (e: React.MouseEvent) => {
        if (isContactLink && isMobile) {
            e.preventDefault()
            window.scrollTo({top: pageHeight, behavior: "smooth"})
        }
        setIsNavOpen(false)

    }

    return (
        <div {...props} className={[className || '', styles.link__body].join(' ')}>
            {!link.url.includes('null')
                ?
                <a onClick={clickHandler} target={!isContactLink ? '_blank' : '_self'}
                   className={[styles.link, isSubmenu ? styles.sub : ''].join(' ')}
                   href={isContactLink ? link.url : isBottomAvailable ? link.url : '#cards'}>{link.label}
                    <span
                        className={[styles.link__pseudo, isSubmenu ? styles.sub : ''].join(' ')}>{link.label}</span>
                </a>
                :
                <span className={[styles.title, isOpen ? styles.open : ''].join(' ')}>{link.label}
                    <span className={[styles.title__pseudo, isOpen ? styles.open : ''].join(' ')}>{link.label}</span>
                    <img className={styles.title__arrow} src={arrow} alt=""/>
                </span>}
            {!!link.childItems.nodes.length && <div style={isMobile ? {height: isOpen ? submenuHeight : 0} : {}}
                              className={[styles.submenu, isOpen ? styles.open : ''].join(' ')}>
                <ul ref={ref} className={[styles.submenu__list, link.label === 'Автосервис' ? styles.second : ''].join(' ')}>
                    {link.childItems.nodes.map(item =>
                        <li key={item.url} className={styles.submenu__item}>
                            <NavigationLink className={styles.submenu__content} isSubmenu={true}
                                            link={item}></NavigationLink>
                        </li>)
                    }
                </ul>
            </div>}
        </div>
    )
}
const Navigation = ({ isOpen}: NavigationProps) => {

    const {data: {allWpMenuItem: { nodes: links}}} = useGlobalContext()



    return (
        <nav className={[styles.body, isOpen ? styles.open : ''].join(' ')}>
            <div className={styles.content}>
                <ul className={styles.nav}>
                    {links.map(link => <li className={styles.nav__item} key={link.label}>
                        <NavigationLink
                            link={link}></NavigationLink>
                    </li>)}
                </ul>
                <PhoneButton></PhoneButton>
            </div>

        </nav>)
        ;
};

export default Navigation;
