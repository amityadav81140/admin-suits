import { createContext, useState } from "react";

// creating context api
export const EditCurrencyContext = createContext(null);

// creting context api wrapper to wrap child components
const EditCurrencyContextWrapper = (props) => {

    // declaring state for login status
    const [id, setId] = useState(false);

    return (
        // passing login state getter and setter as context value
        <EditCurrencyContext.Provider value={[id, setId]}>
            {/* wrapping up child components */}
            {props.children}
        </EditCurrencyContext.Provider>
    );
};

export default EditCurrencyContextWrapper;