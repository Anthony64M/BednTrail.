import React, { useState, useEffect } from 'react';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import './Navbar.css';
import Terminal from '../../assets/term.png';
import '../../components/bike/bike.js'
import '../../components/walk/walk.js'
import '../../components/runner/runner.js'

const Navbar = () => {
  const [click, setClick] = useState(false);
  const [navbarTransparent, setNavbarTransparent] = useState(false);

  const handleClick = () => setClick(!click);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setNavbarTransparent(true);
      } else {
        setNavbarTransparent(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`navbar ${navbarTransparent ? 'transparent' : ''}`}>
      <div className="container">
        <div className="img-container">
          <img src={Terminal} alt="" />
        </div>
        <ul className={click ? 'nav active' : 'nav'}>
          <li className="nav-item">
            <a href="src/components/walk/walk.js">Walk</a>
          </li>
          <li className="nav-item">
            <a href="src/components/bike/bike.js">Bike</a>
          </li>
          <li className="nav-item">
            <a href="src/components/runner/runner.js">Run</a>
          </li>
        </ul>
        <div onClick={handleClick} className="hamburger">
          {click ? (
            <AiOutlineClose className="icon" />
          ) : (
            <AiOutlineMenu className="icon" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
