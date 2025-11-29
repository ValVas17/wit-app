import './App.css';
import { Component } from 'react';
import { Header } from './components/Header'
import Lesson from './components/Lesson'
import Banner from './components/Banner';
import { SignInForm } from './components/SignInForm';
import WeeklyPhrase from './components/WeeklyPhrase';
import img9 from './components/img/image9.jpg'
import ScoreLine from './components/ScoreLine';
import Footer from './components/Footer';
import LessonDetail from './components/LessonDetail';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="background-blobs">
          <div className="blob blob-1"></div>
          <div className="blob blob-2"></div>
          <div className="blob blob-3"></div>
          <div className="blob blob-4"></div>
        </div>

        <div className="main-content">
          <Header />
                  {/* <SignInForm/> */}
        <Banner moduleNum='35' taskNum='143'/>
        <WeeklyPhrase phrase='When pigs fly' 
                      meaning='Never.' 
                      example='He`ll clean his room when pigs fly.' 
                      src='{Image}'
                      alt='Flying Pig Illustration' 
                      emojis='🐷✨' />

        <div className="lessons-header">
          <div className="lessons-title">Lessons</div>
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
          <Lesson lessonNumber='1' 
                  label='Freshman' 
                  title='Acquaintance' 
                  description='Hello! A dialog always starts with getting to kmow each other. It`s importaint to be able to introduce yourself.' 
                  skills={['vocabulary', 'reading', 'writing skills', 'listening']} 
                  imageSrc={img9} 
                  score='2' 
                  level='7'
                  state='3'/>
          <Lesson lessonNumber='2' 
                  label='Freshman' 
                  title='Food' 
                  description='I scream! You scream! We all scream for Ice Cream!!!' 
                  skills={['vocabulary', 'reading', 'listening']} 
                  imageSrc={img9} 
                  score='2' 
                  level='7'
                  state='3'/>
          <Lesson lessonNumber='3' 
                  label='Freshman' 
                  title='Animals' 
                  description='Learning all about animals: their names, habitats and other vocabulary (lalala)' 
                  skills={['writing skills', 'listening']} 
                  imageSrc={img9} 
                  score='2' 
                  level='7'
                  state='3'/>
          <Lesson lessonNumber='4' 
                  label='Freshman' 
                  title='Animals' 
                  description='Learning all about animals: their names, habitats and other vocabulary (lalala)' 
                  skills={['vocabulary', 'reading', 'writing skills', 'listening', 'speaking', 'writing']} 
                  imageSrc={img9} 
                  score='2' 
                  level='7'
                  state='3'/>
        </div>


        </div>

        <Footer />
      </div>
    );
  }
}

export default App;