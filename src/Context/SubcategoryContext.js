import { createContext, useState } from "react";

// creating context api
export const SubcategoryContext = createContext(null);

// creting context api wrapper to wrap child components
const SubcategoryContextWrapper = (props) => {

    // declaring state for login status
    const [subcategory, setSubcategory] = useState(false);

    return (
        // passing login state getter and setter as context value
        <SubcategoryContext.Provider value={[subcategory, setSubcategory]}>
            {/* wrapping up child components */}
            {props.children}
        </SubcategoryContext.Provider>
    );
};

export default SubcategoryContextWrapper;