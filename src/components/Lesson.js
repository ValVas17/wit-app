import React, { Component } from "react";
// import './Styles.css'
import './Lesson.css'
import { MainButton } from "./MainButton";
// import image9 from './img/image9.png';

class Lesson extends Component {
    render() {
        const { lessonNumber, label, title, description, skills, imageSrc, score, level, state } = this.props;

        return (
            <div>

                <div className="lesson-card">

                <div className="header">
                    <div className="lesson-number-container">
                        <div className="lesson-number-background">№{lessonNumber}</div>
                        <div className="lesson-number-foreground"></div>
                    </div>
                    {/* <div className="lesson-number">№1</div> */}
                    <div className="label">{label}</div>
                </div>  
                    <div>
                        <div className="lesson-content">
                            <div>
                                <p className="lesson-title">{title}</p>
                                <p className="lesson-desc">{description}</p>

                                {/* <div className="skill-labels"> */}
                                {/* <span className="skill-label">vocabulary</span> */}
                                {/* <span className="skill-label">reading</span> */}
                                {/* <span className="skill-label">writing skills</span> */}
                                {/* </div> */}

                                <div className="skill-labels">
                                    {Array.isArray(skills) && skills.length > 0 ? (
                                        skills.map((skill, index) => (
                                            <span key={skill + index} className="skill-label">{skill}</span>
                                        ))
                                    ) : (
                                        <span className="skill-label no-skills">No specific skills listed</span>
                                    )}
                                </div>
                            </div>

                            <div className="image-container">
                                {/* <img src={imageSrc} alt="girl" /> */}
                                {/* {imageSrc && <img src={imageSrc} alt="girl" />} */}
                            </div>
                        </div>


                    </div>

                    <div className="line-container" />

                    <div className="footer">
                        <MainButton text='Repeat' />
                        <div className="score">Your score: {score}/{level}</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Lesson