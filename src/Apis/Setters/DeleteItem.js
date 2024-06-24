import axios from "axios";

// API CALL METHOD TO DELETE AN ITEM
export const DeleteItem = (props) => {
    const credentials = typeof(props.id) !== 'undefined' ? { id: props.id } : { order_id: props.order_id };
    const token = window.sessionStorage.getItem("access-vs");

    const response = axios.post(
        `${process.env.REACT_APP_BASE_URL}admin/${props.url}`,
        credentials,
        {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            withCredentials: true,
        },
    );
    return response;
}