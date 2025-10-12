import React from "react";
import './Styles.css';

export const TopActiveButton = ({text}) => {
    return (
        <div className='origin'>
            <div className="top-active-button-container">
                <button className="top-active-button-background">{text}</button>
                <div className="top-active-button-foreground"></div>
            </div>  
        </div>
    )
}