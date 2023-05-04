import React from 'react';
import Contacts from "./Contacts/Contacts";
import FooterNav from "./FooterNav/FooterNav";

const Footer = () => {
    return (
        <div className={'container'}>
            <Contacts></Contacts>
            <FooterNav></FooterNav>
        </div>
    );
};

export default Footer;
