import React, { Component } from "react";
import './Lesson.css'
import { MainButton } from "./MainButton";

class Lesson extends Component {
    constructor(props) {
        super(props);
        this.descRef = React.createRef();
        this.state = {
            isTextTruncated: false
        };
    }

    componentDidMount() {
        this.checkTextTruncation();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.description !== this.props.description) {
            this.checkTextTruncation();
        }
    }

    checkTextTruncation = () => {
        // Проверяем, обрезан ли текст с помощью -webkit-line-clamp
        const element = this.descRef.current;
        if (element) {
            // Если scrollHeight больше clientHeight, значит текст обрезан
            const isTruncated = element.scrollHeight > element.clientHeight;
            this.setState({ isTextTruncated: isTruncated });
        }
    }

    render() {
        const { lessonNumber, label, title, description, skills, imageSrc, score, level, state } = this.props;
        const { isTextTruncated } = this.state;

        return (
            <div className="lesson-card">
                {/* Header */}
                <div className="header">
                    <div className="lesson-number-container">
                        <div className="lesson-number-background">№{lessonNumber}</div>
                        <div className="lesson-number-foreground"></div>
                    </div>
                    <div className="label">{label}</div>
                </div>  

                {/* Основной контент с фиксированной высотой */}
                <div className="lesson-content-wrapper">
                    <div className="lesson-content">
                        <div className="text-content">
                            <p className="lesson-title">{title}</p>
                            <p 
                                ref={this.descRef}
                                className={`lesson-desc ${isTextTruncated ? 'truncated' : ''}`}
                            >
                                {description}
                            </p>

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
                            {/* {imageSrc && <img src={imageSrc} alt="lesson illustration" />} */}
                        </div>
                    </div>
                </div>

                {/* Разделитель и футер - всегда внизу */}
                <div className="bottom-section">
                    <div className="line-container"></div>
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