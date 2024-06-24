import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchOrders, ordersSelector } from '../../Apis/Getters/orders';
import { DeleteItem } from '../../Apis/Setters/DeleteItem';
import { EditOrdersContext } from '../../Context/EditOrdersContext';
import useColumnSearchProps from '../../hooks/useColumnSearchProps';
import Datatable from '../DataTableComponent/Datatable';
import OrderTrack from '../OrderProcessingComponent/OrderTrack';

const OrdersList = () => {

    // Declaring Dispatch Method
    const dispatch = useDispatch();
    // Declaring ColumnSearchProps Method
    const columnSearchProps = useColumnSearchProps();

    useEffect(() => {
        // Dispatching Fetch Method of this Component
        const token = window.sessionStorage.getItem("access-vs");
        dispatch(fetchOrders(token));
    }, []);

    // Getting List from Redux State of this Component
    const orders = useSelector(state => ordersSelector.selectAll(state));
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
    // CHANGE CUSTOMER POPUP STATE
    const [contentStatus, setContentStatus] = useState(false);

    // DESTRUCTURING DATA FOR DATA TABLE
    const data = [...orders];

    // DEFINING DATA TABLE COLUMNS
    const columns = [
        {
            title: "ORDER ID",
            key: '_id',
            dataIndex: '_id',
            sorter: {
                compare: (a, b) => a._id - b._id,
                multiple: 3,
            },
            ...columnSearchProps('_id'),
        },
        {
            title: "DATE",
            dataIndex: 'created_at',
            key: 'created_at',
            sorter: {
                compare: (a, b) => a.created_at - b.created_at,
                multiple: 3,
            },
            ...columnSearchProps('created_at'),
            render: (_, elem) => <span>{(new Date(elem.created_at)).toDateString()}</span>
        },
        {
            title: "CUSTOMER ID",
            key: 'customer_id',
            dataIndex: 'customer_id',
            sorter: {
                compare: (a, b) => a.customer_id - b.customer_id,
                multiple: 3,
            },
            ...columnSearchProps('customer_id'),
        },
        {
            title: "PAYMENT STATUS",
            key: 'payment_status',
            dataIndex: 'payment_status',
            sorter: {
                compare: (a, b) => a.payment_status - b.payment_status,
                multiple: 3,
            },
            ...columnSearchProps('payment_status'),
            render: (_, elem) => <div className=" text-left px-2 py-1">
                <div className=" text-left">
                    <div className="badge bg-primary">{elem.payment_status}</div>
                </div>
            </div>
        },
        {
            title: "ORDER STATUS",
            key: 'order_status',
            dataIndex: 'order_status',
            sorter: {
                compare: (a, b) => a.order_status - b.order_status,
                multiple: 3,
            },
            ...columnSearchProps('order_status'),
            render: (_, elem) => <div className=" text-left px-2 py-1">
                <div className=" text-left">
                    <div className="badge bg-primary">{elem.order_status}</div>
                </div>
            </div>
        },
        {
            title: "ITEMS",
            key: 'orderDetails',
            dataIndex: 'orderDetails',
            sorter: {
                compare: (a, b) => a.orderDetails - b.orderDetails,
                multiple: 3,
            },
            render: (_, elem) => <span>{elem.orderDetails.length}</span>
        },
        {
            title: "TOTAL",
            key: 'grand_total',
            dataIndex: 'grand_total',
            sorter: {
                compare: (a, b) => a.grand_total - b.grand_total,
                multiple: 3,
            },
            ...columnSearchProps('grand_total'),
            render: (_, elem) => <span>{elem.grand_total.toLocaleString('en-US', { style: 'currency', currency: 'INR' })}</span>
        },
        {
            title: "ACTION",
            key: "action",
            render: elem => <div className=" text-center px-2 py-1">
                <Link className="cursor-pointer" id="dropdownTable" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="fa fa-ellipsis-v text-secondary" aria-hidden="true"></i>
                </Link>
                <ul className="dropdown-menu px-2 py-3 ms-sm-n4 ms-n5" aria-labelledby="dropdownTable" data-popper-placement="bottom-start">
                    <li onClick={() => setId(elem._id)}>
                        <Link className="dropdown-item border-radius-md" to={'/admin/orders/order/' + elem._id}>View</Link>
                    </li>
                    {elem.order_status == 'pending' &&
                        <li onClick={() => setId(elem._id)}>
                            <Link to='/admin/process-order' className="dropdown-item border-radius-md">Process</Link>
                        </li>
                    }
                    {elem.order_status !== 'Cancelled' && <li onClick={() => {
                        setId(elem._id);
                        setContentStatus(!contentStatus)
                    }}>
                        <Link className="dropdown-item border-radius-md" to='#'>Track</Link>
                    </li>}
                    <li onClick={() => { cancelOrder(elem._id) }}>
                        <Link className="dropdown-item border-radius-md" to='#'>Cancel</Link>
                    </li>
                </ul>
            </div>
        }
    ];

    // API CALL METHOD TO DELETE AN ITEM
    const cancelOrder = (id) => {
        const response = DeleteItem({ order_id: id, url: 'orderProcessing/cancel_shipment' });
        response.then(res => {
            console.log(res)
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
                        <div className="card">
                            <div className="card-header pb-0">
                                <div className="row">
                                    <div className="col-lg-6 col-7">
                                        <h6>Orders List</h6>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body px-0 pb-2">
                                <div className="table-responsive">
                                    {<Datatable data={data} columns={columns} />}
                                    {/* <table className="table align-items-center mb-0">
                                        <thead>
                                            <tr>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder">
                                                    Order No.
                                                </th>
                                                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder">
                                                    Date
                                                </th>
                                                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder">
                                                    Customer
                                                </th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder">
                                                    Status
                                                </th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder ps-2">
                                                    Country
                                                </th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder ps-2">
                                                    Items
                                                </th>
                                                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder">
                                                    Total
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
                                                        <div className="d-flex flex-column justify-content-center">
                                                            <h6 className="mb-0 text-sm">
                                                                <Link to='/admin/orders/order'>#00745</Link>
                                                            </h6>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="align-middle">
                                                    <div className=" text-center px-2 py-1">
                                                        <div className=" text-center">
                                                            <span className="text-sm">2020-11-02</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="align-middle">
                                                    <div className=" text-center px-2 py-1">
                                                        <div className=" text-center">
                                                            <Link to='#' className="text-sm">Rahul</Link>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="d-flex px-2 py-1">
                                                        <div className="d-flex flex-column justify-content-center">
                                                            <div className="badge bg-primary">New</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="align-middle text-center text-sm">
                                                    <span className="text-lg font-weight-bold">

                                                        <span className="fi fi-in"></span>
                                                    </span>
                                                </td>
                                                <td className="align-middle">
                                                    <div className=" text-center px-2 py-1">
                                                        <div className=" text-center">
                                                            <span className="text-sm">5</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="align-middle">
                                                    <div className=" text-center px-2 py-1">
                                                        <div className=" text-center">
                                                            <span className="text-sm">₹25,000.00</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="align-middle">
                                                    <div className=" text-center px-2 py-1">
                                                        <Link className="cursor-pointer" id="dropdownTable" data-bs-toggle="dropdown" aria-expanded="false">
                                                            <i className="fa fa-ellipsis-v text-secondary" aria-hidden="true"></i>
                                                        </Link>
                                                        <ul className="dropdown-menu px-2 py-3 ms-sm-n4 ms-n5" aria-labelledby="dropdownTable" data-popper-placement="bottom-start">
                                                            <li><Link className="dropdown-item border-radius-md" to='/admin/orders/order'>View</Link></li>
                                                            <li><Link className="dropdown-item border-radius-md" to='#'>Delete</Link></li>
                                                        </ul>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* VIEW TRACK */}
            {contentStatus && <div className="password-popup">
                <div className="rts-newsletter-popup popup">
                    <div className="newsletter-close-btn" onClick={() => setContentStatus(!contentStatus)}>
                        <i className="fa fa-times"></i>
                    </div>
                    <div className="newsletter-inner popup-inner">
                        <h3 className="newsletter-heading">Track</h3>
                        <OrderTrack />
                    </div>
                </div>
            </div>}
        </React.Fragment>
    );
};

export default OrdersList;