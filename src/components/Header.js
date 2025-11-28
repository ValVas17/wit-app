import React, { useState, useEffect } from "react";
import './Styles.css';
import { MainButton } from "./MainButton";
import { TopActiveButton } from "./TopActiveButton";
import { TopPassButton } from "./TopPassButton";
import { SignInForm } from "./SignInForm";
import wit_img from './img/wit-Photoroom.png';
import Modal from "./Modal";

export const Header = (props) => {
    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal)
    }

    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                setModal(false);
            }
        };

        if (modal) {
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [modal]);


    if (modal) {
        document.body.classList.add('active-modal')
    }
    else {
        document.body.classList.remove('active-modal')
    }


    return (
        <header className="header-glass">
            <div className="glass-effect">
                <div className="header-content"></div>
                <div className='origin'>
                    <ul>
                        <li><img src={wit_img} alt="wit" className="header-logo" /></li>
                        <li><TopActiveButton text='Lesson' /></li>
                        <li><TopPassButton text='Lesson' /></li>
                        <li><TopPassButton text='Lesson' /></li>
                        <li>
                        <div className="user-info">
                            <div className="user-avatar">👤</div>
                            <span className="user-name">User Name</span>
                        </div>
                        </li>
                        {/* <li><MainButton text='Sign in' onClick={toggleModal}/></li> */}
                        <li>
                            <div className='origin' onClick={toggleModal}>
                                <div className="main-button-container">
                                    <button className="main-button-background">Sign in</button>
                                    <div className="main-button-foreground"></div>
                                </div>
                            </div>
                        </li>
                        {/* <button onClick={toggleModal}>Click</button> */}


                        {modal && (
                            <div className="modal">
                                <div onClick={toggleModal} className="overlay"></div>
                                <div className="modal-content">
                                    <SignInForm />
                                </div>
                            </div>
                        )}
                        {/* <li><MainButton text='eng'/></li> */}
                    </ul>
                </div>
            </div>
        </header>
    )
}