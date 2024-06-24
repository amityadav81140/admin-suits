import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { DeleteItem } from '../../Apis/Setters/DeleteItem';
import { UpdateData } from '../../Apis/Setters/UpdateData';
import useColumnSearchProps from '../../hooks/useColumnSearchProps';
import Datatable from '../DataTableComponent/Datatable';
import { fetchRoles, rolesSelector, remove } from '../../Apis/Getters/roles';
import { useContext } from 'react';
import { RolePermissionContext } from '../../Context/RolePermissionContext';

const Role = () => {

    // USING DISPACHER HOOK
    const dispatch = useDispatch();
    // Declaring ColumnSearchProps Method
    const columnSearchProps = useColumnSearchProps();
    // USING ROLE PERMISSION CONTEXT
    const [id, setId] = useContext(RolePermissionContext);
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
    // ADD ROLE STATE
    const [role, setRole] = useState({
        name: '',
        status: 1,
    });
    useEffect(() => {
        const token = window.sessionStorage.getItem("access-vs");
        dispatch(fetchRoles(token));
    }, [successMsg]);

    // SELECTING ALL ROLES FROM REDUX STATE
    const roles = useSelector(state => rolesSelector.selectAll(state));

    // CHANGE CUSTOMER POPUP STATE
    const [contentStatus, setContentStatus] = useState(false);
    // CUSTOMER POPUP DETAILS STATE
    const [contentDetails, setContentDetails] = useState({
        name: '',
        status: 1,
    });

    // DESTRUCTURING DATA FOR DATA TABLE
    const data = [...roles];

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
            title: "ACTION",
            key: "action",
            render: elem => <div className=" text-center px-2 py-1">
                <Link className="cursor-pointer" id="dropdownTable" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="fa fa-ellipsis-v text-secondary" aria-hidden="true"></i>
                </Link>
                <ul className="dropdown-menu px-2 py-3 ms-sm-n4 ms-n5" aria-labelledby="dropdownTable" data-popper-placement="bottom-start">
                    <li onClick={() => { setId(elem._id); }}>
                        <Link className="dropdown-item border-radius-md" to='/admin/role-permission'>Prmissions</Link>
                    </li>
                    <li onClick={() => {
                        setContentStatus(!contentStatus);
                        setContentDetails({
                            id: elem._id,
                            name: elem.name,
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
    const addRole = (e) => {
        e.preventDefault();
        const credentials = { ...role };

        const response = UpdateData({ url: 'role/add', cred: credentials });
        response.then(res => {
            // console.log(res.data);

            window.scrollTo(0, 0);
            if (res.data.status) {
                setRole({
                    name: '',
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
        // console.log(credentials)
        const response = UpdateData({ url: 'role/update', cred: credentials });
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
        const response = DeleteItem({ id: id, url: 'role/delete' });
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

                        {/* ADD ROLE FORM */}
                        <div className="g-4">
                            <div className="card mb-3">
                                <div className="card-body p-md-5">
                                    <h4>Add Role</h4>
                                    <form onSubmit={addRole}>
                                        <div className="row">
                                            <div className="mb-4 col-12">
                                                <label htmlFor="form-attribute/name" className="form-label">Role</label>
                                                <input type="text" name='name' className="form-control" id="form-attribute/name" value={role.name} onChange={(e) => setRole({ ...role, name: e.target.value })} />
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
                                        <h6>Roles List</h6>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body px-0 pb-2">
                                <div className="table-responsive">
                                    {<Datatable data={data} columns={columns} />}
                                </div>
                            </div>
                        </div>

                        {/* VIEW & UPDATE ROLE */}
                        {contentStatus && <div className="password-popup">
                            <div className="rts-newsletter-popup popup">
                                <div className="newsletter-close-btn" onClick={() => setContentStatus(!contentStatus)}>
                                    <i className="fa fa-times"></i>
                                </div>
                                <div className="newsletter-inner popup-inner">
                                    <h3 className="newsletter-heading">Attribute</h3>
                                    <form onSubmit={updateContent}>
                                        <div className="input-area">
                                            <label>Role</label>
                                            <div className="input-div">
                                                <input name='name' type="text" value={contentDetails.name} placeholder='Name' onChange={(e) => setContentDetails({ ...contentDetails, name: e.target.value })} required />
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

export default Role;