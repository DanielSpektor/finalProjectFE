import React, { Fragment, useEffect, useRef, useState } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./Register.module.css";
import { createNewUser } from "../../services/api";
import {Link} from "react-router-dom";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PASS_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const REGISTER_URL = '/register';

const Register = () => {
    
    const userRef = useRef();
    const errRef = useRef();

    const [user, setuser] = useState("");
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pass, setPass] = useState("");
    const [validPass, setValidPass] = useState(false);
    const [passFocus, setPassFocus] = useState(false);

    const [matchPass, setMatchPass] = useState("");
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect( () => {
        userRef.current.focus();
    }, []);

    useEffect( () => {
        setValidName(USER_REGEX.test(user));
    }, [user]);

    useEffect( () => {
        setValidPass(PASS_REGEX.test(pass));
        setValidMatch(pass === matchPass);
    }, [pass, matchPass]);

    useEffect( () => {
        setErrMsg("");
    }, [user, pass, matchPass]);

    const handleSubmit= async (e) => {
        e.preventDefault();
        const v1 = USER_REGEX.test(user);
        const v2 = PASS_REGEX.test(pass);
        if (!v1 || !v2) {
            setErrMsg("Incorrect Entry");
            return;
        }
        try {
            const newUserBody = {
                username: user,
                password: pass
            }
            const response = await createNewUser(newUserBody);
            setSuccess(true);
            setuser("");
            setPass("");
            setMatchPass("");
        } catch (err) {
            if (!err.response) {
                setErrMsg("The Server Doesn't Response");
            } else if (err.response.status === 400) {
                setErrMsg("User Name Already Taken");
                setuser("");
            } else {
                setErrMsg("Registration Failed");
            }
            errRef.current.focus();
        }
    }

    return (
        <Fragment>
            {success ? (
                <section>
                    <h1>Success !</h1>
                    <p>
                        <Link to={"/login"}>Sign In</Link>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? classes.errmsg : classes.offscreen}>{errMsg}</p>
                    <h1>Register</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">
                            User Name:
                            <FontAwesomeIcon icon={faCheck} className={validName ? classes.valid : classes.hide}/>
                            <FontAwesomeIcon icon={faTimes} className={validName || !user ? classes.hide : classes.invalid}/>
                        </label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={ (e) => setuser(e.target.value)}
                            value={user}
                            required
                            onFocus={ () => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />
                        <p id="uidnote" className={userFocus && user && !validName ? classes.instructions : classes.offscreen}>
                            4 to 24 characters.<br/>
                            Must begin with a letter.<br />
                            Letters, Numbers, Underscores, Hyphens are allowed.
                        </p>
                        <label htmlFor="password">
                            Password:
                            <FontAwesomeIcon icon={faCheck} className={validPass ? classes.valid : classes.hide} />
                            <FontAwesomeIcon icon={faTimes} className={validPass || !pass ? classes.hide : classes.invalid} />
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPass(e.target.value)}
                            value={pass}
                            required
                            onFocus={() => setPassFocus(true)}
                            onBlur={() => setPassFocus(false)}
                        />
                        <p id="passnote" className={passFocus && !validPass ? classes.instructions : classes.offscreen}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span>!</span> <span aria-label="at symbol">@</span> <span>#</span> <span>$</span> <span>%</span>
                        </p>

                        <label htmlFor="confirm_pass">
                            Confirm Password:
                            <FontAwesomeIcon icon={faCheck} className={validMatch && matchPass ? classes.valid : classes.hide} />
                            <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPass ? classes.hide : classes.invalid} />
                        </label>
                        <input
                            type="password"
                            id="confirm_pass"
                            onChange={(e) => setMatchPass(e.target.value)}
                            value={matchPass}
                            required
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p id="confirmnote" className={matchFocus && !validMatch ? classes.instructions : classes.offscreen}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must match the first password input field.
                        </p>

                        <button type="submit" disabled={!validName || !validPass || !validMatch ? true : false}>Sign Up</button>
                    </form>
                    <p>
                        Already registered?<br />
                        <span className={classes.line}>
                            {/*put router link here*/}
                            <Link to={"/login"}>Sign In</Link>
                        </span>
                    </p>
                </section>
            )}
        </Fragment>
    )
}

export default Register;