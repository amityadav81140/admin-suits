import React, { useState } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPayments, paymentsSelector } from '../../Apis/Getters/payments';
import { PaymentsContext } from '../../Context/PaymentsContext';
// import { DeleteItem } from '../../Apis/Setters/DeleteItem';
import useColumnSearchProps from '../../hooks/useColumnSearchProps';
import Datatable from '../DataTableComponent/Datatable';

const PaymentsList = () => {

    // USING DISPATCH HOOK
    const dispatch = useDispatch();
    // USING CONTEXT API
    const [id,setId] = useContext(PaymentsContext);
    
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

    // GETTING AUTH TOKEN
    const token = window.sessionStorage.getItem("access-vs");
    useEffect(()=>{
        dispatch(fetchPayments(token));
    },[]);

    // SELECTING PAYMENTS FROM REDUX STATE
    const paymentsData = useSelector(state=>paymentsSelector.selectAll(state));

    // DESTRUCTURING DATA FOR DATA TABLE
    const data = [...paymentsData];

    // DEFINING DATA TABLE COLUMNS
    const columns = [
        {
            title: "INVOICE NO.",
            key: 'invoice_no',
            dataIndex: 'invoice_no',
            sorter: {
                compare: (a, b) => a.invoice_no - b.invoice_no,
                multiple: 3,
            },
            ...columnSearchProps('invoice_no'),
        },
        {
            title: "CUSTOMER NAME",
            key: 'costomer_name',
            dataIndex: 'costomer_name',
            sorter: {
                compare: (a, b) => a.costomer_name - b.costomer_name,
                multiple: 3,
            },
            ...columnSearchProps('costomer_name'),
        },
        {
            title: "CUSTOMER EMAIL",
            key: 'costomer_email',
            dataIndex: 'costomer_email',
            sorter: {
                compare: (a, b) => a.costomer_email - b.costomer_email,
                multiple: 3,
            },
            ...columnSearchProps('costomer_email'),
        },
        {
            title: "AMOUNT",
            key: 'amount',
            dataIndex: 'amount',
            sorter: {
                compare: (a, b) => a.amount - b.amount,
                multiple: 3,
            },
            ...columnSearchProps('amount'),
        },
        {
            title: "STATUS",
            key: 'payment_status',
            dataIndex: 'payment_status',
            sorter: {
                compare: (a, b) => a.payment_status - b.payment_status,
                multiple: 3,
            },
            ...columnSearchProps('payment_status'),
        },
        {
            title: "ACTION",
            key: "action",
            render: elem => <div className=" text-center px-2 py-1">
                <Link className="cursor-pointer" id="dropdownTable" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="fa fa-ellipsis-v text-secondary" aria-hidden="true"></i>
                </Link>
                <ul className="dropdown-menu px-2 py-3 ms-sm-n4 ms-n5" aria-labelledby="dropdownTable" data-popper-placement="bottom-start">
                    <li
                    onClick={() => setId(elem.invoice_no)}
                    >
                        <Link className="dropdown-item border-radius-md" to={'/admin/payment/'+elem.invoice_no}>View</Link>
                    </li>
                    {/* <li onClick={() => {
                        // dispatch(remove(elem._id));
                        // deleteItem(elem._id);
                    }}>
                        <Link className="dropdown-item border-radius-md" to='#'>Delete</Link>
                    </li> */}
                </ul>
            </div>
        }
    ];

    // API CALL METHOD TO DELETE AN ITEM
    // const deleteItem = (id) => {

    //     const response = DeleteItem({ id: id, url: 'review/delete' });
    //     response.then(res => {
    //         // console.log(res.data);

    //         window.scrollTo(0, 0);
    //         if (res.data.status) {
    //             setSuccessMsg({
    //                 status: true,
    //                 message: res.data.message,
    //             });
    //             setErrMsg({
    //                 status: false,
    //                 message: '',
    //             });
    //         } else {
    //             setSuccessMsg({
    //                 status: false,
    //                 message: '',
    //             });
    //             setErrMsg({
    //                 status: true,
    //                 message: res.data.message,
    //             });
    //         }

    //     }).catch(AxiosError => console.log(AxiosError.response.data.errors));
    // };

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
                                        <h6>Payments List</h6>
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
        </React.Fragment>
    );
};

export default PaymentsList;