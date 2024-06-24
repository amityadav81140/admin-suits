import { createContext, useState } from "react";

// creating context api
export const EditColorContext = createContext(null);

// creting context api wrapper to wrap child components
const EditColorContextWrapper = (props) => {

    // declaring state for login status
    const [id, setId] = useState(false);

    return (
        // passing login state getter and setter as context value
        <EditColorContext.Provider value={[id, setId]}>
            {/* wrapping up child components */}
            {props.children}
        </EditColorContext.Provider>
    );
};

export default EditColorContextWrapper;