import React from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import MainVideo from '../../assets/video.mp4';
import './Hero.css';

const Hero = () => {

  const handleJoinUs = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        // handle successful authentication
      })
      .catch((error) => {
        // handle authentication error
      });
  };

  return (
    <div className='hero'>
      <video autoPlay loop muted id='video'>
        <source src={MainVideo} type='video/mp4'/>
      </video>
      <div className="hero-text">
        <h1>Run wild, run free</h1>
        <h1>No frills,<span className="blue">just thrills</span> </h1>
        <p>Connect with <span className="blue">your body and the environment</span> on our beautiful paths.</p>
        <div className="btn-group">
          <button className="btn" onClick={handleJoinUs}>Join us</button>
          <button className="btn btn-outline">FAQS</button>
        </div>
      </div>
    </div>
  )
}

export default Hero;
