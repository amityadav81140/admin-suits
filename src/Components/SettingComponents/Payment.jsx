import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { UpdateData } from '../../Apis/Setters/UpdateData';

const Payment = () => {

    // SETTINGS ERROR STATE
    const [settingsErr, setSettingsErr] = useState({
        status: false,
        message: '',
    });
    // SETTINGS Success STATE
    const [settingsSuccess, setSettingsSuccess] = useState({
        status: false,
        message: '',
    });

    // GETTING AUTH TOKEN
    const token = window.sessionStorage.getItem("access-vs");
    useEffect(() => {
        fetch();
    }, []);

    // PAYMENT GATEWAY SETTINGS INPUT VALUES STATE
    const [paymentGateway, setPaymentGateway] = useState({
        razorpay_keyId: '',
        razorpay_secretKey: '',
        razorpay_status: '',
        paypal_keyId: '',
        paypal_secretKey: '',
        paypal_status: '',
    });

    // METHOD TO SET CREDENTIALS IN paymentGateway STATE VARIABLE
    const handlePaymentGateway = (e) => {
        const { name, value } = e.target;
        setPaymentGateway({
            ...paymentGateway,
            [name]: value,
        });
    };

    // FETCH DATA API METHOD
    const fetch = async () => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BASE_URL}admin/business_settings_get`,
                { "type": "paymentGateway" },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                    withCredentials: true,
                }
            );

            if (response.data.status) {
                setPaymentGateway(prevState => {
                    return {
                        ...prevState,
                        razorpay_keyId: response?.data?.data?.value?.[0]?.razorpay_keyId,
                        razorpay_secretKey: response?.data?.data?.value?.[0]?.razorpay_secretKey,
                        razorpay_status: response?.data?.data?.value?.[0]?.razorpay_status,
                        paypal_keyId: response?.data?.data?.value?.[0]?.paypal_keyId,
                        paypal_secretKey: response?.data?.data?.value?.[0]?.paypal_secretKey,
                        paypal_status: response?.data?.data?.value?.[0]?.paypal_status,
                    }
                });
            };
        } catch (AxiosError) {
            console.log(AxiosError.response.data.errors)
        }
    };

    // ADD / UPDATE DATA API METHOD
    const update = e => {
        e.preventDefault();
        const credentials = {
            'type': 'paymentGateway',
            'value': [{ ...paymentGateway }],
        };

        const response = UpdateData({ url: 'business_settings_save', cred: credentials });
        response.then(res => {
            window.scrollTo(0, 0);
            if (res.data.status) {
                setSettingsSuccess({
                    status: true,
                    message: res.data.message,
                });
                setSettingsErr({
                    status: false,
                    message: '',
                });
            } else {
                setSettingsErr({
                    status: true,
                    message: res.data.message,
                });
                setSettingsSuccess({
                    status: false,
                    message: '',
                });
            }
        }).catch((AxiosError) => {
            console.log(AxiosError.response.data.errors);
        });
    };

    return (
        <React.Fragment>
            <div className="container-fluid py-4">
                <div className="row g-4">
                    {/* DISPLAY ERROR MESSAGE */}
                    {settingsErr.status &&
                        <div className="alert alert-danger alert-dismissible fade show text-white" role="alert">{settingsErr.message}<button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => {
                            setSettingsErr({
                                status: false,
                                message: '',
                            });
                        }}></button>
                        </div>
                    }

                    {/* DISPLAY SUCCESS MESSAGE */}
                    {settingsSuccess.status &&
                        <div className="alert alert-success alert-dismissible fade show text-white" role="alert">{settingsSuccess.message}<button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => {
                            setSettingsSuccess({
                                status: false,
                                message: '',
                            });
                        }}></button>
                        </div>
                    }

                    <form onSubmit={update} name='storeSocialpaymentGateway'>
                        {/* RAZORPAY SETTINGS */}
                        <div className="card mb-3">
                            <div className="card-body p-5">
                                <h5>Razorpay Settings</h5>
                                <div className="row">
                                    <div className="mb-4 col-12 col-md-6">
                                        <label htmlFor="form-payments/razorpay_keyId" className="form-label">Key Id</label>
                                        <input type="text" name='razorpay_keyId' className="form-control" id="form-payments/razorpay_keyId" value={paymentGateway.razorpay_keyId} onChange={handlePaymentGateway} />
                                    </div>
                                    <div className="mb-4 col-12 col-md-6">
                                        <label htmlFor="form-payments/razorpay_secretKey" className="form-label">Secret Key</label>
                                        <input type="text" name='razorpay_secretKey' className="form-control" id="form-payments/razorpay_secretKey" value={paymentGateway.razorpay_secretKey} onChange={handlePaymentGateway} />
                                    </div>
                                    <div className="mb-4 col-12">
                                        <label htmlFor="form-payments/status" className="form-label">
                                            Status: <span className="form-check-label">{paymentGateway.razorpay_status === '1' ? 'Active' : 'Inactive'}</span>
                                        </label>
                                        <div className='d-flex'>
                                            <span className="form-check-label">Change:</span>
                                            <label className="form-check">
                                                <input type="radio" className="form-check-input" name="razorpay_status" onChange={handlePaymentGateway} value={1} />
                                                <span className="form-check-label">Active</span>
                                            </label>
                                            <label className="form-check mb-0">
                                                <input type="radio" className="form-check-input" name="razorpay_status" onChange={handlePaymentGateway} value={0} />
                                                <span className="form-check-label">Inactive</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* PAYPAL SETTINGS */}
                        <div className="card mb-3">
                            <div className="card-body p-5">
                                <h5>Paypal Settings</h5>
                                <div className="row">
                                    <div className="mb-4 col-12 col-md-6">
                                        <label htmlFor="form-payments/paypal_keyId" className="form-label">Key Id</label>
                                        <input type="text" name='paypal_keyId' className="form-control" id="form-payments/paypal_keyId" value={paymentGateway.paypal_keyId} onChange={handlePaymentGateway} />
                                    </div>
                                    <div className="mb-4 col-12 col-md-6">
                                        <label htmlFor="form-payments/razorpay_secretKey" className="form-label">Secret Key</label>
                                        <input type="text" name='paypal_secretKey' className="form-control" id="form-payments/paypal_secretKey" value={paymentGateway.paypal_secretKey} onChange={handlePaymentGateway} />
                                    </div>
                                    <div className="mb-4 col-12">
                                        <label htmlFor="form-payments/status" className="form-label">
                                            Status: <span className="form-check-label">{paymentGateway.paypal_status === '1' ? 'Active' : 'Inactive'}</span>
                                        </label>
                                        <div className='d-flex'>
                                            <span className="form-check-label">Change:</span>
                                            <label className="form-check">
                                                <input type="radio" className="form-check-input" name="paypal_status" onChange={handlePaymentGateway} value={1} />
                                                <span className="form-check-label">Active</span>
                                            </label>
                                            <label className="form-check mb-0">
                                                <input type="radio" className="form-check-input" name="paypal_status" onChange={handlePaymentGateway} value={0} />
                                                <span className="form-check-label">Inactive</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* SUBMIT BUTTON */}
                        <div className="container-fluid pb-5 row">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-body p-md-4">
                                        <div className="text-center">
                                            <input type="submit" className="btn btn-outline-primary btn-sm mb-0 px-5" value="Save Details" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Payment;