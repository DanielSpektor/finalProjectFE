import React, { useContext, useEffect, useRef, useState, Fragment } from "react";
import classes from "./Login.module.css";
import { authenticate } from "../../services/api";
import {Link} from "react-router-dom";
import AuthContext from "../context/AuthProvider";

function Login() {

    const {setAuth} = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");

    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);


    useEffect( () => {
        userRef.current.focus();
    }, []);

    useEffect( () => {
        setErrMsg("");
    }, [user, pass]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userBody = {
                username: user,
                password: pass,
            };
            const response = await authenticate(userBody);
            setSuccess(true);
            setAuth(response.data.jwt);
            setUser("");
            setPass("");
        } catch (err) {
            if (!err.response) {
                setErrMsg("The Server Doesn't Response");
            } else if (err.response.status === 403) {
                setErrMsg("Incorrect Username Or Password")
            } else {
                setErrMsg("Authentication Failed");
            }
            errRef.current.focus();
        }
    };


    return (
        <Fragment>
            {success ? (
                <section>
                    <h1>You Are Logged In, Happy Shopping !</h1>
                    <br/>
                    <p>
                        <Link to={"/"}>Back Home</Link>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? classes.error_mes : "offscreen"}>
                        {errMsg}
                    </p>
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="userName">User Name:</label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={ (e) => setUser(e.target.value)}
                            value={user}
                            required
                        />
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={ (e) => setPass(e.target.value)}
                            value={pass}
                            required
                        />
                        <button type="submit" disabled={!user || !pass}>
                            Sign In
                        </button>
                    </form>
                    <p>
                        Need An Account?
                        <br/>
                        <span className="line">
                            <Link to="/signUp">Sign Up</Link>
                        </span>
                    </p>
                </section>
            )}
        </Fragment>
    );
}

export default Login;