import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

firebase.initializeApp({
  // Your firebase credentials
  apiKey: "AIzaSyCNEy7sXqIwEv348YqJ3vqkl8WTg-IdymE",
  authDomain: "bedntrail.firebaseapp.com",
  projectId: "bedntrail",
  storageBucket: "bedntrail.appspot.com",
  messagingSenderId: "472676134781",
  appId: "1:472676134781:web:2f0800855d816f1b80a614",
  measurementId: "G-LT3DN28V1Z"
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
