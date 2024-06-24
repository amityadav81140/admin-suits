import { createContext, useState } from "react";

// creating context api
export const LoginStatusContext = createContext();

// creting context api wrapper to wrap child components
const LoginContextWrapper = (props) => {

    // declaring state for login status
    const [loginStatus, setLoginStatus] = useState(false);

    return (
        // passing login state getter and setter as context value
        <LoginStatusContext.Provider value={[loginStatus, setLoginStatus]}>
            {/* wrapping up child components */}
            {props.children}
        </LoginStatusContext.Provider>
    );
};

export default LoginContextWrapper;