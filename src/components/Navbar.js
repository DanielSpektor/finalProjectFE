import React, { useState } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom"
import classes from "./Navbar.module.css"
import SearchBar from "./SearchBar";

function Navbar() {
    const [isLoggedIn, setLoggedIn] = useState(false);

    const handleLogin = () => {
        setLoggedIn(!isLoggedIn);
    };

    const handleLogout = () => {
        setLoggedIn(false);
    };


    return (
        <nav className={classes.nav}>
            <Link to="/" className={classes.siteTitle}>
                Daniel's Online Parts Shop
            </Link>
            <SearchBar/>
            {isLoggedIn ? (
            <>
                <ul>
                <CustomLink to="/orderList">Order List</CustomLink>
                <CustomLink>Order History</CustomLink>
                <CustomLink>Favorite Items</CustomLink>
                <CustomLink to="/logout" onClick={handleLogout}>Logout</CustomLink>
                </ul>
            </>
        ) : (
            <>
                <ul>
                    <CustomLink to="/login" onClick={handleLogin}>Login</CustomLink>
                    <CustomLink to="/signUp">Sign Up</CustomLink>
                </ul>
            </>
        )}


        </nav>
    );
}

function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true})

    return (
        <li className={isActive ? classes.active : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    );
}

export default Navbar;