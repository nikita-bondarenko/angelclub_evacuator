import React, {ReactElement, ReactNode} from 'react';
import {stack} from "../../../hooks/useClassName";
import * as styles from "./Background.module.css";
import {useGatsbyBgImage} from "../../../hooks/useGatsbyBgImage";
import BackgroundImage from "gatsby-background-image";

const Background = ({className, children}: {className?: string, children: ReactElement | ReactNode}) => {

    const [bgImage] = useGatsbyBgImage('print')

    return (
        <BackgroundImage  Tag={'section'} {...bgImage}
                         className={stack(styles.background, 'section-indent', className)}  preserveStackingContext>{children}</BackgroundImage>
    );
};

export default Background;
