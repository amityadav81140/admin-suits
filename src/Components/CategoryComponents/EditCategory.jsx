import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { categoriesSelector } from '../../Apis/Getters/categories';
import FileUpload from '../../Apis/Setters/FileUpload';
import { UpdateData } from '../../Apis/Setters/UpdateData';
import { EditCategoryContext } from '../../Context/EditCategoryContext';

const EditCategory = () => {

    // Using Edit Category Context Api
    const [id, setId] = useContext(EditCategoryContext);
    // Getting Category by Id from Redux State
    const categoryDetails = useSelector(state => categoriesSelector.selectById(state, id));

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
        id: id,
        name: categoryDetails.name,
        // subCategory: '',
        status: categoryDetails.status,
        image: categoryDetails.image_id,
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

        const response = FileUpload({ file: e.target.files[0], path: 'categories' });
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
                    successMsg({
                        status: false,
                        message: '',
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
        const response = UpdateData({ url: 'category/update', cred: credentials });
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
            <form onSubmit={edit}>
                <div className="container-fluid py-5 row">

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
                        {/* Basic Information Card */}
                        <div className="card">
                            <div className="card-body p-md-5">
                                <div className="mb-5">
                                    <h5 className="mb-0 fs-exact-18">Add Category</h5>
                                </div>
                                {/* <form> */}
                                <div className="row">
                                    <div className="mb-4 col-md-6">
                                        <label htmlFor="form-category/categoryImage" className="form-label">Category Image</label>
                                        <input type="file" name='categoryImage' className="form-control" id="form-category/categoryImage"
                                            onChange={fileUpload} />
                                    </div>
                                    <div className="mb-4 col-md-6">
                                        <label htmlFor="form-category/name" className="form-label">
                                            Category Name
                                        </label>
                                        <input
                                            type="text"
                                            name='name'
                                            className="form-control"
                                            id="form-category/name"
                                            value={details.name}
                                            onChange={handleDetails}
                                            required
                                        />
                                    </div>
                                    {/* <div className="mb-4 col-md-4">
                                            <label className="form-check">
                                                <input type="checkbox" className="form-check-input" name="status" onClick={() => setSubCategory(!subCategory)} />
                                                <span className="form-check-label">Has Child</span>
                                            </label>
                                        </div>

                                        {subCategory && <div className="mb-4">
                                            <label htmlFor="form-product/name" className="form-label">
                                                Sub Category Name
                                            </label>
                                            <input type="text" name='subCategory' className="form-control" id="form-product/name" value={details.subCategory} onChange={handleDetails} />
                                        </div>} */}

                                    <div className="mb-4">
                                        <input type="submit" className="btn btn-outline-primary btn-sm mb-0" value="Save" />

                                    </div>
                                </div>
                                {/* </form> */}
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        {/* Visibility Card */}
                        <div className="card w-100">
                            <div className="card-body p-md-5">
                                <div className="mb-5">
                                    <h5 className="mb-0 fs-exact-18">Visibility</h5>
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
            </form>
        </React.Fragment>
    );
};

export default EditCategory;