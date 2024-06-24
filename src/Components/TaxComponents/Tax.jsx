import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { DeleteItem } from '../../Apis/Setters/DeleteItem';
import { UpdateData } from '../../Apis/Setters/UpdateData';
import useColumnSearchProps from '../../hooks/useColumnSearchProps';
import Datatable from '../DataTableComponent/Datatable';
import { fetchTaxes, remove, taxesSelector } from '../../Apis/Getters/taxes';

const Tax = () => {

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
    // ADD TAX STATE
    const [tax, setTax] = useState({
        name: '',
        percentage: '',
        status: 1,
    });
    useEffect(() => {
        const token = window.sessionStorage.getItem("access-vs");
        dispatch(fetchTaxes());
    }, [successMsg]);

    // SELECTING ALL TAXES FROM REDUX STATE
    const taxes = useSelector(state => taxesSelector.selectAll(state));

    // CHANGE CUSTOMER POPUP STATE
    const [contentStatus, setContentStatus] = useState(false);
    // CUSTOMER POPUP DETAILS STATE
    const [contentDetails, setContentDetails] = useState({
        name: '',
        percentage: '',
        status: 1,
    });

    // DESTRUCTURING DATA FOR DATA TABLE
    const data = [...taxes];

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
            title: "Percentage (%)",
            key: 'percentage',
            dataIndex: 'percentage',
            sorter: {
                compare: (a, b) => a.percentage - b.percentage,
                multiple: 3,
            },
            ...columnSearchProps('percentage'),
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
                            id: elem._id,
                            name: elem.name,
                            percentage: elem.percentage,
                            status: 1,
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
    const addTax = (e) => {
        e.preventDefault();
        const credentials = { ...tax };

        const response = UpdateData({ url: 'tax/add', cred: credentials });
        response.then(res => {
            // console.log(res.data);

            window.scrollTo(0, 0);
            if (res.data.status) {
                setTax({
                    name: '',
                    percentage: '',
                    status: 1,
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
        const response = UpdateData({ url: 'tax/update', cred: credentials });
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
        const response = DeleteItem({ id: id, url: 'tax/delete' });
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

                        {/* ADD TAX FORM */}
                        <div className="g-4">
                            <div className="card mb-3">
                                <div className="card-body p-md-5">
                                    <h4>Add Tax</h4>
                                    <form onSubmit={addTax}>
                                        <div className="row">
                                            <div className="mb-4 col-12 col-md-6">
                                                <label htmlFor="form-attribute/name" className="form-label">Tax Name</label>
                                                <input type="text" name='name' className="form-control" id="form-attribute/name" value={tax.name} onChange={(e) => setTax({ ...tax, name: e.target.value })} />
                                            </div>
                                            <div className="mb-4 col-12 col-md-6">
                                                <label htmlFor="form-attribute/percentage" className="form-label">Tax Percentage</label>
                                                <input type="number" name='percentage' className="form-control" id="form-attribute/percentage" step='0.1' value={tax.percentage} onChange={(e) => setTax({ ...tax, percentage: e.target.value })} />
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <input type="submit" className="btn btn-outline-primary btn-sm mb-0" value='Save' />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        {/* ROLES LIST */}
                        <div className="card">
                            <div className="card-header pb-0">
                                <div className="row">
                                    <div className="col-lg-6 col-7">
                                        <h6>Taxes List</h6>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body px-0 pb-2">
                                <div className="table-responsive">
                                    {<Datatable data={data} columns={columns} />}
                                </div>
                            </div>
                        </div>

                        {/* VIEW & UPDATE TAX */}
                        {contentStatus && <div className="password-popup">
                            <div className="rts-newsletter-popup popup">
                                <div className="newsletter-close-btn" onClick={() => setContentStatus(!contentStatus)}>
                                    <i className="fa fa-times"></i>
                                </div>
                                <div className="newsletter-inner popup-inner">
                                    <h3 className="newsletter-heading">Tax</h3>
                                    <form onSubmit={updateContent}>
                                        <div className="input-area">
                                            <label>Tax Name</label>
                                            <div className="input-div">
                                                <input name='name' type="text" value={contentDetails.name} placeholder='Name' onChange={(e) => setContentDetails({ ...contentDetails, name: e.target.value })} required />
                                            </div>
                                        </div>
                                        <div className="input-area">
                                            <label>Tax Percentage</label>
                                            <div className="input-div">
                                                <input name='percentage' type="text" value={contentDetails.percentage} placeholder='Percentage' onChange={(e) => setContentDetails({ ...contentDetails, percentage: e.target.value })} required />
                                            </div>
                                        </div>
                                        <button type="submit" className="subscribe-btn">Update <i className="fa fa-long-arrow-right ml--5" aria-hidden="true"></i></button>
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

export default Tax;