import React, { Component } from "react";
import { MainButton } from "./MainButton";
import './WeeklyPhrase.css'

class WeeklyPhrase extends Component {
    state = {
        imageError: false
    }

    handleImageError = () => {
        this.setState({ imageError: true });
    }

    render() {
        const { phrase, meaning, example, src, alt, emojis } = this.props;
        const { imageError } = this.state;

        return (
            <div className="phrase-container">
                <div className="phrase-title">Phrase Of The Week</div>
                
                <div className="phrase-content">
                    <div className="phrase-text">
                        <p className="phrase-phrase">"{phrase}"</p>
                        <p className="phrase-meaning">
                            <span style={{fontWeight: '600', color: '#2d3436'}}>Meaning:</span> {meaning}
                        </p>
                        <p className="phrase-example">
                            <span style={{fontWeight: '600', color: '#2d3436'}}>Example:</span> "{example}"
                        </p>
                    </div>
                    
                    <div className="phrase-image">
                        {imageError ? (
                            <div style={{
                                fontSize: '1.2rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '100%',
                                height: '100%'
                            }}>
                                {emojis}
                            </div>
                        ) : (
                            <img 
                                src={src} 
                                alt={alt} 
                                onError={this.handleImageError}
                            />
                        )}
                    </div>
                </div>
                
                {/* <div style={{textAlign: 'center'}}>
                    <MainButton text="View More" />
                </div> */}
            </div>
            // <div className="phrase-container">
            //     <div className="phrase-title">Phrase Of The Week</div>
            //     <div className="phrase-content">
            //         <div className="phrase-text">
            //             <p className="phrase-phrase">"When pigs fly"</p>
            //             <p className="phrase-meaning">Meaning: Never.</p>
            //             <p className="phrase-example">Example: "He'll clean his room when pigs fly."</p>
            //         </div>
            //         <div className="phrase-image">
            //             <img src="/images/flying-pig.png" alt="Flying Pig" /> {/* Предполагается, что изображение находится в папке public/images */}
            //         </div>
            //     </div>
            //     <MainButton text="View More"/>
            // </div>
        )
    }
}

export default WeeklyPhrase