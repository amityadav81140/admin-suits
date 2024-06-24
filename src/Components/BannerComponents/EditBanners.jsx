import React, { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bannersSelector, fetchBanners } from '../../Apis/Getters/banners';
import FileUpload from '../../Apis/Setters/FileUpload';
import { UpdateData } from '../../Apis/Setters/UpdateData';
import { EditBannerContext } from '../../Context/EditBannerContext';

const EditBanners = () => {

    // Using Edit Context Api of this Component
    const [id, setId] = useContext(EditBannerContext);
    // Getting Details by Id from Redux State
    const banner = useSelector(state => bannersSelector.selectById(state, id));
    // Declaring Dispatch Method
    const dispatch = useDispatch();

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
    // INPUT DETAILS STATE
    const [details, setDetails] = useState({
        id: id,
        page: banner.page,
        position: banner.position,
        image: banner.image_id,
        status: banner.status,
    });
    useEffect(() => {
        window.scrollTo(0, 0);
        // Dispatching Fetch Method of this Component
        const token = window.sessionStorage.getItem("access-vs");
        dispatch(fetchBanners(token));
    }, [successMsg]);
    // SETTING VALUE TO STATE VARIABLE
    const handleDetails = (e) => {

        const { name, value } = e.target

        setDetails({
            ...details,
            [name]: value,
        });
    };

    // FILE UPLOAD METHOD(API CALL)
    const fileUpload = (e) => {

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
        })
            .catch((AxiosError) => {
                console.log(AxiosError.response.data.errors);
            });

    };

    // API CALL
    const update = (e) => {
        e.preventDefault();

        const credentials = { ...details };

        const response = UpdateData({ url: 'banner/update', cred: credentials });
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
                                            <input type="file" name='banner' className="form-control" id="form-banner/banner" onChange={fileUpload} />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="form-banner/page" className="form-label">Page</label>
                                            <input type="text" name='page' className="form-control" id="form-banner/page" value={details.page} onChange={handleDetails} required />
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
                                    <h4 className="mb-0 fs-exact-18">Visibility</h4>
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
                        {/* Banner Image Card */}
                        <div className="card w-100 mt-3">
                            <div className="card-body p-md-5">
                                <img src={banner.image} className='w-100' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default EditBanners;