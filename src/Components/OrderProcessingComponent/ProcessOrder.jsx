import { Select } from 'antd';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UpdateData } from '../../Apis/Setters/UpdateData';
import { EditOrdersContext } from '../../Context/EditOrdersContext';
import useColumnSearchProps from '../../hooks/useColumnSearchProps';
import Datatable from '../DataTableComponent/Datatable';

const ProcessOrder = () => {

    // Declaring ColumnSearchProps Method
    const columnSearchProps = useColumnSearchProps();
    // Using Edit Context Api of this Component
    const [id, setId] = useContext(EditOrdersContext);
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
    const [data, setData] = useState({});
    // ORDER PROCESSING DATA STATE
    const [processingData, setProcessingData] = useState({
        order_id: id,
        warehouse_id: '',
        courier_id: '',
        tags: '',
        package_weight: '',
        package_length: '',
        package_breadth: '',
        package_height: '',
        request_auto_pickup: 'no',
        is_insurance: '0',
    });
    // ORDER PROCESSING RATES STATE
    const [rates, setRates] = useState({
        data: [],
        message: '',
    });
    // CHANGE CUSTOMER POPUP STATE
    const [contentStatus, setContentStatus] = useState(false);

    useEffect(() => {
        const token = window.sessionStorage.getItem("access-vs");
        fetchData(token);
    }, []);

    // FETCHING PICKUP POINTS(WAREHOUSES) & SHIPPING PARTNERS
    const fetchData = async (token) => {
        await axios.post(
            `${process.env.REACT_APP_BASE_URL}admin/orderProcessing/pickup_shipingpartner_list`,
            {},
            {
                headers:
                {
                    'Authorization': `Bearer ${token}`
                },
                withCredentials: true
            }
        ).then(res => {
            // console.log(res.data.data);
            setData(res.data.data);
        }).catch(err => {
            console.log(err);
        })
    };

    // HANDLING ORDER PROCESSING DATA
    const handleDetails = (e) => {
        const { name, value } = e.target;
        setProcessingData({
            ...processingData,
            [name]: value,
        });
    };
    // HANDLING PICKUP POINT
    const handlePickup = (val) => {
        setProcessingData({
            ...processingData,
            warehouse_id: val,
        });
    };
    // HANDLING SHIPPING PARTNER
    const handlePartner = (val) => {
        setProcessingData({
            ...processingData,
            courier_id: val,
        });
    };
    // HANDLING TAGS
    const handleTags = (val) => {
        setProcessingData({
            ...processingData,
            tags: val.join(','),
        });
    };
    // HANDLING AUTO PICKUP
    const handleAutoPickup = (val) => {
        setProcessingData({
            ...processingData,
            request_auto_pickup: val,
        });
    };
    // HANDLING INSURANCE
    const handleInsurance = (val) => {
        setProcessingData({
            ...processingData,
            is_insurance: val,
        });
    };

    // MAPPING PICKUP POINTS TO SELECT OPTIONS
    const pickupPoints = data?.warehouse?.map((elem) => {
        return (
            {
                label: elem.warehouse_name,
                value: elem._id
            }
        );
    });

    // MAPPING SHIPPING PARTNERS TO SELECT OPTIONS
    const shippingPartners = data?.curior_partners?.map((elem) => {
        return (
            {
                label: elem.name,
                value: elem.id
            }
        );
    });

    // DESTRUCTURING DATA FOR DATA TABLE
    let datas = [...rates?.data];

    // DEFINING DATA TABLE COLUMNS
    const columns = [
        {
            title: "ID",
            key: 'id',
            dataIndex: 'id',
            sorter: {
                compare: (a, b) => a.id - b.id,
                multiple: 3,
            },
            ...columnSearchProps('id'),
        },
        {
            title: "NAME",
            key: 'name',
            dataIndex: 'name',
            sorter: {
                compare: (a, b) => a.name - b.name,
                multiple: 3,
            },
            ...columnSearchProps('name'),
        },
        {
            title: "MINIMUM WEIGHT",
            key: 'min_weight',
            dataIndex: 'min_weight',
            sorter: {
                compare: (a, b) => a.min_weight - b.min_weight,
                multiple: 3,
            },
            ...columnSearchProps('min_weight'),
        },
        {
            title: "CHARGEABLE WEIGHT",
            key: 'chargeable_weight',
            dataIndex: 'chargeable_weight',
            sorter: {
                compare: (a, b) => a.chargeable_weight - b.chargeable_weight,
                multiple: 3,
            },
            ...columnSearchProps('chargeable_weight'),
        },
        {
            title: "FREIGHT CHARGES",
            key: 'freight_charges',
            dataIndex: 'freight_charges',
            sorter: {
                compare: (a, b) => a.freight_charges - b.freight_charges,
                multiple: 3,
            },
            ...columnSearchProps('freight_charges'),
        },
        {
            title: "TOTAL CHARGES",
            key: 'total_charges',
            dataIndex: 'total_charges',
            sorter: {
                compare: (a, b) => a.total_charges - b.total_charges,
                multiple: 3,
            },
            ...columnSearchProps('total_charges'),
        },
    ];

    // FORM HANDLING
    const shipment = (e) => {
        e.preventDefault();
        if (Object.values(processingData).includes('')) {
            window.scrollTo(0, 0);
            setSuccessMsg({
                status: false,
                message: '',
            });
            setErrMsg({
                status: true,
                message: 'All fields are required',
            });
        } else {
            setSuccessMsg({
                status: false,
                message: '',
            });
            setErrMsg({
                status: false,
                message: '',
            });
            const credentials = { ...processingData };
            const response = UpdateData({ url: 'orderProcessing/shipment_create', cred: credentials });
            response.then(res => {
                window.scrollTo(0, 0);
                if (res.data.status) {
                    setSuccessMsg({
                        status: true,
                        message: res?.data?.message,
                    });
                    setErrMsg({
                        status: false,
                        message: ''
                    });
                    setProcessingData({
                        order_id: id,
                        warehouse_id: '',
                        courier_id: '',
                        tags: '',
                        package_weight: '',
                        package_length: '',
                        package_breadth: '',
                        package_height: '',
                        request_auto_pickup: 'no',
                        is_insurance: '0',
                    });
                } else {
                    setSuccessMsg({
                        status: false,
                        message: '',
                    });
                    setErrMsg({
                        status: true,
                        message: res?.data?.message
                    });
                }
                console.log(res.data);
            }).catch(err => {
                console.log(err);
            })
        };
    };

    // RATE LIST HANDLING
    const rate = () => {
        if (Object.values(processingData).includes('')) {
            window.scrollTo(0, 0);
            setSuccessMsg({
                status: false,
                message: '',
            });
            setErrMsg({
                status: true,
                message: 'All fields are required',
            });
        } else {
            setSuccessMsg({
                status: false,
                message: '',
            });
            setErrMsg({
                status: false,
                message: '',
            });
            const credentials = {
                order_id: id,
                warehouse_id: processingData?.warehouse_id,
                weight: processingData?.package_weight,
                length: processingData?.package_length,
                breadth: processingData?.package_breadth,
                height: processingData?.package_height,
            };
            const response = UpdateData({ url: 'orderProcessing/check_rate_list', cred: credentials });
            response.then(res => {
                if (res.data.status) {
                    if (!res.data.data.length) {
                        setRates({
                            ...rates,
                            message: 'No data found!',
                        })
                    }else{
                        setRates({
                            data: res.data.data,
                            message: '',
                        });
                    }
                    setContentStatus(!contentStatus);
                }
            }).catch(err => {
                console.log(err);
            })
        };
    };

    const styles = {
        maxWidth: 'initial',
        width: '90vw',
    };

    return (
        <React.Fragment>
            <form onSubmit={shipment}>
                <div className="container-fluid row">
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

                    <div className="col-12">
                        <div className="card mb-3">
                            <div className="card-body p-5">
                                <div className="d-flex justify-content-between">
                                    <h5>Process Order</h5>
                                    <Link to='#' className='text-md' onClick={rate}>Check Rate</Link>
                                </div>
                                <div className="row">
                                    <div className="mb-4 col-md-6">
                                        <label className="form-label">
                                            Pickup point :
                                        </label>
                                        <Select
                                            allowClear
                                            style={{ width: '100%' }}
                                            placeholder="Select Pickup Point"
                                            onChange={handlePickup}
                                            options={pickupPoints}
                                            value={processingData?.warehouse_id}

                                            required />
                                    </div>
                                    <div className="mb-4 col-md-6">
                                        <label className="form-label">
                                            Shipping partner :
                                        </label>
                                        <Select
                                            allowClear
                                            style={{ width: '100%' }}
                                            placeholder="Select Shipping Partner"
                                            onChange={handlePartner}
                                            options={shippingPartners}
                                            value={processingData?.courier_id}
                                            required />
                                    </div>
                                    <div className="mb-4 col-md-6">
                                        <label htmlFor="form-processOrder/package_weight" className="form-label">Package Weight</label>
                                        <input type="number" name='package_weight' className="form-control" id="form-processOrder/package_weight" onChange={handleDetails} value={
                                            processingData?.package_weight} required />
                                    </div>
                                    <div className="mb-4 col-md-6">
                                        <label htmlFor="form-processOrder/package_length" className="form-label">Package Length</label>
                                        <input type="number" name='package_length' className="form-control" id="form-processOrder/package_length" onChange={handleDetails} value={
                                            processingData?.package_length} required />
                                    </div>
                                    <div className="mb-4 col-md-6">
                                        <label htmlFor="form-processOrder/package_breadth" className="form-label">Package Breadth</label>
                                        <input type="number" name='package_breadth' className="form-control" id="form-processOrder/package_breadth" onChange={handleDetails} value={
                                            processingData?.package_breadth} required />
                                    </div>
                                    <div className="mb-4 col-md-6">
                                        <label htmlFor="form-processOrder/package_height" className="form-label">Package Height</label>
                                        <input type="number" name='package_height' className="form-control" id="form-processOrder/package_height" onChange={handleDetails} value={
                                            processingData?.package_height} required />
                                    </div>
                                    <div className="mb-4 col-md-6">
                                        <label htmlFor="form-processOrder/package_height" className="form-label">Tags</label>
                                        <Select
                                            allowClear
                                            mode="tags"
                                            style={{ width: '100%' }}
                                            placeholder="Add tags"
                                            onChange={handleTags}
                                            value={processingData?.tags?.length ? processingData?.tags?.split(',') : []}
                                            required />
                                    </div>
                                    <div className="mb-4 col-sm-6 col-md-3">
                                        <label htmlFor="form-processOrder/request_auto_pickup" className="form-label">Auto Pickup</label>
                                        <Select
                                            allowClear
                                            style={{ width: '100%' }}
                                            placeholder="Select Pickup Point"
                                            onChange={handleAutoPickup}
                                            options={[
                                                {
                                                    label: 'yes',
                                                    value: 'yes'
                                                },
                                                {
                                                    label: 'no',
                                                    value: 'no'
                                                }]}
                                            value={processingData?.request_auto_pickup}
                                            required />
                                    </div>
                                    <div className="mb-4 col-sm-6 col-md-3">
                                        <label htmlFor="form-processOrder/request_auto_pickup" className="form-label">Insurance</label>
                                        <Select
                                            allowClear
                                            style={{ width: '100%' }}
                                            placeholder="Select Pickup Point"
                                            onChange={handleInsurance}
                                            options={[
                                                {
                                                    label: '0',
                                                    value: '0'
                                                },
                                                {
                                                    label: '1',
                                                    value: '1'
                                                }]}
                                            value={processingData?.is_insurance}
                                            required />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <input type="submit" className="btn btn-outline-primary btn-sm mb-0 me-3" value='Save' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            {/* VIEW & UPDATE EMPLOYEE DATA */}
            {contentStatus && <div className="password-popup">
                <div className="rts-newsletter-popup popup" style={styles}>
                    <div className="newsletter-close-btn" onClick={() => setContentStatus(!contentStatus)}>
                        <i className="fa fa-times"></i>
                    </div>
                    <div className="newsletter-inner popup-inner">
                        <h3 className="newsletter-heading">Rate List</h3>
                        {!rates?.data?.length ?
                            <h4>{rates?.message}</h4>
                            :
                            <div className="card">
                                <div className="card-body px-0 pb-2">
                                    <div className="table-responsive">
                                        {<Datatable data={datas} columns={columns} />}
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>}
        </React.Fragment>
    );
};

export default ProcessOrder;