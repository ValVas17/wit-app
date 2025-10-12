import './App.css';
import { Component } from 'react';
import { Header } from './components/Header'
import Lesson from './components/LessonBanner'
import Banner from './components/Banner';
import WeeklyPhrase from './components/WeeklyPhrase';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <Banner/>
        <WeeklyPhrase/>
        <Lesson lessonNumber='3' 
                label='Freshman' 
                title='Animals' 
                description='Learning all about animals: their names, habitats and other vocabulary (lalala)' 
                skills='' 
                imageSrc='' 
                score='2' 
                level='7'
                state='3'/>


      </div>
    );
  }
}

export default App;
