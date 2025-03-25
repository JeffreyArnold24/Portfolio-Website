import { useState, useEffect, useRef } from "react";
import {handleLoginSubmit, handleLogoutSubmit} from "@/controllers/login_controller.js"
import styles from "./signin.css"

function SignIn() {

    const [authToken, setAuthToken] = useState(null);
    const [isBoxVisible, setIsBoxVisible] = useState(false);
    const boxRef = useRef(null);
    const buttonRef = useRef(null);
    
    const toggleSignInBox = (event) => {
        setIsBoxVisible(!isBoxVisible);
      };

    useEffect(() => {
        // Check for authToken in local storage when the component mounts
        const token = localStorage.getItem("authToken");
        if (token) {
        setAuthToken(token); // Set authToken if it exists
        }
    }, []);

    useEffect(() => {
        function handleClickOutside(event) {
            if (boxRef.current && !boxRef.current.contains(event.target)
            && buttonRef.current && !buttonRef.current.contains(event.target)) {
                setIsBoxVisible(false);
            }
        }

        if (isBoxVisible) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isBoxVisible]);

  return (
   
    <div>
        <div className="signin-container" ref={buttonRef}>
            <button id="signin-btn" onClick={toggleSignInBox}>User</button>
        </div>
        {isBoxVisible && (
            <div ref={boxRef}>
                <SignInBox authToken={authToken} />
            </div>
        )}
    </div>

  );
}

function SignInBox({ authToken }) {

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
          setUsername(storedUsername);
        }
        else{
          setUsername('')
        }
      }, []);

    const onLogoutSubmit = async (e) => {
        e.preventDefault();
        const {success, message} = await handleLogoutSubmit(e, localStorage.getItem("username"), localStorage.getItem("authToken"));
        if (success) {
            setErrorMessage("");
            window.location.reload();
        } else {
            setErrorMessage(message)
        }
    }

    const onLoginSubmit = async (e) => {
        e.preventDefault();
        const {success, message} = await handleLoginSubmit(e, username, password);
        if (success) {
            setErrorMessage("");
            window.location.reload();
        } else {
            setErrorMessage(message);
        }
    }

    return (
        <div className="signin-box">
            {authToken ? (
                <div>
                    <div className='username'>
                        {username}
                    </div>
                    <button type="submit" onClick={onLogoutSubmit}>Sign Out</button>
                    {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Conditionally display the error message */}
                </div>
            ) : (
                <div>
                    <h2>Sign In</h2>
                    <form onSubmit={(e) => onLoginSubmit(e)}>
                        <input type="username" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Conditionally display the error message */}
                        <button type="submit">Sign In</button>
                    </form>
                </div>
             )}
        </div>
    )
}

export {SignIn};