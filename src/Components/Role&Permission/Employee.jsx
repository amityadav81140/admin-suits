import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import FileUpload from '../../Apis/Setters/FileUpload';
import { UpdateData } from '../../Apis/Setters/UpdateData';
import UpdateProfile from '../../Apis/Setters/UpdateProfile';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRoles, rolesSelector } from '../../Apis/Getters/roles';
import { employeesSelector, fetchEmployees, remove } from '../../Apis/Getters/employees';
import useColumnSearchProps from '../../hooks/useColumnSearchProps';
import { DeleteItem } from '../../Apis/Setters/DeleteItem';
import Datatable from '../DataTableComponent/Datatable';
import { Link } from 'react-router-dom';

const Employee = () => {

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
    // ADMIN PROFILE SETTINGS INPUT VALUES STATE
    const [employeeDetails, setEmployeeDetails] = useState({
        image: '',
        name: '',
        email: '',
        mobile: '',
        password: '',
        role: '',
        status: 1,
    });
    // CHANGE CUSTOMER POPUP STATE
    const [contentStatus, setContentStatus] = useState(false);
    // CUSTOMER POPUP DETAILS STATE
    const [contentDetails, setContentDetails] = useState({
        image: '',
        name: '',
        email: '',
        mobile: '',
        password: '',
        role: '',
        status: 1,
    });
    // FETCHING USER AUTH TOKEN
    const token = window.sessionStorage.getItem("access-vs");
    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(fetchRoles(token));
        dispatch(fetchEmployees(token));
    }, [successMsg]);
    // SELECTING ALL ROLES FROM REDUX STATE
    const roles = useSelector(state => rolesSelector.selectAll(state)).map(elem => {
        return (
            {
                label: elem.name,
                value: elem._id
            }
        );
    });
    // SELECTING ALL EMPLOYEES FROM REDUX STATE
    const allEmployees = useSelector(state => employeesSelector.selectAll(state))

    // METHOD TO SET ADMIN PROFILE IN EMPLOYEE PROFILE STATE VARIABLE
    const handleEmployee = (e) => {
        const { name, value } = e.target;
        setEmployeeDetails({
            ...employeeDetails,
            [name]: value,
        });
    };

    // METHOD TO SET ROLE IN employeeDetails STATE VARIABLE
    const handleRole = (role) => {
        setEmployeeDetails({
            ...employeeDetails,
            role: role,
        });
    };

    // METHOD TO SET ROLE IN contentDetails STATE VARIABLE
    const updateRole = (role) => {
        setContentDetails({
            ...contentDetails,
            role: role,
        });
    };

    // DESTRUCTURING DATA FOR DATA TABLE
    const data = [...allEmployees];

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
            render: (_, elem) => <Link to="#" className="me-4">
                <div className="sa-symbol sa-symbol--shape--rounded sa-symbol--size--lg">
                    <img src={elem.image} width="40" height="40" alt="" />
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
            title: "ROLE",
            key: 'role',
            dataIndex: 'role',
            sorter: {
                compare: (a, b) => a.role - b.role,
                multiple: 3,
            },
            ...columnSearchProps('role'),
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
                            image: elem.image_id,
                            name: elem.name,
                            email: elem.email,
                            mobile: elem.mobile,
                            password: elem.password,
                            role: elem.role_id,
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

    // STORE IDENTITY FILE UPLOAD METHOD(API CALL)
    const fileUpload = (e) => {
        const response = FileUpload({ file: e.target.files[0], path: 'employees' });
        response.then(res => {
            // console.log(res.data.data._id);
            if (res.data.status) {
                e.target.name == 'updateImage' ?
                setContentDetails({
                    ...contentDetails,
                    image: res.data.data._id,
                })
                :
                setEmployeeDetails({
                    ...employeeDetails,
                    image: res.data.data._id,
                })

            } else {
                setErrMsg({
                    status: true,
                    message: res.data.message,
                });
            }
        })
        .catch((AxiosError) => {
            console.log(AxiosError.response.data.errors);
        });

    };

    // API CALL TO ADD AN EMPLOYEE
    const addEmployee = (e) => {
        e.preventDefault();

        let credentials = { ...employeeDetails };
        // console.log(credentials);
        const response = UpdateData({ url: 'employee/add', cred: credentials });
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
                setEmployeeDetails({
                    image: '',
                    name: '',
                    email: '',
                    mobile: '',
                    password: '',
                    role: '',
                    status: 1,
                });
            } else {
                setErrMsg({
                    status: true,
                    message: res.data.message,
                });
                setSuccessMsg({
                    status: false,
                    message: '',
                });
            }
        }).catch((AxiosError) => {
            console.log(AxiosError.response.data.errors);
        });

    };

    // UPDATE EMPLOYEE DATA API METHOD
    const updateContent = (e) => {
        e.preventDefault();
        const credentials = { ...contentDetails };

        const response = UpdateData({ url: 'employee/update', cred: credentials });
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
        const response = DeleteItem({ id: id, url: 'employee/delete' });
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
                <div className="row g-4">

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

                    {/* ADD EMPLOYEE FORM */}
                    <div className="card mb-3">
                        <div className="card-body p-5">
                            <h5>Employee Identity</h5>
                            <form onSubmit={addEmployee}>
                                <div className="row">
                                    <div className="mb-4 col-md-6">
                                        <label htmlFor="form-settings/profile" className="form-label">Profile picture</label>
                                        <input type="file" name='profilePicture' className="form-control" id="form-settings/profile" onChange={fileUpload} />
                                    </div>
                                    <div className="mb-4 col-md-6">
                                        <label htmlFor="form-settings/name" className="form-label">Name</label>
                                        <input type="text" name='name' className="form-control" id="form-settings/name" onChange={handleEmployee} value={employeeDetails.name} required />
                                    </div>
                                    <div className="mb-4 col-md-6">
                                        <label htmlFor="form-settings/phone" className="form-label">Phone</label>
                                        <input type="tel" name='mobile' className="form-control" id="form-settings/phone" onChange={handleEmployee} value={employeeDetails.mobile} required />
                                    </div>
                                    <div className="mb-4 col-md-6">
                                        <label htmlFor="form-settings/email" className="form-label">Email</label>
                                        <input type="email" name='email' className="form-control" id="form-settings/email" onChange={handleEmployee} value={employeeDetails.email} required />
                                    </div>
                                    <div className="mb-4 col-md-6">
                                        <label htmlFor="form-settings/pass" className="form-label">Password</label>
                                        <input type="password" name='password' className="form-control" id="form-settings/pass" onChange={handleEmployee} value={employeeDetails.password} required />
                                    </div>
                                    <div className="mb-4 col-md-6">
                                        <label className="form-label">
                                            Role :
                                        </label>
                                        <Select
                                            // mode="multiple"
                                            allowClear
                                            style={{ width: '100%' }}
                                            placeholder="Select Role"
                                            // defaultValue={['a10', 'c12']}
                                            onChange={handleRole}
                                            options={roles}
                                            value={employeeDetails.role}
                                        />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <input type="submit" className="btn btn-outline-primary btn-sm mb-0" value='Save' />
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* EMPLOYEES LIST */}
                    <div className="card">
                        <div className="card-header pb-0">
                            <div className="row">
                                <div className="col-lg-6 col-7">
                                    <h6>Employees List</h6>
                                </div>
                            </div>
                        </div>
                        <div className="card-body px-0 pb-2">
                            <div className="table-responsive">
                                {<Datatable data={data} columns={columns} />}
                            </div>
                        </div>
                    </div>

                    {/* VIEW & UPDATE EMPLOYEE DATA */}
                    {contentStatus && <div className="password-popup">
                        <div className="rts-newsletter-popup popup">
                            <div className="newsletter-close-btn" onClick={() => setContentStatus(!contentStatus)}>
                                <i className="fa fa-times"></i>
                            </div>
                            <div className="newsletter-inner popup-inner">
                                <h3 className="newsletter-heading">Employee</h3>
                                <form onSubmit={updateContent}>
                                    <div className="input-area">
                                        <div className="input-div">
                                            <label className="form-label">Profile picture</label>
                                            <input type="file" name='updateImage' className="form-control" onChange={fileUpload} />
                                        </div>
                                        <div className="input-div">
                                            <input name='name' type="text" value={contentDetails.name} placeholder='Name' onChange={(e) => setContentDetails({ ...contentDetails, name: e.target.value })} required />
                                        </div>
                                        <div className="input-div">
                                            <input name='email' type="text" value={contentDetails.email} placeholder='Email' onChange={(e) => setContentDetails({ ...contentDetails, email: e.target.value })} required />
                                        </div>
                                        <div className="input-div">
                                            <input name='phone' type="tel" value={contentDetails.mobile} placeholder='Mobile' onChange={(e) => setContentDetails({ ...contentDetails, mobile: e.target.value })} required />
                                        </div>
                                        <div className="input-div">
                                            <input name='password' type="tel" value={contentDetails.password} placeholder='Mobile' onChange={(e) => setContentDetails({ ...contentDetails, password: e.target.value })} required />
                                        </div>
                                        <div className="input-div">
                                            <label className="form-label">
                                                Role :
                                            </label>
                                            <Select
                                                allowClear
                                                style={{ width: '100%' }}
                                                placeholder="Select Role"
                                                onChange={updateRole}
                                                options={roles}
                                                value={contentDetails.role}
                                            />
                                        </div>
                                        <button type="submit" className="subscribe-btn">Update <i className="fa fa-long-arrow-right ml--5" aria-hidden="true"></i></button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>}
                </div>
            </div>
        </React.Fragment>
    );
};

export default Employee;