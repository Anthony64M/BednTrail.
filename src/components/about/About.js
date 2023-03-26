import React from 'react';
import './About.css';
import { SiHiveBlockchain, SiStrapi, SiFsecure } from 'react-icons/si';
import { VscServerProcess } from 'react-icons/vsc';
import AboutCard from './AboutCard';

const About = () => {
  return (
    <div className='about'>
      <div className="container">
        <h2>Discover the Endless Possibilities of Our Platform</h2>
        <p>Our DeFi protocol system empowers runners, riders, and outdoor enthusiasts to access a new world of fitness data and financial possibilities.</p>
        <div className="card-container">
          <div className="card">
            <AboutCard icon={<SiHiveBlockchain className='icon' />} heading='Reliable and Secure Fitness Data' text='Our platform uses decentralization, trusted nodes, premium data, and cryptographic proofs to provide highly accurate and reliable fitness data to your apps and smart contracts.' />
          </div>
          <div className="card">
            <AboutCard icon={<SiStrapi className='icon' />} heading='Seamless Connectivity to Any App' text='Our flexible framework allows you to connect with any existing fitness app, system, or future blockchain, enabling seamless sharing of fitness data across all platforms.' />
          </div>
          <div className="card">
            <AboutCard icon={<SiFsecure className='icon' />} heading='Proven and Ready-made Solutions' text='We offer pre-built, time-tested oracle solutions that secure tens of billions in smart contract value for market-leading decentralized fitness applications.' />
          </div>
          <div className="card">
            <AboutCard icon={<VscServerProcess className='icon' />} heading='Secure and Automated Fitness Tracking' text='Our decentralized network of DeFi Keeper nodes automates the tracking of your fitness data and workouts, eliminating the risk of manual interventions and centralized servers.' />
          </div>
        </div>
        <a href="/" className="btn">Explore our Tracks and Trails</a>
      </div>
    </div>
  )
}

export default About;

