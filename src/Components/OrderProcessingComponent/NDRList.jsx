import { Select } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UpdateData } from '../../Apis/Setters/UpdateData';
import useColumnSearchProps from '../../hooks/useColumnSearchProps';
import Datatable from '../DataTableComponent/Datatable';

const NDRList = () => {

    // Declaring ColumnSearchProps Method
    const columnSearchProps = useColumnSearchProps();
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
    // PICKUP POINT & SHIPPING PARTNERS LIST STATE
    const [ndrs, setNdrs] = useState([]);
    // CHANGE CUSTOMER POPUP STATE
    const [contentStatus, setContentStatus] = useState(false);
    // NDR POPUP DETAILS STATE
    const [contentDetails, setContentDetails] = useState({
        order_id: '',
        awb: '',
        action: 're-attempt',
        action_data: {},
    });
    // HANDLING ACTION DATA
    const handleActionData = (e) => {
        const { name, value } = e.target;
        setContentDetails((prev) => {
            return {
                ...prev,
                action_data: {
                    ...prev?.action_data,
                    [name]: value,
                },
            }
        })
    }
    // ACTION DATA INPUT FIELD STATE
    const [actionDataField, setActionDataField] = useState(
        <div className="input-div">
            <input name='re_attempt_date' type="date" placeholder='Re-attempt Date' value={contentDetails?.action_data?.re_attempt_date} onChange={handleActionData} required />
        </div>
    );
    // FETCHING USER AUTH TOKEN
    const token = window.sessionStorage.getItem("access-vs");
    useEffect(() => {
        window.scrollTo(0, 0);
        fetchData(token);
    }, [successMsg]);

    // HANDLING CONTENT TO BE UPDATED
    const handleContent = (e) => {
        const { name, value } = e.target;
        setContentDetails({
            ...contentDetails,
            [name]: value,
        });
    };

    // HANDLING ACTION INPUT FIELD
    const handleAction = (e) => {
        handleContent(e);
        const val = e.target.value;
        switch (val) {
            case 're-attempt':
                setContentDetails((prev) => {
                    return {
                        ...prev,
                        action_data: {},
                    }
                });
                setActionDataField(
                    <div className="input-div">
                        <input name='re_attempt_date' type="date" placeholder='Re-attempt Date' value={contentDetails?.action_data?.re_attempt_date} onChange={handleActionData} required />
                    </div>
                );
                break;
            case 'change_address':
                setContentDetails((prev) => {
                    return {
                        ...prev,
                        action_data: {},
                    }
                });
                setActionDataField(
                    <React.Fragment>
                        <div className="input-div">
                            <input name='name' type="text" placeholder='name' value={contentDetails?.action_data?.name} onChange={handleActionData} required />
                        </div>
                        <div className="input-div">
                            <textarea name='address_1' placeholder='Address 1' value={contentDetails?.action_data?.address_1} onChange={handleActionData} required />
                        </div>
                        <div className="input-div">
                            <textarea name='address_2' placeholder='Address 2' value={contentDetails?.action_data?.address_2} onChange={handleActionData} required />
                        </div>
                    </React.Fragment>
                );
                break;
            case 'change_phone':
                setContentDetails((prev) => {
                    return {
                        ...prev,
                        action_data: {},
                    }
                });
                setActionDataField(
                    <div className="input-div">
                        <input name='phone' type="phone" placeholder='phone' value={contentDetails?.action_data?.phone} onChange={handleActionData} required />
                    </div>
                );
                break;

            default:
                setContentDetails((prev) => {
                    return {
                        ...prev,
                        action_data: {},
                    }
                });
                setActionDataField(
                    <div className="input-div">
                        <input name='re_attempt_date' type="date" placeholder='Re-attempt Date' value={contentDetails?.action_data?.re_attempt_date} onChange={handleActionData} required />
                    </div>
                );
                break;
        };
    };

    // FETCHING NDR LIST
    const fetchData = async (token) => {
        await axios.post(
            `${process.env.REACT_APP_BASE_URL}admin/orderProcessing/ndr_list`,
            {},
            {
                headers:
                {
                    'Authorization': `Bearer ${token}`
                },
                withCredentials: true
            }
        ).then(res => {
            setNdrs(res.data.data);
        }).catch(err => {
            console.log(err);
        })
    };

    // DESTRUCTURING DATA FOR DATA TABLE
    const data = [...ndrs];

    // DEFINING DATA TABLE COLUMNS
    const columns = [
        {
            title: "ORDER ID",
            key: 'order_id',
            dataIndex: 'order_id',
            sorter: {
                compare: (a, b) => a.order_id - b.order_id,
                multiple: 3,
            },
            render: (_, elem) => <Link to="app-product.html" className="me-4">{elem?.order_id}</Link>
        },
        {
            title: "AWB NUMBER",
            key: 'awb_number',
            dataIndex: 'awb_number',
            sorter: {
                compare: (a, b) => a.awb_number - b.awb_number,
                multiple: 3,
            },
            ...columnSearchProps('awb_number'),
        },
        {
            title: "EVENT DATE",
            key: 'event_date',
            dataIndex: 'event_date',
            sorter: {
                compare: (a, b) => a.event_date - b.event_date,
                multiple: 3,
            },
            ...columnSearchProps('event_date'),
        },
        {
            title: "TOTAL ATTEMPT",
            key: 'total_attempts',
            dataIndex: 'total_attempts',
            sorter: {
                compare: (a, b) => a.total_attempts - b.total_attempts,
                multiple: 3,
            },
            ...columnSearchProps('total_attempts'),
        },
        {
            title: "COURIER REMARK",
            key: 'courier_remarks',
            dataIndex: 'courier_remarks',
            sorter: {
                compare: (a, b) => a.courier_remarks - b.courier_remarks,
                multiple: 3,
            },
            ...columnSearchProps('courier_remarks'),
        },
        {
            title: "ACTION",
            key: "action",
            render: elem => <div className=" text-center px-2 py-1">
                <Link className="cursor-pointer" id="dropdownTable" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="fa fa-ellipsis-v text-secondary" aria-hidden="true"></i>
                </Link>
                <ul className="dropdown-menu px-2 py-3 ms-sm-n4 ms-n5" aria-labelledby="dropdownTable" data-popper-placement="bottom-start">
                    <li onClick={() => {
                        setContentStatus(!contentStatus);
                        setContentDetails({
                            order_id: elem?.order_id,
                            awb: elem?.awb,
                        });
                    }}>
                        <Link className="dropdown-item border-radius-md" to='#'>Update</Link>
                    </li>
                </ul>
            </div>
        }
    ];

    // UPDATE ACTION API CALL
    const update = (e) => {
        e.preventDefault();
        const credentials = { ...contentDetails };

        const response = UpdateData({url: 'orderProcessing/ndr_action', cred: credentials});
        response.then(res=>{
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
                setContentStatus(!contentStatus);
            } else {
                setSuccessMsg({
                    status: false,
                    message: '',
                });
                setErrMsg({
                    status: true,
                    message: res.data.message,
                });
                setContentStatus(!contentStatus);
            }
        }).catch(err=>{
            console.log(err);
        })
    };

    return (
        <React.Fragment>
            <div className="container-fluid py-4">
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

                    {/* NDR LIST */}
                    <div className="card">
                        <div className="card-header pb-0">
                            <div className="row">
                                <div className="col-lg-6 col-7">
                                    <h6>NDR List</h6>
                                </div>
                            </div>
                        </div>
                        <div className="card-body px-0 pb-2">
                            <div className="table-responsive">
                                {<Datatable data={data} columns={columns} />}
                            </div>
                        </div>
                    </div>

                    {/* VIEW & UPDATE NDR DATA */}
                    {contentStatus && <div className="password-popup">
                        <div className="rts-newsletter-popup popup">
                            <div className="newsletter-close-btn" onClick={() => setContentStatus(!contentStatus)}>
                                <i className="fa fa-times"></i>
                            </div>
                            <div className="newsletter-inner popup-inner">
                                <h3 className="newsletter-heading">NDR</h3>
                                <form onSubmit={update}>
                                    <div className="input-area">
                                        <div className="input-div">
                                            <input name='awb' type="text" placeholder='AWB' value={contentDetails?.awb} onChange={handleContent} required />
                                        </div>
                                        <div className="input-div">
                                            <select name='action' placeholder='action' value={contentDetails?.action} onChange={handleAction} required>
                                                <option value='re-attempt' selected>Re-attempt</option>
                                                <option value='change_address'>Change Address</option>
                                                <option value='change_phone'>Change Phone</option>
                                            </select>
                                        </div>
                                        {actionDataField}
                                        <button type="submit" className="subscribe-btn">Update <i className="fa fa-long-arrow-right ml--5" aria-hidden="true"></i></button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>}
                </div>
            </div>
        </React.Fragment>
    );
};

export default NDRList;