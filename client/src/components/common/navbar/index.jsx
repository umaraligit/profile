import React from 'react';
import { NavLink } from 'react-router-dom';
import '../style.scss';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <div className="navbar-brand">Profile</div>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink to="/register" activeClassName="active">register</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/login" activeClassName="active">login</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/enter_details" activeClassName="active">Enter Details</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/dashboard" activeClassName="active">Dashboard</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/new" activeClassName="active">New Items</NavLink>
                    </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
