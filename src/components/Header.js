import React from "react";
import './Styles.css';
import { MainButton } from "./MainButton";
import { TopActiveButton } from "./TopActiveButton";
import { TopPassButton } from "./TopPassButton";

export const Header = (props) => {
    return (
        <div className='origin'>
            <ui>
                <li><MainButton text='Main Button'/></li>
                <li><TopActiveButton text='Act Button'/></li>
                <li><TopPassButton text='Pas Button'/></li>
            </ui>
        </div>
    )
}