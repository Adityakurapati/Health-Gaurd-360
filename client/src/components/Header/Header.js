// src/components/Header.js
import React from 'react';
import './Header.css';

function Header ()
{
        return (
                <header className="header">
                        <div className="logo">Health Guard360</div>
                        <nav className="nav">
                                <a href="#locations">Locations</a>
                                <a href="#doctors">Doctors</a>
                                <a href="#treatments">Treatments</a>
                                <a href="#diseases">Diseases</a>
                        </nav>
                </header>
        );
}

export default Header;
