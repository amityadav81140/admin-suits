import { createContext, useState } from "react";

// creating context api
export const PaymentsContext = createContext(null);

// creting context api wrapper to wrap child components
const PaymentsContextWrapper = (props) => {

    // declaring state for item id
    const [id, setId] = useState(false);

    return (
        // passing state getter and setter as context value
        <PaymentsContext.Provider value={[id, setId]}>
            {/* wrapping up child components */}
            {props.children}
        </PaymentsContext.Provider>
    );
};

export default PaymentsContextWrapper;