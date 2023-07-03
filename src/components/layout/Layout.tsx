import React, {createRef, ReactElement, ReactNode, useEffect, useLayoutEffect} from 'react';
import Seo from "./Seo";
import Modal from "../modal/Modal";
import SuccessMessage from "../modal/SuccessMessage/SuccessMessage";
import {useGlobalContext} from "../../context/context";
import Header from "../common/01_Header/Header";
import Footer from "../common/13_Footer/Footer";
import {Data, RootQuery} from "../../types/types";
import useIsClient from "../../hooks/useIsClient";
import Cookies from "../common/Cookies/Cookies";
import {useSectionLink} from "../../hooks/useSectionLink";
import {ApolloProvider} from "@apollo/react-hooks";
import client from "../../gatsby-plugin-apollo/client";
import ogSmallImage from '../../static/share_2.jpg';
import ogBigImage from '../../static/share_1.jpg';
import {useModalLink} from "../../hooks/useModalLink";
import { Script } from 'gatsby';



interface LayoutProps {
    children: ReactElement | ReactNode,
    title?: string,
    description?: string

    isCookies?: boolean

}



const Layout = ({children, description, title, isCookies} : LayoutProps) => {
    const {
        isSuccessModalOpen,
        setIsSuccessModalOpen,
        isBottomAvailable,
        setPageWidth,
        setPageHeight,
        data
    } = useGlobalContext()
    const ref = createRef<any>()

    useEffect(() => {
        if (ref.current) {
            setPageWidth(ref.current.clientWidth)
            setPageHeight(ref.current.clientHeight)
        }
    }, [ref])


    useSectionLink()
    useModalLink()

    return (
        <>
            <main ref={ref}>
                <Modal isOpen={isSuccessModalOpen} setIsOpen={setIsSuccessModalOpen}>
                    <SuccessMessage></SuccessMessage>
                </Modal>
                {isCookies && <Cookies></Cookies>}
                <Header></Header>
                <ApolloProvider client={client}>
                {children}
                </ApolloProvider>
                <div style={{display: isBottomAvailable ? 'block' : 'none'}}>
                    <Footer></Footer>
                </div>
            </main>
            <Script>
                {`var jivo = function(){ var widget_id = 'u4qeIyI7rS';var d=document;var w=window;function l(){
                var s = document.createElement('script'); s.type = 'text/javascript'; s.async = true;
                s.src = '//code.jivosite.com/script/widget/'+widget_id
                ; var ss = document.getElementsByTagName('script')[0]; ss.parentNode.insertBefore(s, ss);}
                if(d.readyState=='complete'){l();}else{if(w.attachEvent){w.attachEvent('onload',l);}
                else{w.addEventListener('load',l,false);}}}
                $(document).ready(function(){setTimeout(jivo,2000)});`}
            </Script>

            </>
    );
};

export default Layout;
