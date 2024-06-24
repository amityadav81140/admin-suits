import { createContext, useState } from "react";

// creating context api
export const RolePermissionContext = createContext(null);

// creting context api wrapper to wrap child components
const RolePermissionContextWrapper = (props) => {

    // declaring state for login status
    const [id, setId] = useState(false);

    return (
        // passing login state getter and setter as context value
        <RolePermissionContext.Provider value={[id, setId]}>
            {/* wrapping up child components */}
            {props.children}
        </RolePermissionContext.Provider>
    );
};

export default RolePermissionContextWrapper;