import React from 'react'
import './Developer.css'
import Terminal from '../../assets/terminal.png'

const Developer = () => {
    return (
        <div className='developers'>
            <div className="container">
                <div className="left">
                    <h2>Tranquil country paths</h2>
                    <p>Escape the hustle <span className="blue">and bustle of the  </span>city and find <span className="blue">peace </span> in nature.</p>
                </div>
                <div className="right">
                    <div className="img-container">
                        <img src={Terminal} alt=""/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Developer
