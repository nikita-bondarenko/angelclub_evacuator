import React, {createRef, DragEventHandler, Touch, useEffect, useLayoutEffect, useState} from 'react';
import MapImage from './image/MapImage';
import * as styles from './MapBlock.module.css'
import MapTownList, {getTownsList, TownInfoType, TownListItem} from './towns/InfoList/MapTownList';
import {MapContext, MapContextType} from "./context/MapContext";
import MapPopupList from "./popup/MapPopupList";
import plus from '../images/plus.svg'
import minus from '../images/minus.svg'
import {useGlobalContext} from "../../../../../../context/context";


const MapBlock = () => {

    const [initX, setInitX] = useState<number>(0)
    const [initY, setInitY] = useState<number>(0)
    const [x, setX] = useState(0)
    const [y, setY] = useState(0)
    const [isGrabbing, setIsGrabbing] = useState(false)
    const [size, setSize] = useState(0.85)
    const screenRef = createRef<HTMLDivElement>()
    const mapRef = createRef<HTMLDivElement>()

    const [scrollY, setScrollY] = useState(0)

    const [screenTop, setScreenTop] = useState(0)
    const [screenLeft, setScreenLeft] = useState(0)
    const [screenWidth, setScreenWidth] = useState(0)
    const [screenHeight, setScreenHeight] = useState(0)

    const [towns, setTowns] = useState<TownListItem[]>([])

    const [initTowns] = getTownsList()

    const {isMobile} = useGlobalContext()

    useEffect(() => {
        if (initTowns) {
            setTowns(initTowns)
        }
    }, [initTowns])


    useLayoutEffect(() => {

        if (document.body.clientWidth < 360) {
            setSize(0.4)
            setX(-260)
            setY(83)
        } else if (document.body.clientWidth < 480) {
            setSize(0.4)
            setX(-229)
            setY(83)
        } else if (document.body.clientWidth < 570) {
            setSize(0.5)
            setX(-200)
            setY(68)
        } else if (document.body.clientWidth < 670) {
            setSize(0.5)
            setX(-150)
            setY(68)
        } else if (document.body.clientWidth < 990) {
            setSize(0.4)
            setX(-48)
            setY(61)
        } else if (document.body.clientWidth < 1200) {
            setSize(0.55)
            setX(28)
            setY(-80)
        }


    }, [])

    const updateTownById = ({id, data}: { id: string, data: any }) => {
        setTowns(prev => {
            const arr: TownListItem[] = JSON.parse(JSON.stringify(prev))
            const item = arr.find(town => town.id === id)
            if (item) {
                Object.entries(data).forEach(([key, value]) => {
                    // @ts-ignore
                    const prop = item[key]
                    if (typeof prop !== "undefined") {
                        // @ts-ignore
                        item[key] = value
                    }
                })
            }
            return arr
        })
    }

    const openPopupById = (id: string) => {
        setTowns(prev => {
            const arr: TownListItem[] = JSON.parse(JSON.stringify(prev))
            const res = arr.map(item => {
                item.isMouseEnter = item.id === id
                return item
            })
            return res
        })
    }

    const closePopups = () => {
        setTowns(prev => {
            const arr: TownListItem[] = JSON.parse(JSON.stringify(prev))
            const res = arr.map(item => {
                item.isMouseEnter = false
                return item
            })
            return res
        })
    }

    const handleMouseMove = (e: MouseEvent) => {
        setX(x + e.clientX - initX)
        setY(y + e.clientY - initY)
    }

    const [isSizeControlling, setIsSizeControlling] = useState(false)
    const [initHypotenuse, setInitHypotenuse] = useState(0)
    const [hypotenuse, setHypotenuse] = useState(0)
    const getHypotenuse = (t1: Touch, t2: Touch) => {
        return Math.sqrt(Math.pow(t1.clientX - t2.clientX, 2) + Math.pow(t1.clientY - t2.clientY, 2))
    }
    const handleTouchMove = (e: TouchEvent) => {
        setX(x + e.touches[e.touches.length - 1].clientX - initX)
        setY(y + e.touches[e.touches.length - 1].clientY - initY)
    }

    const handleTouchMoveSizing = (e: TouchEvent) => {
        const hypotenuse = getHypotenuse(e.touches[0], e.touches[1])
        const newSize =size - (initHypotenuse - hypotenuse) * 0.0015
        newSize >= 0 && setSize(newSize)
    }

    const handleScroll = () => {
        setScrollY(window.scrollY)
    }

    useEffect(() => {
        const data = mapRef.current?.getBoundingClientRect()
        if (data) {
            setScreenTop(data.top)
            setScreenLeft(data.left)
            setScreenWidth(data.width)
            setScreenHeight(data.height)
        }
    }, [scrollY])

    useEffect(() => {
    }, [screenHeight, screenWidth, screenLeft, screenTop])

    useLayoutEffect(() => {
        document.addEventListener('scroll', handleScroll)
        document.body.addEventListener('click', closePopups)
    }, [])

    useEffect(() => {

        if (isGrabbing) {
            window.addEventListener('mousemove', handleMouseMove)
            window.addEventListener('touchmove', handleTouchMove)
            return () => {
                window.removeEventListener('mousemove', handleMouseMove)
                window.removeEventListener('touchmove', handleTouchMove)
            }
        }

    }, [isGrabbing])

    useEffect(() => {
        if (isSizeControlling) {
            window.removeEventListener('touchmove', handleTouchMove)
            window.addEventListener('touchmove', handleTouchMoveSizing)
            isMobile ? document.body.style.overflow = 'hidden' : 1

            return () => {
                document.body.style.overflow = 'auto'
                window.removeEventListener('touchmove', handleTouchMoveSizing)
            }
        }
    }, [isSizeControlling, isMobile])

    function startGrabbing() {
        setIsGrabbing(true)
        isMobile ?  document.body.style.overflow = 'hidden' : 2
    }

    function stopGrabbing() {
        setIsGrabbing(false)
        document.body.style.overflow = 'auto'
    }

    const handleMouseDown = (e: React.MouseEvent) => {
        setInitX(e.clientX)
        setInitY(e.clientY)
        startGrabbing()
    }

    const handleMouseUp = (e: React.MouseEvent) => {
        stopGrabbing()
    }


    const handleTouchStart = (e: React.TouchEvent) => {
        stopGrabbing()
        setIsSizeControlling(false)
        if (e.touches.length === 1) {
            setInitX(e.touches[e.touches.length - 1].clientX)
            setInitY(e.touches[e.touches.length - 1].clientY)
            startGrabbing()
        }
        if (e.touches.length >= 2) {
            const hypotenuse = getHypotenuse(e.touches[0], e.touches[1])
            setInitHypotenuse(hypotenuse)
            setIsSizeControlling(true)
        }
    }

    const handleTouchEnd = (e: React.TouchEvent) => {
        setIsSizeControlling(false)
        stopGrabbing()
    }

    const increaseSize = () => {
        setSize(prev => prev + 0.15)
    }

    const decreaseSize = () => {
        setSize(prev => prev - 0.15 > 0 ? prev - 0.15 : prev)
    }

    const contextObject: MapContextType = {
        x, setX, setY, setSize, size, y, screenRef, scrollY, setTowns, towns, updateTownById, openPopupById
    }

    return (
        <MapContext.Provider value={contextObject}>
            <MapPopupList></MapPopupList>
            <div className={styles.map} ref={mapRef} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}
                 onMouseLeave={handleMouseUp}
                 onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
                <div className={styles.map__control}>
                    <button onClick={increaseSize} className={styles.control__button}>
                        <img className={styles.control__image} src={plus} alt=""/>
                    </button>
                    <button onClick={decreaseSize} className={styles.control__button}>
                        <img className={styles.control__image} src={minus} alt=""/>
                    </button>
                </div>
                <div className={styles.map__window}>
                    <div style={{transform: `translate(${x}px, ${y}px)`}} className={styles.map__body}>
                        <div style={{transform: `scale(${size})`, transition: isSizeControlling ? 'none': 'all 0.2s ease-in-out'}}  className={styles.map__wrapper}>
                            <MapTownList></MapTownList>
                            <MapImage></MapImage>
                        </div>
                    </div>
                </div>
            </div>
        </MapContext.Provider>


    );
};

export default MapBlock;
