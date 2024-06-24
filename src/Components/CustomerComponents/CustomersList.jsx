import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { customersSelector, fetchCustomers } from '../../Apis/Getters/customers';
import { DeleteItem } from '../../Apis/Setters/DeleteItem';
import { UpdateData } from '../../Apis/Setters/UpdateData';
import { CustomerDetailsContext } from '../../Context/CustomerDetailsContext';
import useColumnSearchProps from '../../hooks/useColumnSearchProps';
// import { images } from '../../assets/images';
import Datatable from '../DataTableComponent/Datatable';

const CustomersList = () => {

    // USING DISPACHER HOOK
    const dispatch = useDispatch();
    // Declaring ColumnSearchProps Method
    const columnSearchProps = useColumnSearchProps();
    // Using Details Context Api
    const [id, setId] = useContext(CustomerDetailsContext);
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
    useEffect(() => {
        const token = window.sessionStorage.getItem("access-vs");
        dispatch(fetchCustomers(token));
    }, [successMsg]);

    // SELECTING ALL CUSTOMERS FROM REDUX STATE
    const customers = useSelector(state => customersSelector.selectAll(state));

    // CHANGE CUSTOMER POPUP STATE
    const [contentStatus, setContentStatus] = useState(false);
    // CUSTOMER POPUP DETAILS STATE
    const [contentDetails, setContentDetails] = useState({
        name: '',
        email: '',
        mobile: '',
    });

    // DESTRUCTURING DATA FOR DATA TABLE
    const data = [...customers];

    // DEFINING DATA TABLE COLUMNS
    const columns = [
        {
            title: "IMAGE",
            key: 'profile_image',
            dataIndex: 'profile_image',
            sorter: {
                compare: (a, b) => a.profile_image - b.profile_image,
                multiple: 3,
            },
            render: (_, elem) => <Link href="app-product.html" className="me-4">
                <div className="sa-symbol sa-symbol--shape--rounded sa-symbol--size--lg">
                    <img src={elem.profile_image} width="40" height="40" alt="" />
                </div>
            </Link>
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
            title: "EMAIL",
            key: 'email',
            dataIndex: 'email',
            sorter: {
                compare: (a, b) => a.email - b.email,
                multiple: 3,
            },
            ...columnSearchProps('email'),
        },
        {
            title: "MOBILE",
            key: 'mobile',
            dataIndex: 'mobile',
            sorter: {
                compare: (a, b) => a.mobile - b.mobile,
                multiple: 3,
            },
            ...columnSearchProps('mobile'),
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
                        setId(elem._id);
                    }}>
                        <Link className="dropdown-item border-radius-md" to='/admin/customers/customer'>View</Link>
                    </li>
                    <li onClick={() => {
                        setContentStatus(!contentStatus);
                        setContentDetails({
                            id: elem._id,
                            name: elem.name,
                            email: elem.email,
                            mobile: elem.mobile,
                        })
                    }}>
                        <Link className="dropdown-item border-radius-md" to='#'>Update</Link>
                    </li>
                    <li onClick={() => {
                        // dispatch(remove(elem._id));
                        deleteItem(elem._id);
                    }}>
                        <Link className="dropdown-item border-radius-md" to='#'>Delete</Link>
                    </li>
                </ul>
            </div>
        }
    ];

    // UPDATE CUSTOMER DATA API METHOD
    const updateContent = (e) => {
        e.preventDefault();
        const credentials = { ...contentDetails };

        const response = UpdateData({ url: 'customer/update', cred: credentials });
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

    // API CALL METHOD TO DELETE AN ITEM
    const deleteItem = (id) => {
        const response = DeleteItem({ id: id, url: 'customer/delete' });
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
    }

    return (
        <React.Fragment>
            {/* <div className="container-fluid py-4">

                <div className="row my-4">
                    <div className="col-md-12 mb-md-0 mb-4">
                        <div className="card">
                            <div className="card-header pb-0">
                                <div className="row">
                                    <div className="col-lg-6 col-7">
                                        <h6>Customers List</h6>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body px-0 pb-2">
                                <div className="table-responsive">
                                    <table className="table align-items-center mb-0">
                                        <thead>
                                            <tr>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder">
                                                    Name
                                                </th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder">
                                                    Registered
                                                </th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder ps-2">
                                                    Country
                                                </th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder ps-2">
                                                    Spent
                                                </th>
                                                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder">
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            <tr>
                                                <td>
                                                    <div className="d-flex px-2 py-1">
                                                        <Link to="/admin/customers/customer" className="me-4">
                                                            <div className="sa-symbol sa-symbol--shape--rounded sa-symbol--size--lg">
                                                                <img src={images.productThumbnail} className='avatar avatar-sm me-3' width="40" height="40" alt="" />
                                                            </div>
                                                        </Link>
                                                        <div className="d-flex flex-column justify-content-center">
                                                            <h6 className="mb-0 text-sm">
                                                                <Link to='/admin/customers/customer'>Rahul Kumar</Link>
                                                            </h6>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="align-middle">
                                                    <div className=" text-left px-2 py-1">
                                                        <div className=" text-left">
                                                            <span className="text-sm">May 15, 2021</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="align-middle">
                                                    <div className=" text-left px-2 py-1">
                                                        <div className=" text-left">
                                                            <span className="fi fi-in"></span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="align-middle">
                                                    <div className=" text-left px-2 py-1">
                                                        <div className=" text-left">
                                                            <span className="text-sm">₹8,000.00</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="align-middle">
                                                    <div className=" text-center px-2 py-1">
                                                        <Link className="cursor-pointer" id="dropdownTable" data-bs-toggle="dropdown" aria-expanded="false">
                                                            <i className="fa fa-ellipsis-v text-secondary" aria-hidden="true"></i>
                                                        </Link>
                                                        <ul className="dropdown-menu px-2 py-3 ms-sm-n4 ms-n5" aria-labelledby="dropdownTable" data-popper-placement="bottom-start">
                                                            <li><Link className="dropdown-item border-radius-md" to='/admin/customers/customer'>View</Link></li>
                                                            <li><Link className="dropdown-item border-radius-md" to='#'>Delete</Link></li>
                                                        </ul>
                                                    </div>
                                                </td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
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

                        {/* CUSTOMERS LIST */}
                        <div className="card">
                            <div className="card-header pb-0">
                                <div className="row">
                                    <div className="col-lg-6 col-7">
                                        <h6>Customers List</h6>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body px-0 pb-2">
                                <div className="table-responsive">
                                    {<Datatable data={data} columns={columns} />}
                                </div>
                            </div>
                        </div>

                        {/* VIEW & UPDATE CUSTOMER DATA */}
                        {contentStatus && <div className="password-popup">
                            <div className="rts-newsletter-popup popup">
                                <div className="newsletter-close-btn" onClick={() => setContentStatus(!contentStatus)}>
                                    <i className="fa fa-times"></i>
                                </div>
                                <div className="newsletter-inner popup-inner">
                                    <h3 className="newsletter-heading">Testimonial</h3>
                                    <form onSubmit={updateContent}>
                                        <div className="input-area">
                                            <div className="input-div">
                                                <input name='name' type="text" value={contentDetails.name} placeholder='Name' onChange={(e) => setContentDetails({ ...contentDetails, name: e.target.value })} required />
                                            </div>
                                            <div className="input-div">
                                                <input name='email' type="text" value={contentDetails.email} placeholder='Email' onChange={(e) => setContentDetails({ ...contentDetails, email: e.target.value })} required />
                                            </div>
                                            <div className="input-div">
                                                <input name='phone' type="tel" value={contentDetails.mobile} placeholder='Mobile' onChange={(e) => setContentDetails({ ...contentDetails, mobile: e.target.value })} required />
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

export default CustomersList;