import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { currencySelector, fetchCurrency, remove } from '../../Apis/Getters/currency';
import { DeleteItem } from '../../Apis/Setters/DeleteItem';
import { EditCurrencyContext } from '../../Context/EditCurrencyContext';
import useColumnSearchProps from '../../hooks/useColumnSearchProps';
import Datatable from '../DataTableComponent/Datatable';

const CurrencyList = () => {

    // Declaring Dispatch Method
    const dispatch = useDispatch();
    // Declaring ColumnSearchProps Method
    const columnSearchProps = useColumnSearchProps();
    useEffect(() => {
        const token = window.sessionStorage.getItem("access-vs");
        dispatch(fetchCurrency(token));
    }, []);
    // Getting List from Redux State of this Component
    const currency = useSelector(state => currencySelector.selectAll(state));
    // Using Edit Context Api of this Component
    const [id, setId] = useContext(EditCurrencyContext);

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


    // DESTRUCTURING DATA FOR DATA TABLE
    const data = [...currency];

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
            title: "SYMBOL",
            key: 'symbol',
            dataIndex: 'symbol',
            sorter: {
                compare: (a, b) => a.symbol - b.symbol,
                multiple: 3,
            },
            ...columnSearchProps('symbol'),
            render: (_,elem) => <span className="text-sm"
                dangerouslySetInnerHTML={{ __html: elem.symbol }}
            ></span>
        },
        {
            title: "COUNTRY",
            key: 'code',
            dataIndex: 'code',
            sorter: {
                compare: (a, b) => a.code - b.code,
                multiple: 3,
            },
            ...columnSearchProps('code'),
            render: (_, elem) => <span className="text-sm">{elem.code}</span>
        },
        {
            title: "EXCHANGE RATE",
            key: 'exchange_rate',
            dataIndex: 'exchange_rate',
            sorter: {
                compare: (a, b) => a.exchange_rate - b.exchange_rate,
                multiple: 3,
            },
            ...columnSearchProps('exchange_rate'),
            render: (_, elem) => <span className="text-sm">{elem.exchange_rate}</span>
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
                    <div className="badge bg-primary">{elem.status === "1" ? "Default" : "Not Default"}</div>
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
                    <li onClick={() => setId(elem._id)}>
                        <Link className="dropdown-item border-radius-md" to={'/admin/currencies/currency/' + elem._id}>Edit</Link>
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
        const response = DeleteItem({ id: id, url: 'currency/delete' });
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
                                        <h6>Currency List</h6>
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

export default CurrencyList;