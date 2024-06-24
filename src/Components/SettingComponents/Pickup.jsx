import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { DeleteItem } from '../../Apis/Setters/DeleteItem';
import { UpdateData } from '../../Apis/Setters/UpdateData';
import useColumnSearchProps from '../../hooks/useColumnSearchProps';
import Datatable from '../DataTableComponent/Datatable';
import { fetchPickup, pickupSelector, remove } from '../../Apis/Getters/pickup';

const Pickup = () => {

    // USING DISPACHER HOOK
    const dispatch = useDispatch();
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
    // ADD PICKUP PPOINT STATE
    const [pickupPoint, setPickupPoint] = useState({
        warehouse_name: '',
        name: '',
        address: '',
        address_2: '',
        city: '',
        state: '',
        country: '',
        pincode: '',
        phone: '',
        status: 'Active',
    });
    useEffect(() => {
        const token = window.sessionStorage.getItem("access-vs");
        dispatch(fetchPickup(token));
    }, [successMsg]);

    // HANDLING PICKUP DATA
    const handlePickup = (e) => {
        const { name, value } = e.target;
        setPickupPoint({
            ...pickupPoint,
            [name]: value,
        })
    };

    // SELECTING ALL PICKUP POINTS FROM REDUX STATE
    const pickup_points = useSelector(state => pickupSelector.selectAll(state));

    // CHANGE CUSTOMER POPUP STATE
    const [contentStatus, setContentStatus] = useState(false);
    // CUSTOMER POPUP DETAILS STATE
    const [contentDetails, setContentDetails] = useState({
        warehouse_name: '',
        name: '',
        address: '',
        address_2: '',
        city: '',
        state: '',
        country: '',
        pincode: '',
        phone: '',
        status: '1',
    });

    // HANDLING UPDATED PICKUP DATA
    const handleUpdate = (e) => {
        const { name, value } = e.target;
        setContentDetails({
            ...contentDetails,
            [name]: value,
        })
    };

    // DESTRUCTURING DATA FOR DATA TABLE
    const data = [...pickup_points];

    // DEFINING DATA TABLE COLUMNS
    const columns = [
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
            title: "WAREHOUSE NAME",
            key: 'warehouse_name',
            dataIndex: 'warehouse_name',
            sorter: {
                compare: (a, b) => a.warehouse_name - b.warehouse_name,
                multiple: 3,
            },
            ...columnSearchProps('warehouse_name'),
        },
        {
            title: "PHONE",
            key: 'phone',
            dataIndex: 'phone',
            sorter: {
                compare: (a, b) => a.phone - b.phone,
                multiple: 3,
            },
            ...columnSearchProps('phone'),
        },
        {
            title: "CITY",
            key: 'city',
            dataIndex: 'city',
            sorter: {
                compare: (a, b) => a.city - b.city,
                multiple: 3,
            },
            ...columnSearchProps('city'),
        },
        {
          title: "STATUS",
          key: 'status',
          dataIndex: 'status',
          sorter: {
            compare: (a, b) => a.status - b.status,
            multiple: 3,
          },
          render: (_, elem) => <div className=" text-left px-2 py-1">
            <div className=" text-left">
              <div className="badge bg-primary">{elem?.status}</div>
            </div>
          </div>
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
                            id: elem?._id,
                            warehouse_name: elem?.warehouse_name,
                            name: elem?.name,
                            address: elem?.address,
                            address_2: elem?.address_2,
                            city: elem?.city,
                            state: elem?.state,
                            country: elem?.country,
                            pincode: elem?.pincode,
                            phone: elem?.phone,
                            status: elem?.status,
                        })
                    }}>
                        <Link className="dropdown-item border-radius-md" to='#'>Update</Link>
                    </li>
                    <li onClick={() => {
                        dispatch(remove(elem._id));
                        deleteItem(elem._id);
                    }}>
                        <Link className="dropdown-item border-radius-md" to='#'>Delete</Link>
                    </li>
                </ul>
            </div>
        }
    ];

    // API CALL TO ADD AN ITEM
    const addPickup = (e) => {
        e.preventDefault();
        const credentials = { ...pickupPoint };
        const response = UpdateData({ url: 'warehouse/add', cred: credentials });
        response.then(res => {
            // console.log(res.data);

            window.scrollTo(0, 0);
            if (res.data.status) {
                setPickupPoint({
                    warehouse_name: '',
                    name: '',
                    address: '',
                    address_2: '',
                    city: '',
                    state: '',
                    country: '',
                    pincode: '',
                    phone: '',
                    status: '1',
                });
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
    };

    // API CALL TO UPDATE AN ITEM
    const updateContent = (e) => {
        e.preventDefault();
        const credentials = { ...contentDetails };
        const response = UpdateData({ url: 'warehouse/update', cred: credentials });
        response.then(res => {
            // console.log(res.data);

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

        }).catch(AxiosError => console.log(AxiosError.response.data.errors));
    };

    // API CALL TO DELETE AN ITEM
    const deleteItem = (id) => {
        const response = DeleteItem({ id: id, url: 'warehouse/delete' });
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
            };
        }).catch(AxiosError => console.log(AxiosError.response.data.errors));
    };

    return (
        <React.Fragment>
            <div className="container-fluid py-4">
                <div className="row my-4">
                    <div className="col-md-12 mb-md-0 mb-4">
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

                        {/* ADD PICKUP FORM */}
                        <div className="g-4">
                            <div className="card mb-3">
                                <div className="card-body p-md-5">
                                    <h4>Add Pickup Point</h4>
                                    <form onSubmit={addPickup}>
                                        <div className="row">
                                            <div className="mb-4 col-12 col-md-6">
                                                <label htmlFor="form-pickup/name" className="form-label">Name</label>
                                                <input type="text" name='name' className="form-control" id="form-pickup/name" value={pickupPoint.name} onChange={handlePickup} required />
                                            </div>
                                            <div className="mb-4 col-12 col-md-6">
                                                <label htmlFor="form-pickup/phone" className="form-label">Phone</label>
                                                <input type="tel" name='phone' className="form-control" id="form-pickup/phone" value={pickupPoint.phone} onChange={handlePickup} required />
                                            </div>
                                            <div className="mb-4 col-12 col-md-6">
                                                <label htmlFor="form-pickup/warehouse_name" className="form-label">Warehouse Name</label>
                                                <input type="text" name='warehouse_name' className="form-control" id="form-pickup/warehouse_name" value={pickupPoint.warehouse_name} onChange={handlePickup} required />
                                            </div>
                                            <div className="mb-4 col-12 col-md-6">
                                                <label htmlFor="form-pickup/address" className="form-label">Address 1</label>
                                                <input type="text" name='address' className="form-control" id="form-pickup/address" value={pickupPoint.address} onChange={handlePickup} required />
                                            </div>
                                            <div className="mb-4 col-12 col-md-6">
                                                <label htmlFor="form-pickup/address_2" className="form-label">Address 2</label>
                                                <input type="text" name='address_2' className="form-control" id="form-pickup/address_2" value={pickupPoint.address_2} onChange={handlePickup} required />
                                            </div>
                                            <div className="mb-4 col-12 col-md-6">
                                                <label htmlFor="form-pickup/city" className="form-label">City</label>
                                                <input type="text" name='city' className="form-control" id="form-pickup/city" value={pickupPoint.city} onChange={handlePickup} required />
                                            </div>
                                            <div className="mb-4 col-12 col-md-6">
                                                <label htmlFor="form-pickup/state" className="form-label">State</label>
                                                <input type="text" name='state' className="form-control" id="form-pickup/state" value={pickupPoint.state} onChange={handlePickup} required />
                                            </div>
                                            <div className="mb-4 col-12 col-md-6">
                                                <label htmlFor="form-pickup/country" className="form-label">Country</label>
                                                <input type="text" name='country' className="form-control" id="form-pickup/country" value={pickupPoint.country} onChange={handlePickup} required />
                                            </div>
                                            <div className="mb-4 col-12 col-md-6">
                                                <label htmlFor="form-pickup/pincode" className="form-label">Pincode</label>
                                                <input type="number" name='pincode' className="form-control" id="form-pickup/pincode" value={pickupPoint.pincode} onChange={handlePickup} required />
                                            </div>

                                            <div className="mb-4 col-12 col-md-6">
                                                <label htmlFor="form-payments/status" className="form-label">
                                                    Status: <span className="form-check-label">{pickupPoint?.status}</span>
                                                </label>
                                                <div className='d-flex'>
                                                    <span className="form-check-label">Change:</span>
                                                    <label className="form-check">
                                                        <input type="radio" className="form-check-input" name="status" value='Active' onChange={handlePickup} required />
                                                        <span className="form-check-label">Active</span>
                                                    </label>
                                                    <label className="form-check mb-0">
                                                        <input type="radio" className="form-check-input" name="status" value='Inactive' onChange={handlePickup} required />
                                                        <span className="form-check-label">Inactive</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <input type="submit" className="btn btn-outline-primary btn-sm mb-0" value='Save' />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        {/* PICKUP LIST */}
                        <div className="card">
                            <div className="card-header pb-0">
                                <div className="row">
                                    <div className="col-lg-6 col-7">
                                        <h6>Pickup Points List</h6>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body px-0 pb-2">
                                <div className="table-responsive">
                                    {<Datatable data={data} columns={columns} />}
                                </div>
                            </div>
                        </div>

                        {/* VIEW & UPDATE PICKUP */}
                        {contentStatus && <div className="password-popup">
                            <div className="rts-newsletter-popup popup">
                                <div className="newsletter-close-btn" onClick={() => setContentStatus(!contentStatus)}>
                                    <i className="fa fa-times"></i>
                                </div>
                                <div className="newsletter-inner popup-inner">
                                    <h3 className="newsletter-heading">Pickup Point</h3>
                                    <form onSubmit={updateContent}>
                                        <div className="input-area">
                                            <div className="input-div">
                                                <label className="form-label">Name</label>
                                                <input name='name' type="text" value={contentDetails.name} placeholder='Name' onChange={handleUpdate} required />
                                            </div>
                                            <div className="input-div">
                                                <label className="form-label">Phone</label>
                                                <input name='phone' type="phone" value={contentDetails.phone} placeholder='Phone' onChange={handleUpdate} required />
                                            </div>
                                            <div className="input-div">
                                                <label className="form-label">Warehouse Name</label>
                                                <input name='warehouse_name' type="text" value={contentDetails.warehouse_name} placeholder='Warehouse Name' onChange={handleUpdate} required />
                                            </div>
                                            <div className="input-div">
                                                <label className="form-label">Address 1</label>
                                                <input name='address' type="text" value={contentDetails.address} placeholder='address Name' onChange={handleUpdate} required />
                                            </div>
                                            <div className="input-div">
                                                <label className="form-label">Address 2</label>
                                                <input name='address_2' type="text" value={contentDetails.address_2} placeholder='Address 2' onChange={handleUpdate} required />
                                            </div>
                                            <div className="input-div">
                                                <label className="form-label">City</label>
                                                <input name='city' type="text" value={contentDetails.city} placeholder='City' onChange={handleUpdate} required />
                                            </div>
                                            <div className="input-div">
                                                <label className="form-label">State</label>
                                                <input name='state' type="text" value={contentDetails.state} placeholder='State' onChange={handleUpdate} required />
                                            </div>
                                            <div className="input-div">
                                                <label className="form-label">Country</label>
                                                <input name='country' type="text" value={contentDetails.country} placeholder='Country' onChange={handleUpdate} required />
                                            </div>
                                            <div className="input-div">
                                                <label className="form-label">Pincode</label>
                                                <input name='pincode' type="number" value={contentDetails.pincode} placeholder='Pincode' onChange={handleUpdate} required />
                                            </div>
                                            <div className="input-div">
                                            <label htmlFor="form-payments/status" className="form-label">
                                                    Status: <span className="form-check-label">{contentDetails?.status}</span>
                                                </label>
                                                <div className='d-flex'>
                                                    <label className="form-check">
                                                        <input name='status' type="radio" value='Active' onChange={handleUpdate} required />
                                                        <span className="form-check-label">Active</span>
                                                    </label>
                                                    <label className="form-check mb-0">
                                                        <input name='status' type="radio" value='Inactive' onChange={handleUpdate} required />
                                                        <span className="form-check-label">Inactive</span>
                                                    </label>
                                                </div>
                                            </div>
                                            <button type="submit" className="subscribe-btn">Update <i className="fa fa-long-arrow-right ml--5" aria-hidden="true"></i></button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Pickup;