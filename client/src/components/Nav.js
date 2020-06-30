import React from "react"
import {Link} from "react-router-dom"

const Nav = () => (
    <nav className="menu">
        <Link className="navItem" to="/">LogIn</Link>
        <Link className="navItem" to="/tasks">Your Tasks</Link>
        <Link className="navItem" to="/history">History</Link>
    </nav>
);

export default Nav;

