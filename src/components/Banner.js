import React, {Component} from "react";
import './Banner.css'

class Banner extends Component {
    render() {
        const {moduleNum, taskNum } = this.props

        return (
           <div className="banner-simple">
                <div className="floating-emojis">
                    <div className="floating-emoji" style={{top: '20%', left: '10%', animationDelay: '0s'}}>🗣️</div>
                    <div className="floating-emoji" style={{top: '60%', left: '85%', animationDelay: '1.5s'}}>📚</div>
                    <div className="floating-emoji" style={{top: '80%', left: '15%', animationDelay: '2.5s'}}>🌟</div>
                    <div className="floating-emoji" style={{top: '30%', left: '80%', animationDelay: '1s'}}>💬</div>
                    <div className="floating-emoji" style={{top: '10%', left: '70%', animationDelay: '3s'}}>🎯</div>
                    <div className="floating-emoji" style={{top: '70%', left: '75%', animationDelay: '0.5s'}}>🌍</div>
                </div>
                
                <div className="banner-text">
                    <h2>Improve Your English Skills With Wit</h2>
                    <p>
                        Our platform helps you improve your English naturally through various exercises, 
                        practical phrases and cultural context. Whether you're preparing for travel, 
                        personal growth or just out of interest, we make language learning engaging and effective.
                    </p>
                    <div className="banner-stats">
                        <div className="stat">
                            <div className="stat-number">{taskNum}</div>
                            <div className="stat-label">Tasks</div>
                        </div>
                        <div className="stat">
                            <div className="stat-number">{moduleNum}</div>
                            <div className="stat-label">Modules</div>
                        </div>
                        <div className="stat">
                            <div className="stat-number">24/7</div>
                            <div className="stat-label">Access</div>
                        </div>
                    </div>
                </div>
            </div>
        )

        // return (
        //     <div className="banner-background">
        //         Some text about the site will be here
        //     </div>
        // )
    }
}

export default Banner