import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import MainVideo from '../../assets/video.mp4';
import './Hero.css';
import '../../walk/walk.js'

const Hero = () => {

  const [language, setLanguage] = useState('english');

  const handleJoinUs = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        // Redirect user to Walk page on successful login
        window.location.href = 'src/components/walk/walk.js';
      })
      .catch((error) => {
        // handle authentication error
      });
  };

  const switchLanguage = () => {
    setLanguage(language === 'english' ? 'german' : 'english');
  };

  return (
    <div className='hero'>
      <video autoPlay loop muted id='video'>
        <source src={MainVideo} type='video/mp4'/>
      </video>
      <div className="hero-text">
        {language === 'english' ? (
          <>
            <h1>Run wild, run free</h1>
            <h1>No frills,<span className="blue">just thrills</span> </h1>
            <p>Connect with <span className="blue">your body and the environment</span> on our beautiful paths.</p>
          </>
        ) : (
          <>
            <h1>Lauf wild, lauf frei</h1>
            <h1>Kein Schnickschnack,<span className="blue">nur Nervenkitzel</span> </h1>
            <p>Verbinde dich mit <span className="blue">deinem Körper und der Umwelt</span> auf unseren wunderschönen Pfaden.</p>
          </>
        )}
        <div className="btn-group">
          <button className="btn" onClick={handleJoinUs}>{language === 'english' ? 'Join us' : 'Mach mit'}</button>
          <button className="btn btn-outline" onClick={switchLanguage}>{language === 'english' ? 'Switch to German' : 'Zurück zu Englisch'}</button>
        </div>
      </div>
    </div>
  )
}

export default Hero;
