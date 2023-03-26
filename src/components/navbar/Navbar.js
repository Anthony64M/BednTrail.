import React, {useState} from 'react'
import {AiOutlineMenu, AiOutlineClose} from 'react-icons/ai'
import './Navbar.css'

const Navbar = () => {
    const [click, setClick] = useState(false)
    const handleClick = () => setClick(!click)

    return (
        <div className='navbar'>
            <div className="container">
                <h1 style={{ marginLeft: '1rem', color: '#00d8ff'}} >BednTrail</h1>
                <ul className={click ? 'nav active' : 'nav'}>
                    <li className="nav-item">
                        <a href="/">Walk</a>
                    </li>
                    <li className="nav-item">
                        <a href="/">Bike</a>
                    </li>
                    <li className="nav-item">
                        <a href="/">Run</a>
                    </li>
                </ul>
                <div onClick={handleClick} className="hamburger">
                    {click ? (<AiOutlineClose className='icon' />) : (<AiOutlineMenu className='icon' />)}
                    
                </div>
            </div>
        </div>
    )
}

export default Navbar
