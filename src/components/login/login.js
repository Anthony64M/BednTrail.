import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleGoogleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .catch(error => {
        setError(error.message);
      });
  };

  const handleEmailSignIn = () => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .catch(error => {
        setError(error.message);
      });
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow">
            <div className="card-body">
              <h1 className="card-title text-center mb-4">Log In</h1>
              {error && <div className="alert alert-danger">{error}</div>}
              <button className="btn btn-google btn-block mb-3" onClick={handleGoogleSignIn}>
                <FontAwesomeIcon icon={faGoogle} className="mr-2" /> Sign in with Google
              </button>
              <hr />
              <form onSubmit={handleEmailSignIn}>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block mt-4">Sign in with Email</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
