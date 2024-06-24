import React, { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { colorsSelector, fetchColors, remove } from '../../Apis/Getters/colors';
import { DeleteItem } from '../../Apis/Setters/DeleteItem';
import { EditColorContext } from '../../Context/EditColorContext';
import useColumnSearchProps from '../../hooks/useColumnSearchProps';
import Datatable from '../DataTableComponent/Datatable';

const ColorsList = () => {

    // Declaring Dispatch Method
    const dispatch = useDispatch()
    const columnSearchProps = useColumnSearchProps();
    useEffect(() => {
        // Dispatching Fetch Method of this Component
        const token = window.sessionStorage.getItem("access-vs");
        dispatch(fetchColors(token));
    }, []);
    // Getting List from Redux State of this Component
    const colors = useSelector(state => colorsSelector.selectAll(state));
    // Using Edit Context Api of this Component
    const [id, setId] = useContext(EditColorContext);
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
    const data = [...colors];    

    // DEFINING DATA TABLE COLUMNS
    const columns = [
        {
            title: "IMAGE",
            key: 'image',
            dataIndex: 'image',
            sorter: {
                compare: (a, b) => a.image - b.image,
                multiple: 3,
            },
            render: (_, elem) => <Link href="#" className="me-4">
                <div className="sa-symbol sa-symbol--shape--rounded sa-symbol--size--lg">
                    <img src={elem.image} width="40" height="40" alt="" />
                </div>
            </Link>
        },
        {
            title: "COLOR",
            key: 'name',
            dataIndex: 'name',
            sorter: {
                compare: (a, b) => a.name - b.name,
                multiple: 3,
            },
            // width: '30%',
            ...columnSearchProps('name'),
        },
        {
            title: "CODE",
            key: 'code',
            dataIndex: 'code',
            sorter: {
                compare: (a, b) => a.code - b.code,
                multiple: 3,
            },
            // width: '30%',
            ...columnSearchProps('code'),
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
            // sortable: false,
            render: elem => <div className=" text-center px-2 py-1">
                <Link className="cursor-pointer" id="dropdownTable" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="fa fa-ellipsis-v text-secondary" aria-hidden="true"></i>
                </Link>
                <ul className="dropdown-menu px-2 py-3 ms-sm-n4 ms-n5" aria-labelledby="dropdownTable" data-popper-placement="bottom-start">
                    <li onClick={() => setId(elem._id)}>
                        <Link className="dropdown-item border-radius-md" to={'/admin/colors/color/' + elem._id}>Edit</Link>
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
        const response = DeleteItem({ id: id, url: 'color/delete' });
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
                                        <h6>Colours List</h6>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body px-0 pb-2">
                                <div className="table-responsive">
                                    {/* {<Table columns={columns} dataSource={data} exportable searchable />} */}
                                    {<Datatable columns={columns} data={data} />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default ColorsList;