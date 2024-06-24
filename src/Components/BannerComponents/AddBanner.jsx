import React, { useState } from 'react';
// import { useEffect } from 'react';
import FileUpload from '../../Apis/Setters/FileUpload';
import { UpdateData } from '../../Apis/Setters/UpdateData';

const AddBanner = () => {

    // FETCHING PAGES
    // useEffect(() => {
    //     const token = window.sessionStorage.getItem("access-vs");
    //     fetchSettings({ token, type: "navbar" })
    //         .then(res => {
    //             setPages(res.data.data.value[0]);
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         })
    // }, []);

    // FETCHING PAGES NAMES FROM SETTINGS
    // const fetchSettings = async (props) => {
    //     const credentials = { type: props.type }
    //     const response = await axios.post(`${process.env.REACT_APP_BASE_URL}admin/business_settings_get`, credentials, { headers: { 'Authorization': `Bearer ${props.token}` }, withCredentials: true });
    //     return response;
    // };

    // ERROR MESSAGE STATE
    const [errMsg, setErrMsg] = useState({
        status: false,
        message: '',
    });
    // SUCCESS MESSAGE STATE
    const [successMsg, setSuccessMsg] = useState({
        status: false,
        message: '',
    });
    // PAGES STATE
    const [pages, setPages] = useState({});
    // INPUT DETAILS STATE
    const [details, setDetails] = useState({
        page: '',
        position: 1,
        image: '',
        status: 0,
    });
    // SETTING VALUE TO STATE VARIABLE
    const handleDetails = (e) => {

        const { name, value } = e.target

        setDetails({
            ...details,
            [name]: value,
        });
    };

    // FILE UPLOAD METHOD(API CALL)
    const upload = (e) => {

        const response = FileUpload({ file: e.target.files[0], path: 'banners' });
        response.then(res => {
            if (res.data.status) {

                setDetails({
                    ...details,
                    image: res.data.data._id,
                });

            } else {
                setErrMsg({
                    status: true,
                    message: res.data.message,
                });
            }
        }).catch((AxiosError) => {
            console.log(AxiosError.response.data.errors);
        });

    };

    // API CALL
    const update = (e) => {
        e.preventDefault();

        const credentials = { ...details };

        const response = UpdateData({ url: 'banner/add', cred: credentials });

        response.then(res => {
            window.scrollTo(0, 0);
            if (res.data.status) {
                setSuccessMsg({
                    status: true,
                    message: res.data.message,
                });
                setErrMsg({
                    status: false,
                    message: '',
                });
            } else {
                setSuccessMsg({
                    status: false,
                    message: '',
                });
                setErrMsg({
                    status: true,
                    message: res.data.message,
                });
            }

        }).catch(AxiosError => console.log(AxiosError.response.data.errors));
    }

    return (
        <React.Fragment>
            <div className="container-fluid py-4">
                {/* DISPLAY ERROR MESSAGE */}
                {errMsg.status &&
                    <div className="alert alert-danger alert-dismissible fade show text-white" role="alert">{errMsg.message}<button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => {
                        setErrMsg({
                            status: false,
                            message: '',
                        });
                    }}></button>
                    </div>
                }

                {/* DISPLAY SUCCESS MESSAGE */}
                {successMsg.status &&
                    <div className="alert alert-success alert-dismissible fade show text-white" role="alert">{successMsg.message}<button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => {
                        setSuccessMsg({
                            status: false,
                            message: '',
                        });
                    }}></button>
                    </div>
                }
                <div className="row g-4">

                    <div className="col-md-8 mb-5">
                        <div className="card mb-3">
                            <div className="card-body p-md-5">
                                <h5>Update Banner</h5>
                                <form onSubmit={update}>
                                    <div className="row">
                                        <div className="my-4">
                                            <label htmlFor="form-banner/banner" className="form-label">Banner Image</label>
                                            <input type="file" name='banner' className="form-control" id="form-banner/banner" onChange={upload} required />
                                        </div>
                                        {/* <div className="mb-4">
                                            <label htmlFor="form-banner/page" className="form-label">Page</label>
                                            <input type="text" name='page' className="form-control" id="form-banner/page" value={details.page} onChange={handleDetails} required />
                                        </div> */}
                                        <div className="mb-4">
                                            <select className="sa-select2 form-select select2-hidden-accessible mb-4" name="page" multiple="" data-select2-id="1" tabIndex="-1" aria-hidden="true" onChange={handleDetails} required>
                                                <option defaultValue={null}>Select Page</option>
                                                <option value='Ceremonials'>Ceremonials</option>
                                                <option value='Formals'>Formals</option>
                                                <option value='Casuals'>Casuals</option>
                                                {/* <option value={pages.link1Name}>{pages.link1Name}</option>
                                                <option value={pages.link2Name}>{pages.link2Name}</option>
                                                <option value={pages.link3Name}>{pages.link3Name}</option> */}
                                            </select>

                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <input type="submit" className="btn btn-outline-primary btn-sm mb-0" value='Save' />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        {/* Visibility Card */}
                        <div className="card w-100">
                            <div className="card-body p-md-5">
                                <div className="mb-5">
                                    <h2 className="mb-0 fs-exact-18">Visibility</h2>
                                </div>
                                <div className="mb-4">
                                    <label className="form-check">
                                        <input type="radio" className="form-check-input" name="status" onChange={handleDetails} value={1} required />
                                        <span className="form-check-label">Active</span>
                                    </label>
                                    <label className="form-check mb-0">
                                        <input type="radio" className="form-check-input" name="status" onChange={handleDetails} value={0} required />
                                        <span className="form-check-label">Inactive</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default AddBanner;