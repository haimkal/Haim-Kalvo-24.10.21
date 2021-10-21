import React from 'react'
import { Link } from 'react-router-dom'; 
export default function Header() {
    return (
        
            <header className="Header">
                <nav className="navbar navbar-expand-lg ">
                    <div className="container header-container">
                        <Link to="/favorites" className="nav-link">
                            FAVORITES
                        </Link>
                        <Link to="/" className="navbar-brand">
                            Check the weather !
                        </Link>
        
                    </div>
                </nav>
            </header>
    
    )
}
