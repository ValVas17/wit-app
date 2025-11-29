import React from "react";
import './Styles.css';

export const TopPassButton = ({text}) => {
    return (
        <div className='origin'>
             <button className="top-pass-button">{text}</button>
        </div>
    )
}