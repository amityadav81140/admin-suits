import axios from "axios";

const FileUpload = async (props) => {

    try {
        let file = {
            'image': props.file,
            'module_path': props.path,
            'module_id': 1,
        };

        const token = window.sessionStorage.getItem("access-vs");

        const response = axios.post(`${process.env.REACT_APP_BASE_URL}upload`,
            file,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
                params: {
                    'module_path': props.path,
                },
                withCredentials: true,
            },
        )
        return response;
        // response.then(res => {
        //     if (res.data.status) {
        //         console.log(res.data.data._id)
        //         return({
        //             status: true,
        //             id: res.data.data._id,
        //         });
        //     } else {
        //         return({
        //             status: false,
        //             message: res.data.message,
        //         });
        //     }
        // }).catch(AxiosError => {
        //     return(AxiosError);
        // })
    } catch (error) {
        console.log(error);
    }
};

export default FileUpload;
