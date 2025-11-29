import React, { Component } from "react";
import './LessonDetail.css'

class LessonDetail extends Component {
    state = {
        currentTask: 0,
        userAnswers: {}
    }

    handleTaskChange = (taskIndex) => {
        this.setState({ currentTask: taskIndex });
    }

    nextTask = () => {
        this.setState(prevState => ({
            currentTask: Math.min(prevState.currentTask + 1, this.props.practiceData.length - 1)
        }));
    }

    prevTask = () => {
        this.setState(prevState => ({
            currentTask: Math.max(prevState.currentTask - 1, 0)
        }));
    }

    handleAnswer = (questionId, answer) => {
        this.setState(prevState => ({
            userAnswers: {
                ...prevState.userAnswers,
                [questionId]: answer
            }
        }));
    }

    // Универсальный рендер для теории
    renderTheory = (theoryData) => {
        if (!theoryData) return <div>No theory data provided</div>;

        const { title, difficulty, sections } = theoryData;

        return (
            <div className="theory-content">
                <div className="theory-header">
                    <h2>{title}</h2>
                    <div className={`difficulty-badge ${difficulty}`}>
                        {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                    </div>
                </div>
                
                {sections.map((section, index) => (
                    <div key={index} className={`theory-section ${section.isTip ? 'theory-tips' : ''}`}>
                        <h3>{section.icon} {section.title}</h3>
                        
                        {section.type === 'list' ? (
                            <ul>
                                {section.content.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        ) : section.type === 'structure' ? (
                            <div className="structure-example">
                                <div className="positive">
                                    <strong>Positive:</strong> {section.content.positive}
                                </div>
                                <div className="negative">
                                    <strong>Negative:</strong> {section.content.negative}
                                </div>
                                <div className="question">
                                    <strong>Question:</strong> {section.content.question}
                                </div>
                            </div>
                        ) : section.type === 'examples' ? (
                            <div className="examples-grid">
                                {section.content.map((example, i) => (
                                    <div key={i} className="example-card">
                                        <div className="example-text">{example.text}</div>
                                        <div className="example-note">{example.note}</div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>{section.content}</p>
                        )}
                    </div>
                ))}
            </div>
        );
    }

    // Универсальный рендер для практики
    renderPractice = (practiceData, currentTask, userAnswers = {}) => {
        if (!practiceData || practiceData.length === 0) {
            return <div>No practice data provided</div>;
        }

        const currentTaskData = practiceData[currentTask];

        const renderTaskContent = () => {
            switch (currentTaskData.type) {
                case 'fill-blanks':
                    return (
                        <div className="task-fill-blanks">
                            <p className="instruction">{currentTaskData.content.instruction}</p>
                            <div className="sentence-with-blanks">
                                {currentTaskData.content.sentence.split('___').map((part, index, array) => (
                                    <span key={index}>
                                        {part}
                                        {index < array.length - 1 && (
                                            <input
                                                type="text"
                                                className="blank-input"
                                                placeholder="..."
                                                value={userAnswers[index] || ''}
                                                onChange={(e) => this.handleAnswer(index, e.target.value)}
                                            />
                                        )}
                                    </span>
                                ))}
                            </div>
                            <button className="check-answers-btn">Check Answers</button>
                        </div>
                    );

                case 'multiple-choice':
                    return (
                        <div className="task-multiple-choice">
                            <p className="instruction">{currentTaskData.content.instruction}</p>
                            <div className="question-text">{currentTaskData.content.question}</div>
                            <div className="options-grid">
                                {currentTaskData.content.options.map(option => (
                                    <label key={option.id} className="option-label">
                                        <input
                                            type="radio"
                                            name="mc-question"
                                            value={option.id}
                                            onChange={() => this.handleAnswer('mc', option.id)}
                                        />
                                        <span className="option-text">{option.text}</span>
                                    </label>
                                ))}
                            </div>
                            <button className="check-answers-btn">Check Answer</button>
                        </div>
                    );

                case 'reading':
                    return (
                        <div className="task-reading">
                            <p className="instruction">{currentTaskData.content.instruction}</p>
                            <div className="reading-text">
                                {currentTaskData.content.text}
                            </div>
                            <div className="questions-list">
                                {currentTaskData.content.questions.map(q => (
                                    <div key={q.id} className="question-item">
                                        <div className="question">{q.question}</div>
                                        <input
                                            type="text"
                                            className="answer-input"
                                            placeholder="Your answer..."
                                            value={userAnswers[q.id] || ''}
                                            onChange={(e) => this.handleAnswer(q.id, e.target.value)}
                                        />
                                    </div>
                                ))}
                            </div>
                            <button className="check-answers-btn">Check Answers</button>
                        </div>
                    );

                default:
                    return <div>Unknown task type</div>;
            }
        };

        return (
            <div className="practice-content">
                <div className="practice-header">
                    <h2>Practice Exercises</h2>
                    <div className="progress-indicator">
                        Task {currentTask + 1} of {practiceData.length}
                    </div>
                </div>

                {/* Вкладки-закладки */}
                <div className="bookmark-tabs">
                    {practiceData.map((task, index) => (
                        <div
                            key={task.id}
                            className={`bookmark-tab ${currentTask === index ? 'active' : ''}`}
                            onClick={() => this.handleTaskChange(index)}
                        >
                            <div className="bookmark-tab-content">
                                <span className="tab-number">{index + 1}</span>
                                <span className="tab-title">{task.title}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="task-content">
                    {renderTaskContent()}
                </div>

                <div className="navigation-buttons">
                    <button 
                        className="nav-btn prev-btn"
                        onClick={this.prevTask}
                        disabled={currentTask === 0}
                    >
                        ← Previous
                    </button>
                    <button 
                        className="nav-btn next-btn"
                        onClick={this.nextTask}
                        disabled={currentTask === practiceData.length - 1}
                    >
                        Next →
                    </button>
                </div>
            </div>
        );
    }

    render() {
        const { currentTask, userAnswers } = this.state;
        const { theoryData, practiceData } = this.props;

        return (
            <div className='lesson-detail-page'>
                <div className='lesson-detail-left'>
                    {this.renderTheory(theoryData)}
                </div>
                <div className='lesson-detail-right'>
                    {this.renderPractice(practiceData, currentTask, userAnswers)}
                </div>
            </div>
        )
    }
}

export default LessonDetail;