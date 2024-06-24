import axios from "axios";

export const UpdateData = async (props) => {

    const token = window.sessionStorage.getItem("access-vs");
    const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}admin/${props.url}`,
        props.cred,
        {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            withCredentials: true,
        },
    );
    return response;
}