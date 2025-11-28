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

        <Header/>
        {/* <SignInForm/> */}
        <Banner moduleNum='35' taskNum='143'/>
        <WeeklyPhrase phrase='When pigs fly' 
                      meaning='Never.' 
                      example='He`ll clean his room when pigs fly.' 
                      src='/images/flying-pig.png'
                      alt='Flying Pig Illustration' 
                      emojis='🐷✨' />

        <div className="lessons-header">
          <div className="lessons-title">Lessons</div>
          {/* <ScoreLine/> */}
          <div className="lessons-line">Score Line</div>
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
                  skills={['vocabulary', 'reading', 'writing skills', 'listening']} 
                  imageSrc={img9} 
                  score='2' 
                  level='7'
                  state='3'/>
          <Lesson lessonNumber='3' 
                  label='Freshman' 
                  title='Animals' 
                  description='Learning all about animals: their names, habitats and other vocabulary (lalala)' 
                  skills={['vocabulary', 'reading', 'writing skills', 'listening']} 
                  imageSrc={img9} 
                  score='2' 
                  level='7'
                  state='3'/>
          <Lesson lessonNumber='4' 
                  label='Freshman' 
                  title='Animals' 
                  description='Learning all about animals: their names, habitats and other vocabulary (lalala)' 
                  skills={['vocabulary', 'reading', 'writing skills', 'listening']} 
                  imageSrc={img9} 
                  score='2' 
                  level='7'
                  state='3'/>
        </div>

        <Footer/>


      </div>
    );
  }
}

export default App;
