import React from "react";
import './Styles.css';

export const MainButton = ({text}) => {
    return (
        <div className='origin'>
            <div className="main-button-container">
                <button className="main-button-background">{text}</button>
                <div className="main-button-foreground"></div>
            </div>
        </div>
    )
}