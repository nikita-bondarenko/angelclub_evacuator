import React from 'react';
import * as styles from "../Contacts.module.css";
import {GatsbyImage} from "gatsby-plugin-image";
import {usePrefixImage} from "../../../../../hooks/usePrefixImage";

type ContactItemProps = Queries.WpCommonSections_Contacts_contactsSoczseti
const ContactItem = ({contactsHrefSsylki, contactsIkonkaSsylki}: ContactItemProps) => {
    const [image] = usePrefixImage(contactsIkonkaSsylki?.gatsbyImage)

    return (
        <li className={styles.social__item}>
            {contactsHrefSsylki && <a className={styles.social__link} target={'_blank'}
                                            href={contactsHrefSsylki}>
                {image &&
                    <GatsbyImage image={image}
                                 className={styles.social__icon} alt={''}></GatsbyImage>}
            </a>}
        </li>
    );
};

export default ContactItem;
