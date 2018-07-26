import React, { Component } from 'react';
//import './nav.css';

import { Link } from "react-router-dom";

class Navbar extends Component {
    render() {
        return (

            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link className="navbar-brand" to="#">WriteDown</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item ">
                                <Link className="nav-link" to="/">Home </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/Articles/1">See Articles</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/Create"> Create an Article </Link>
                            </li>
                        </ul>
                        <span className="navbar-text">
                          
                        </span>
                    </div>
                </nav>
            </div>

        )
    }
}

export default Navbar;