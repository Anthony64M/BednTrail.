import React from 'react'
import './App.css';
import Navbar from './components/navbar/Navbar';
import Hero from './components/hero/Hero'
import About from './components/about/About';
import Developer from './components/developer/Developer';
import Subscribe from './components/subscribe/Subscribe';

function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <Developer />
      <Subscribe/>
    </div>
  );
}

export default App;
