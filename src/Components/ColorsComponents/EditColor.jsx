import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { colorsSelector } from '../../Apis/Getters/colors';
import FileUpload from '../../Apis/Setters/FileUpload';
import { UpdateData } from '../../Apis/Setters/UpdateData';
import { EditColorContext } from '../../Context/EditColorContext';

const EditColor = () => {
  
    // Using Edit Context Api
    const [id, setId] = useContext(EditColorContext);
    // Getting Details by Id from Redux State
    const colorDetails = useSelector(state => colorsSelector.selectById(state, id));

    // ADD ERROR MESSAGE STATE
    const [errMsg, setErrMsg] = useState({
        status: false,
        message: '',
    });
    // ADD SUCCESS MESSAGE STATE
    const [successMsg, setSuccessMsg] = useState({
        status: false,
        message: '',
    });

    // DETAILS STATE
    const [details, setDetails] = useState({
        name: colorDetails.name,
        code: colorDetails.code,
        image: colorDetails.image_id,
        status: colorDetails.status,
        id: id,
    });

    // SETTING DETAILS TO STATE VARIABLE
    const handleDetails = (e) => {

        const { name, value } = e.target

        setDetails({
            ...details,
            [name]: value,
        });
    };

    // FILE UPLOAD METHOD(API CALL)
    const fileUpload = (e) => {
        const response = FileUpload({ file: e.target.files[0], path: 'colours' });
        response.then(res => {
                if (res.data.status) {

                    setDetails({
                        ...details,
                        image: res.data.data._id,
                    });

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

    // ADD API CALL
    const edit = (e) => {
        e.preventDefault();

        const credentials = { ...details };
        const response = UpdateData({ url: 'color/update', cred: credentials });
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
        <form onSubmit={edit}>
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

                        <div className="col-md-8 mb-5">
                            <div className="card mb-3">
                                <div className="card-body p-5">
                                    <h5>Edit Colour</h5>
                                    <div className="row">
                                        <div className="mb-4 col-md-6">
                                            <label htmlFor="form-colour/colorImage" className="form-label">Colour Image</label>
                                            <input type="file" name='colorImage' className="form-control" id="form-colour/colorImage"
                                                onChange={fileUpload} />
                                        </div>
                                        <div className="mb-4 col-md-6">
                                            <label htmlFor="form-colour/name" className="form-label">Colour Name</label>
                                            <input type="text" name='name' className="form-control" id="form-colour/instagram" value={details.name} onChange={handleDetails} required />
                                        </div>
                                        <div className="mb-4 col-md-6">
                                            <label htmlFor="form-colour/code" className="form-label">Colour Code</label>
                                            <input type="text" name='code' className="form-control" id="form-colour/code" value={details.code} onChange={handleDetails} required />
                                        </div>
                                        <div className="mb-4">
                                            <input type="submit" className="btn btn-outline-primary btn-sm mb-0" value='Save' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            {/* Visibility Card */}
                            <div className="card w-100">
                                <div className="card-body p-md-5">
                                    <div className="mb-5">
                                        <h2 className="mb-0 fs-exact-18">Visibility</h2>
                                    </div>
                                    <div className="mb-4">
                                        <label className="form-check">
                                            <input type="radio" className="form-check-input" name="status" onChange={handleDetails} value={1} required />
                                            <span className="form-check-label">Active</span>
                                        </label>
                                        <label className="form-check mb-0">
                                            <input type="radio" className="form-check-input" name="status" onChange={handleDetails} value={0} required />
                                            <span className="form-check-label">Inactive</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </form>
    </React.Fragment>
  );
};

export default EditColor;