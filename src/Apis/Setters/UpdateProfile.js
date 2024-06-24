import axios from "axios";

const UpdateProfile = async (props) => {

    const token = window.sessionStorage.getItem("access-vs");
    const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}user/${props.url}`,
        props.cred,
        {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            withCredentials: true,
        },
    );
    return response;
};

export default UpdateProfile