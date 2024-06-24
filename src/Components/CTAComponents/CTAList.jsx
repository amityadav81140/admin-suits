import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { UpdateData } from '../../Apis/Setters/UpdateData';
import { images } from '../../assets/images';

const CTAList = () => {

    // GETTING AUTH TOKEN
    const token = window.sessionStorage.getItem("access-vs");
    useEffect(() => {
        fetch();
    }, []);
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
        design: '',
        discoverProducts: '',
        discoverCollection: '',
        store: '',
    });
    // SETTING VALUE TO STATE VARIABLE
    const handleDetails = (e) => {

        const { name, value } = e.target

        setDetails({
            ...details,
            [name]: value,
        });
    };

    // FETCH DATA API CALL
    const fetch = async () => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BASE_URL}admin/business_settings_get`,
                { "type": "buttons" },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                    withCredentials: true,
                }
            );

            if (response.data.status) {
                setDetails(prevState => {
                    return {
                        ...prevState,
                        design: response.data.data.value[0].design,
                        discoverProducts: response.data.data.value[0].discoverProducts,
                        discoverCollection: response.data.data.value[0].discoverCollection,
                        store: response.data.data.value[0].store,
                    }
                });
            };
        } catch (AxiosError) {
            console.log(AxiosError.response.data.errors)
        }
    }

    // SET DATA API CALL
    const update = (e) => {
        e.preventDefault();

        let credentials = {
            'type': 'buttons',
            'value': [{ ...details }],
        }
        const response = UpdateData({ url: 'business_settings_save', cred: credentials });
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
                <form onSubmit={update}>
                    <div className="row g-4">
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
                        <div className="col-md-6">
                            <div className="card text-center">
                                <div className="text-reset p-5 text-decoration-none sa-hover-area">
                                    <div className="fs-4 mb-2 text-muted opacity-50">
                                        <img src={images.design_your_own} width="150" height="50" alt="" />
                                    </div>
                                    <h2 className="fs-6 fw-medium mb-3">Design Suit</h2>

                                    <div className="text-muted fs-exact-14">
                                        <input type="text" name="design" className="form-control" id="form-product/design" value={details.design} onChange={handleDetails} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card text-center">
                                <div className="text-reset p-5 text-decoration-none sa-hover-area">
                                    <div className="fs-4 mb-2 text-muted opacity-50">
                                        <img src={images.discover_all} width="150" height="50" alt="" />
                                    </div>
                                    <h2 className="fs-6 fw-medium mb-3">Discover Products</h2>
                                    <div className="text-muted fs-exact-14">
                                        <input type="text" name="discoverProducts" className="form-control" id="form-product/discoverProducts" value={details.discoverProducts} onChange={handleDetails} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card text-center">
                                <div className="text-reset p-5 text-decoration-none sa-hover-area">
                                    <div className="fs-4 mb-2 text-muted opacity-50">
                                        <img src={images.discover_all_collection} width="150" height="50" alt="" />
                                    </div>
                                    <h2 className="fs-6 fw-medium mb-3">Discover Collection</h2>
                                    <div className="text-muted fs-exact-14">
                                        <input type="text" name="discoverCollection" className="form-control" id="form-product/discoverCollection" value={details.discoverCollection} onChange={handleDetails} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card text-center">
                                <div className="text-reset p-5 text-decoration-none sa-hover-area">
                                    <div className="fs-4 mb-2 text-muted opacity-50">
                                        <img src={images.stores} width="150" height="50" alt="" />
                                    </div>
                                    <h2 className="fs-6 fw-medium mb-3">Find Store</h2>
                                    <div className="text-muted fs-exact-14">
                                        <input type="text" name="store" className="form-control" id="form-product/store" value={details.store} onChange={handleDetails} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="card text-center">
                                <div className="text-reset p-4 text-decoration-none sa-hover-area">
                                    <input type="submit" className="btn btn-outline-primary btn-sm mb-0" value="Update CTA Names" />
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </React.Fragment>
    );
};

export default CTAList;