import { createContext, useState } from "react";

// creating context api
export const EditBannerContext = createContext(null);

// creting context api wrapper to wrap child components
const EditBannerContextWrapper = (props) => {

    // declaring state for login status
    const [id, setId] = useState(false);

    return (
        // passing login state getter and setter as context value
        <EditBannerContext.Provider value={[id, setId]}>
            {/* wrapping up child components */}
            {props.children}
        </EditBannerContext.Provider>
    );
};

export default EditBannerContextWrapper;