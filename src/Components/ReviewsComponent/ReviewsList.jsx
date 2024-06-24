import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchReviews, reviewsSelector, remove } from '../../Apis/Getters/reviews';
import { DeleteItem } from '../../Apis/Setters/DeleteItem';
import { UpdateData } from '../../Apis/Setters/UpdateData';
import useColumnSearchProps from '../../hooks/useColumnSearchProps';
import Datatable from '../DataTableComponent/Datatable';

const ReviewsList = () => {

    // Declaring Dispatch Method
    const dispatch = useDispatch();
    // Declaring ColumnSearchProps Method
    const columnSearchProps = useColumnSearchProps();
    useEffect(() => {
        // Dispatching Fetch Method of this Component
        const token = window.sessionStorage.getItem("access-vs");
        dispatch(fetchReviews(token));
    }, []);
    // Getting List from Redux State of this Component
    const enquiries = useSelector(state => reviewsSelector.selectAll(state));

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
    // CHANGE ENQUIRY POPUP STATE
    const [msgStatus, setMsgStatus] = useState(false);
    // ENQUIRY POPUP DETAILS STATE
    const [enqDetails, setEnqDetails] = useState({
        name: '',
        email: '',
        message: '',
    });

    // DESTRUCTURING DATA FOR DATA TABLE
    const data = [...enquiries];

    // DEFINING DATA TABLE COLUMNS
    const columns = [
        {
            title: "NAME",
            dataIndex: 'customer_name',
            key: 'customer_name',
            sorter: {
                compare: (a, b) => a.customer_name - b.customer_name,
                multiple: 3,
            },
            ...columnSearchProps('customer_name'),
        },
        {
            title: "EMAIL",
            dataIndex: 'customer_email',
            key: 'customer_email',
            sorter: {
                compare: (a, b) => a.customer_email - b.customer_email,
                multiple: 3,
            },
            ...columnSearchProps('customer_email'),
        },
        {
            title: "PRODUCT NAME",
            dataIndex: 'product_name',
            key: 'product_name',
            sorter: {
                compare: (a, b) => a.product_name - b.product_name,
                multiple: 3,
            },
            ...columnSearchProps('product_name'),
        },
        {
            title: "PRODUCT CATEGORY",
            dataIndex: 'product_category',
            key: 'product_category',
            sorter: {
                compare: (a, b) => a.product_category - b.product_category,
                multiple: 3,
            },
            ...columnSearchProps('product_category'),
        },
        {
            title: "RATING",
            key: 'rating',
            dataIndex: 'rating',
            sorter: {
                compare: (a, b) => a.rating - b.rating,
                multiple: 3,
            },
            ...columnSearchProps('rating'),
        },
        {
            title: "COMMENT",
            key: 'comment',
            dataIndex: 'comment',
            sorter: {
                compare: (a, b) => a.comment - b.comment,
                multiple: 3,
            },
            ...columnSearchProps('comment'),
            render: (_,elem) => <span>{elem.comment.slice(0, 25)}...</span>
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
                    <div className="badge bg-primary">{elem.status === "1" ? 'Visible' : "Hidden"}</div>
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
                        setMsgStatus(!msgStatus);
                        setEnqDetails({
                            id: elem._id,
                            name: elem.customer.name,
                            email: elem.customer.email,
                            product_name: elem.product.name,
                            product_category: elem.product.category,
                            rating: elem.rating,
                            comment: elem.comment,
                            status: elem.status,
                        })
                    }}>
                        <Link className="dropdown-item border-radius-md" to='#'>View</Link>
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

    // API CALL METHOD TO DELETE AN ITEM
    const deleteItem = (id) => {

        const response = DeleteItem({ id: id, url: 'review/delete' });
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

    // API CALL METHOD TO UPDATE REVIEW STATUS
    const reviewStatus = (e) => {
        e.preventDefault();
        const credentials = {
            id: enqDetails.id,
            status: enqDetails.status,
        };

        const response = UpdateData({ url: 'review/update_status', cred: credentials });
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
                setMsgStatus(!msgStatus);
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
                                        <h6>Reviews List</h6>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body px-0 pb-2">
                                <div className="table-responsive">
                                    {<Datatable data={data} columns={columns} />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {msgStatus && <div className="password-popup">
                <div className="rts-newsletter-popup popup">
                    <div className="newsletter-close-btn" onClick={() => setMsgStatus(!msgStatus)}>
                        <i className="fa fa-times"></i>
                    </div>
                    <div className="newsletter-inner popup-inner">
                        <h3 className="newsletter-heading">Review Details</h3>
                        <form onSubmit={reviewStatus}>
                            <div className="input-area">
                                <div className="input-div">
                                    <input name='name' type="text" value={enqDetails.name} placeholder='Customer Name' disabled required />
                                </div>
                                <div className="input-div">
                                    <input name='email' type="email" value={enqDetails.email} placeholder='Customer Email' disabled required />
                                </div>
                                <div className="input-div">
                                    <input name='product_name' type="text" value={enqDetails.product_name} placeholder='Product Name' disabled required />
                                </div>
                                <div className="input-div">
                                    <input name='product_category' type="text" value={enqDetails.product_category} placeholder='Product Category' disabled required />
                                </div>
                                <div className="input-div">
                                    <input name='rating' type="number" value={enqDetails.rating} placeholder='Rating' disabled required />
                                </div>
                                <div className="input-div">
                                    <label htmlFor='status'>Review Status</label>
                                    <input name='status' type="number" id='status' value={enqDetails.status} placeholder='Status' onChange={
                                        e => {
                                            setEnqDetails({ ...enqDetails, status: e.target.value })
                                        }
                                    } required />
                                </div>
                                <div className="input-div">
                                    <textarea rows={5} value={enqDetails.comment} placeholder='Comment' disabled required></textarea>
                                </div>
                                <button type="submit" className="subscribe-btn">Update <i className="fa fa-long-arrow-right ml--5"></i></button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>}
        </React.Fragment>
    );
};

export default ReviewsList;