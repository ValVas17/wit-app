import './App.css';
import { Component } from 'react';
import { Header } from './components/Header'
import Banner from './components/Banner';
import WeeklyPhrase from './components/WeeklyPhrase';
import ScoreLine from './components/ScoreLine';
import Footer from './components/Footer';
import LessonDetail from './components/LessonDetail';
import { ThemeProvider } from './components/ThemeContext';
import LessonsList from './components/LessonsList';

class App extends Component {
  render() {
    return (
      <ThemeProvider>

        {/* <div className="App"> */}
        <div className="background-blobs">
          <div className="blob blob-1"></div>
          <div className="blob blob-2"></div>
          <div className="blob blob-3"></div>
          <div className="blob blob-4"></div>
        </div>

        <div className="main-content">
          <Header />
          {/* <SignInForm/> */}
          <Banner moduleNum='35' taskNum='143' />
          <WeeklyPhrase phrase='When pigs fly'
            meaning='Never.'
            example='He`ll clean his room when pigs fly.'
            src='{Image}'
            alt='Flying Pig Illustration'
            emojis='🐷✨' />

          <div className="lessons-header">
            <div className="lessons-title">Lessons available: </div>
            {/* <ScoreLine/> */}
            {/* <div className="lessons-line">Score Line</div> */}
            {/* <div className="lessons-line"> */}
            {/* <div className="difficulty-label">Difficulty Scale</div> */}
            {/* <div className="level-markers">
            <span className="level-marker marker-1">
              <div className="marker-tooltip">Freshman</div>
            </span>
            <span className="level-marker marker-2">
              <div className="marker-tooltip">Sophomore</div>
            </span>
            <span className="level-marker marker-3">
              <div className="marker-tooltip">Junior</div>
            </span>
            <span className="level-marker marker-4">
              <div className="marker-tooltip">Senior</div>
            </span>
          </div>
        </div> */}
          </div>

          <div className="lessons-container">
            <LessonsList />
          </div>

        </div>

        <Footer />
      </ThemeProvider>
    );
  }
}

export default App;