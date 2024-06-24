import React, { useContext, useEffect, useState } from 'react';
import { Select, Cascader } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateData } from '../../Apis/Setters/UpdateData';
import { fetchRoles, rolesSelector } from '../../Apis/Getters/roles';
import { fetchMenus, menusSelector } from '../../Apis/Getters/menus';
import { RolePermissionContext } from '../../Context/RolePermissionContext';
import axios from 'axios';

const RolePermission = () => {

    // USING DISPACHER HOOK
    const dispatch = useDispatch();
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
    // ADD ROLE & PERMISSIONS STATE
    const [rolePermission, setRolePermission] = useState({
        role_id: id,
        menus: [
            // ['63c54e844712df798b11d0cc'],
            // ['63c62ed47659421c440fb912', '63c62f237659421c440fb916'],
            // ['63c62ed47659421c440fb912', '63c65c1584b5e663d8ed1dbd']
        ],
        status: 1,
    });
    // FETCHING USER AUTH TOKEN
    const token = window.sessionStorage.getItem("access-vs");
    useEffect(() => {
        dispatch(fetchRoles(token));
        dispatch(fetchMenus(token));
        fetchPermissions(id)
    }, []);

    const { SHOW_CHILD } = Cascader;
    // SELECTING ALL ROLES FROM REDUX STATE
    const roles = useSelector(state => rolesSelector.selectAll(state)).map(elem => {
        return (
            {
                label: elem.name,
                value: elem._id
            }
        );
    });
    // SELECTING ALL MENUS FROM REDUX STATE
    const menus = useSelector(state => menusSelector.selectAll(state)).map(menu => {
        return (
            {
                label: menu.name,
                value: menu._id,
                children: menu.submenus.length ? menu.submenus.map(subMenu => {
                    return (
                        {
                            label: subMenu.name,
                            value: subMenu._id,
                            children: subMenu.submenus.length ? subMenu.submenus.map(subSubMenu => {
                                {
                                    return (
                                        {
                                            label: subSubMenu.name,
                                            value: subSubMenu._id,
                                        }
                                    );
                                }
                            }) : []
                        }
                    );
                }) : []
            }
        );
    });

    // ROLE INPUT HANDLING
    const handleRole = (value) => {
        setRolePermission({
            ...rolePermission,
            role_id: value,
        });
    };

    // PERMISSION INPUT HANDLING
    const handlePermissions = (value) => {
        setRolePermission({
            ...rolePermission,
            menus: value,
        });
    };

    // API CALL TO FETCH PERMISSIONS
    const fetchPermissions = (id) => {
        axios.post(`${process.env.REACT_APP_BASE_URL}admin/permission/get`,
            { role_id: id },
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                withCredentials: true,
            },
        ).then(res => {
            setRolePermission({
                ...rolePermission,
                menus: res.data.data.menus
            })
        }).catch(err => {
            console.log(err);
        })
    }

    // API CALL TO ADD/UPDATE AN ITEM
    const setPermissions = (e) => {
        e.preventDefault();
        const credentials = { ...rolePermission };

        const response = UpdateData({ url: 'permission/set', cred: credentials });
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

                        {/* ADD PERMISSION FORM */}
                        <div className="g-4">
                            <div className="card mb-3">
                                <div className="card-body p-md-5">
                                    <h4>Add Permissions</h4>
                                    <form onSubmit={setPermissions}>
                                        <div className="row">
                                            <div className="mb-4 col-md-6">
                                                <label className="form-label">
                                                    Roles :
                                                </label>
                                                <Select
                                                    // mode="multiple"
                                                    allowClear
                                                    style={{ width: '100%' }}
                                                    placeholder="Select Role"
                                                    onChange={handleRole}
                                                    options={roles}
                                                    value={rolePermission.role_id}
                                                />
                                            </div>
                                            <div className="mb-4 col-md-6">
                                                <label className="form-label">
                                                    Permissions :
                                                </label>
                                                <Cascader
                                                    multiple
                                                    style={{ width: '100%', }}
                                                    placeholder="Select Permissions"
                                                    maxTagCount="responsive"
                                                    options={menus}
                                                    showCheckedStrategy={SHOW_CHILD}
                                                    onChange={handlePermissions}
                                                    value={rolePermission.menus}
                                                />
                                            </div>

                                        </div>
                                        <div className="mb-4">
                                            <input type="submit" className="btn btn-outline-primary btn-sm mb-0" value='Save' />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default RolePermission;