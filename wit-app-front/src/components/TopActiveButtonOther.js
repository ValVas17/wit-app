import React from "react";
import './Styles.css';

export const TopActiveButtonOther = ({text}) => {
    return (
        <div className='origin'>
            <div className="top-active-button-other-container">
                <button className="top-active-button-other-background">{text}</button>
                <div className="top-active-button-other-foreground"></div>
            </div>  
        </div>
    )
}