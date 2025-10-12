import React, { Component } from "react";
import { MainButton } from "./MainButton";

class WeeklyPhrase extends Component {
    render() {
        const { name, level } = this.props

        return (
            <div className="phrase-container">
                <div className="phrase-title">Phrase Of The Week</div>
                <div className="phrase-content">
                    <div className="phrase-text">
                        <p className="phrase-phrase">"When pigs fly"</p>
                        <p className="phrase-meaning">Meaning: Never.</p>
                        <p className="phrase-example">Example: "He'll clean his room when pigs fly."</p>
                    </div>
                    <div className="phrase-image">
                        <img src="/images/flying-pig.png" alt="Flying Pig" /> {/* Предполагается, что изображение находится в папке public/images */}
                    </div>
                </div>
                <MainButton text="View More"/>
            </div>
        )
    }
}

export default WeeklyPhrase