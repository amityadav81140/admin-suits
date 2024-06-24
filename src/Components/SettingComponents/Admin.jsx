import React, { useEffect, useState } from 'react';
import FileUpload from '../../Apis/Setters/FileUpload';
import { UpdateData } from '../../Apis/Setters/UpdateData';
import UpdateProfile from '../../Apis/Setters/UpdateProfile';

const Admin = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // ADMIN PROFILE ERROR MESSAGE STATE
    const [settingsErr, setSettingsErr] = useState({
        status: false,
        message: '',
    });
    // ADMIN PROFILE SUCCESS MESSAGE STATE
    const [settingsSuccess, setSettingsSuccess] = useState({
        status: false,
        message: '',
    });

    // ADMIN PROFILE SETTINGS INPUT VALUES STATE
    const [adminProfile, setAdminProfile] = useState({
        profilePicture: '',
        adminName: '',
        adminPhone: '',
        adminEmail: '',
    });

    // METHOD TO SET ADMIN PROFILE IN adminProfile STATE VARIABLE
    const handleProfile = (e) => {
        const { name, value } = e.target;
        setAdminProfile({
            ...adminProfile,
            [name]: value,
        });
    };

    // ADMIN PASSWORD SETTINGS INPUT VALUES STATE
    const [adminPass, setAdminPass] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });


    // METHOD TO SET ADMIN PASSWORD CREDENTIALS IN adminProfile STATE VARIABLE
    const handleCredentials = (e) => {
        const { name, value } = e.target;
        setAdminPass({
            ...adminPass,
            [name]: value,
        });
    };

    // STORE IDENTITY FILE UPLOAD METHOD(API CALL)
    const fileUpload = (e) => {
        const response = FileUpload({ file: e.target.files[0], path: 'admin' });
        response.then(res => {
            // console.log(res.data.data._id);
            if (res.data.status) {
                setAdminProfile({
                    ...adminProfile,
                    profilePicture: res.data.data._id,
                });
            } else {
                setSettingsErr({
                    status: true,
                    message: res.data.message,
                });
            }
        })
            .catch((AxiosError) => {
                console.log(AxiosError.response.data.errors);
            });

    };

    // PROFILE SETTINGS HANDLING METHOD(API CALL)
    const profile = (e) => {
        e.preventDefault();

        let credentials = {
            'type': 'adminProfile',
            'value': [{ ...adminProfile }],
        }

        const response = UpdateData({ url: 'business_settings_save', cred: credentials });
        response.then(res => {
            window.scrollTo(0, 0);
            if (res.data.status) {
                setSettingsSuccess({
                    status: true,
                    message: res.data.message,
                });
                setSettingsErr({
                    status: false,
                    message: '',
                });
            } else {
                setSettingsErr({
                    status: true,
                    message: res.data.message,
                });
                setSettingsSuccess({
                    status: false,
                    message: '',
                });
            }
        }).catch((AxiosError) => {
            console.log(AxiosError.response.data.errors);
        });

    };


    // ADMIN PANEL PASSWORD UPDATE HANDLING METHOD(API CALL)
    const updatePass = (e) => {
        e.preventDefault();

        let credentials = { ...adminPass }

        const response = UpdateProfile({ url: 'change_password', cred: credentials });
        response.then(res => {
            setAdminPass({
                oldPassword: '',
                newPassword: '',
                confirmPassword: '',
            });
            window.scrollTo(0, 0);
            if (res.data.status) {
                setSettingsSuccess({
                    status: true,
                    message: res.data.message,
                });
            } else {
                setSettingsErr({
                    status: true,
                    message: res.data.message,
                });
            }
        }).catch((AxiosError) => {
            console.log(AxiosError.response.data.errors);
        });

    };

    return (
        <React.Fragment>
            <div className="container-fluid py-4">
                <div className="row g-4">

                    {/* DISPLAY ERROR MESSAGE */}
                    {settingsErr.status &&
                        <div className="alert alert-danger alert-dismissible fade show text-white" role="alert">{settingsErr.message}<button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => {
                            setSettingsErr({
                                status: false,
                                message: '',
                            });
                        }}></button>
                        </div>
                    }

                    {/* DISPLAY SUCCESS MESSAGE */}
                    {settingsSuccess.status &&
                        <div className="alert alert-success alert-dismissible fade show text-white" role="alert">{settingsSuccess.message}<button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => {
                            setSettingsSuccess({
                                status: false,
                                message: '',
                            });
                        }}></button>
                        </div>
                    }

                    <div className="card mb-3">
                        <div className="card-body p-5">
                            <h5>Admin Identity Settings</h5>
                            <form onSubmit={profile}>
                                <div className="row">
                                    <div className="mb-4 col-md-6">
                                        <label htmlFor="form-settings/profile" className="form-label">Profile picture</label>
                                        <input type="file" name='profilePicture' className="form-control" id="form-settings/profile" onChange={fileUpload} />
                                    </div>
                                    <div className="mb-4 col-md-6">
                                        <label htmlFor="form-settings/name" className="form-label">Name</label>
                                        <input type="text" name='adminName' className="form-control" id="form-settings/name" onChange={handleProfile} value={adminProfile.adminName} required />
                                    </div>
                                    <div className="mb-4 col-md-6">
                                        <label htmlFor="form-settings/phone" className="form-label">Phone</label>
                                        <input type="tel" name='adminPhone' className="form-control" id="form-settings/phone" onChange={handleProfile} value={adminProfile.adminPhone} required />
                                    </div>
                                    <div className="mb-4 col-md-6">
                                        <label htmlFor="form-settings/email" className="form-label">Email</label>
                                        <input type="email" name='adminEmail' className="form-control" id="form-settings/email" onChange={handleProfile} value={adminProfile.adminEmail} required />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <input type="submit" className="btn btn-outline-primary btn-sm mb-0" value='Save' />
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="card mb-3">
                        <div className="card-body p-5">
                            <h5>Update Password</h5>
                            <form onSubmit={updatePass}>
                                <div className="row">
                                    <div className="mb-4 col-md-6">
                                        <label htmlFor="form-settings/opass" className="form-label">Old Password</label>
                                        <input type="password" name='oldPassword' className="form-control" id="form-settings/opass" onChange={handleCredentials} value={adminPass.oldPassword} required />
                                    </div>
                                    <div className="mb-4 col-md-6">
                                        <label htmlFor="form-settings/npass" className="form-label">New Password</label>
                                        <input type="password" name='newPassword' className="form-control" id="form-settings/npass" onChange={handleCredentials} value={adminPass.newPassword} required />
                                    </div>
                                    <div className="mb-4 col-md-6">
                                        <label htmlFor="form-settings/cpass" className="form-label">Confirm New Password</label>
                                        <input type="password" name='confirmPassword' className="form-control" id="form-settings/cpass" onChange={handleCredentials} value={adminPass.confirmPassword} required />
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
        </React.Fragment>
    );
};

export default Admin;