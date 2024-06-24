import { createContext, useState } from "react";

// creating context api
export const EditCategoryContext = createContext(null);

// creting context api wrapper to wrap child components
const EditCategoryContextWrapper = (props) => {

    // declaring state for login status
    const [id, setId] = useState(false);

    return (
        // passing login state getter and setter as context value
        <EditCategoryContext.Provider value={[id, setId]}>
            {/* wrapping up child components */}
            {props.children}
        </EditCategoryContext.Provider>
    );
};

export default EditCategoryContextWrapper;