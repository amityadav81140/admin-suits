import { createContext, useState } from "react";

// creating context api
export const EditBrandContext = createContext(null);

// creting context api wrapper to wrap child components
const EditBrandContextWrapper = (props) => {

    // declaring state for login status
    const [id, setId] = useState(false);

    return (
        // passing login state getter and setter as context value
        <EditBrandContext.Provider value={[id, setId]}>
            {/* wrapping up child components */}
            {props.children}
        </EditBrandContext.Provider>
    );
};

export default EditBrandContextWrapper;