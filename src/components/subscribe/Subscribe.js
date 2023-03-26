import React, { useState } from 'react'
import './Subscribe.css'

const Subscribe = () => {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email.trim() === '') {
      alert('Please enter a valid email address.');
      return;
    }
    // Submit the form data to your API or external service here
    setSuccess(true);
  }

  return (
    <div className='subscribe'>
      <div className="content">
        <h2>BednTrail</h2>
        {!success ?
          <form onSubmit={handleSubmit}>
            <div className="form-container display-col">
              <input type="email" name='email' placeholder='Enter your email' value={email} onChange={handleEmailChange} />
              <button type="submit" className="btn">Subscribe</button>
            </div>
            <div className="form-container">
              <label>
                <input type="checkbox" /> Yes, I agree to receive email communications from BednTrail
              </label>
            </div>
          </form>
          :
          <p>Thank you for subscribing!</p>
        }
      </div>
    </div>
  )
}

export default Subscribe
