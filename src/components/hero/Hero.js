import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import MainVideo from '../../assets/video.mp4';
import './Hero.css';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};

const Hero = () => {
  const [language, setLanguage] = useState('english');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const superUser = {
    email: 'superuser@example.com',
    password: 'superuserpassword'
  };

  useEffect(() => {
    const app = firebase.initializeApp(firebaseConfig);
    const analytics = firebase.analytics();
  }, []);

  const handleLogin = () => {
    if (email === superUser.email && password === superUser.password) {
      setUser(superUser);
      setEmail('');
      setPassword('');
    } else {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // handle successful authentication
          setUser(userCredential.user);
          setEmail('');
          setPassword('');
        })
        .catch((error) => {
          // handle authentication error
          console.error(error);
        });
    }
  };

  const handleLogout = () => {
    firebase.auth().signOut().then(() => {
      setUser(null);
    }).catch((error) => {
      console.error(error);
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
        {user ? (
          <div className="btn-group">
            <button className="btn" onClick={handleLogout}>{language === 'english' ? 'Logout' : 'Abmelden'}</button>
          </div>
        ) : (
            <div className="btn-group">
              <input type="email" placeholder={language === 'english' ? 'Email' : 'E-Mail'} value={email} onChange={(e) => setEmail(e.target.value)}/>
              <input type="password" placeholder={language === 'english' ? 'Password' : 'Passwort'} value={password} onChange={(e) => setPassword(e.target.value)}/>
              <button className="btn" onClick={handleLogin}>{language === 'english' ? 'Login' : 'Anmelden'}</button>
            </div>
          )}
        </div>
        <button className="switch-language" onClick={switchLanguage}>{language === 'english' ? 'Switch to German' : 'Zu Englisch wechseln'}</button>
      </div>
    );
  };
  
  export default Hero;
