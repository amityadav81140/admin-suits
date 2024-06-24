import { createContext, useState } from "react";

// creating context api
export const CustomerDetailsContext = createContext(null);

// creting context api wrapper to wrap child components
const CustomerDetailsContextWrapper = (props) => {

    // declaring state for login status
    const [id, setId] = useState(false);

    return (
        // passing login state getter and setter as context value
        <CustomerDetailsContext.Provider value={[id, setId]}>
            {/* wrapping up child components */}
            {props.children}
        </CustomerDetailsContext.Provider>
    );
};

export default CustomerDetailsContextWrapper;