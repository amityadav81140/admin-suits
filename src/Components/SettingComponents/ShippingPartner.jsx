import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { UpdateData } from '../../Apis/Setters/UpdateData';

const ShippingPartner = () => {

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
        username: '',
        password: '',
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
                { "type": "shipping_partner" },
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
                        username: response.data.data.value[0].username,
                        password: response.data.data.value[0].password,
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
            'type': 'shipping_partner',
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
                <div className="g-4">
                    <div className="card mb-3">
                        <div className="card-body p-md-5">
                            <h4>Update Shipping Partner Credentials</h4>
                            <form onSubmit={update}>
                                <div className="row">
                                    <div className="mb-4">
                                        <label htmlFor="form-shipping-partner/username" className="form-label">Username</label>
                                        <input type="text" name='username' className="form-control" id="form-shipping-partner/username" value={details.username} onChange={handleDetails} />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="form-shipping-partner/password" className="form-label">Password</label>
                                        <input type="password" name='password' className="form-control" id="form-shipping-partner/password" value={details.password} onChange={handleDetails} />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <input type="submit" className="btn btn-outline-primary btn-sm mb-0" value='Save' />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default ShippingPartner;