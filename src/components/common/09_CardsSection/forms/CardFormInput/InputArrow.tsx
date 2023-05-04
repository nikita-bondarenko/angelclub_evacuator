import React from 'react';
import * as styles from "./CardFormInput.module.css";

const InputArrow = () => {
    return (
        <svg className={styles.arrow} viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M0.355732 0.337597C0.592886 0.112532 0.873676 -7.10454e-07 1.1981 -6.96996e-07C1.5219 -6.83564e-07 1.80237 0.112532 2.03953 0.337597L8.98814 6.93201L15.9605 0.315091C16.1818 0.10503 16.4585 -6.39464e-08 16.7905 -5.01733e-08C17.1225 -3.64003e-08 17.4071 0.112533 17.6443 0.337598C17.8814 0.562663 18 0.82914 18 1.13703C18 1.44432 17.8814 1.71049 17.6443 1.93556L9.65217 9.49775C9.55731 9.58777 9.45455 9.65169 9.34387 9.6895C9.2332 9.72671 9.11462 9.74532 8.98814 9.74532C8.86166 9.74532 8.74308 9.72671 8.63241 9.6895C8.52174 9.65169 8.41897 9.58777 8.32411 9.49775L0.332016 1.91305C0.110672 1.70299 -6.65242e-08 1.44432 -5.23707e-08 1.13703C-3.81896e-08 0.829139 0.118578 0.562662 0.355732 0.337597Z"
                fill="black" fillOpacity="0.8"/>
        </svg>
    );
};

export default InputArrow;
