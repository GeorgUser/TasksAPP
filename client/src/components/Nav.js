import React from "react"
import {Link} from "react-router-dom"

const Nav = ({logout}) => (
        <nav className="menu">
            <Link className="navItem" to="/tasks">Your Tasks</Link>
            <Link className="navItem" to="/history">History</Link>
            <Link className="navItem" to="/" onClick={() => logout()}>LogOut</Link>
        </nav>
    );

export default Nav;

