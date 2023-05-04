import {useEffect} from "react";
import {useGlobalContext} from "../context/context";
import {MODAL_SEARCH} from "../config";

export const useModalLink = () => {
    const {setIsSuccessModalOpen} = useGlobalContext()
    useEffect(() => {
        if (location.search.includes(MODAL_SEARCH)) {
            setIsSuccessModalOpen(true)
            // @ts-ignore
            history.pushState(null,null,location.protocol + '//' + location.host + location.pathname)
        }
    }, [])
}
