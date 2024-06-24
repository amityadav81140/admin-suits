import React, { useState } from 'react';
import { UpdateData } from '../../Apis/Setters/UpdateData';

const Navbar = () => {

    // SETTINGS ERROR STATE
    const [settingsErr, setSettingsErr] = useState({
        status: false,
        message: '',
    });
    // SETTINGS Success STATE
    const [settingsSuccess, setSettingsSuccess] = useState({
        status: false,
        message: '',
    });

    // SOCIAL LINKS SETTINGS INPUT VALUES STATE
    const [links, setLinks] = useState({
        link1Name: '',
        link2Name: '',
        link3Name: '',
    });

    // METHOD TO SET SOCIAL LINKS CREDENTIALS IN socialLinks STATE VARIABLE
    const handleLinks = (e) => {
        const { name, value } = e.target;
        setLinks({
            ...links,
            [name]: value,
        });
    };

    const update = e => {
        e.preventDefault();
        const credentials = {
            'type': 'navbar',
            'value': [{ ...links }],
        };
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
    }
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
                            <h5>Navbar Links Settings</h5>
                            <form onSubmit={update} name='storeSocialLinks'>
                                <div className="row">
                                    <div className="mb-4 col-12">
                                        <label htmlFor="form-settings/facebook" className="form-label">Link1</label>
                                        <input type="text" name='link1Name' className="form-control" id="form-settings/facebook" value={links.link1Name} onChange={handleLinks} required />
                                    </div>
                                    <div className="mb-4 col-12">
                                        <label htmlFor="form-settings/facebook" className="form-label">Link2</label>
                                        <input type="text" name='link2Name' className="form-control" id="form-settings/facebook" value={links.link2Name} onChange={handleLinks} required />
                                    </div>
                                    <div className="mb-4 col-12">
                                        <label htmlFor="form-settings/facebook" className="form-label">Link3</label>
                                        <input type="text" name='link3Name' className="form-control" id="form-settings/facebook" value={links.link3Name} onChange={handleLinks} required />
                                    </div>

                                    <div className="mb-4">
                                        <input type="submit" className="btn btn-outline-primary btn-sm mb-0" value='Save' />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Navbar;