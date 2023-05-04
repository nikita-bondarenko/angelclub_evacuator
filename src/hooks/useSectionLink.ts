import {useLayoutEffect} from "react";

export const useSectionLink = () => {
    useLayoutEffect(() => {
        if (location.hash) {
            const id = location.hash.slice(1)
            setTimeout(() => {
                const element = document.getElementById(id)
                if (element) {
                    scrollTo({top:element.offsetTop, behavior: 'smooth'})
                }
            }, 300)
        }
    }, [])
}
