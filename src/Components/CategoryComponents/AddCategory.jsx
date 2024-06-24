import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { categoriesSelector, fetchCategories } from '../../Apis/Getters/categories';
import FileUpload from '../../Apis/Setters/FileUpload';
import { UpdateData } from '../../Apis/Setters/UpdateData';

const AddCategory = () => {
    // Declaring Dispatch Method
    const dispatch = useDispatch()
    useEffect(() => {
        // Dispatching Fetch Method of this Component
        const token = window.sessionStorage.getItem("access-vs");
        dispatch(fetchCategories(token));
    }, []);

    // GETTING ALL CATEGORIES
    const categories = useSelector(state => categoriesSelector.selectAll(state));
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

    // const [subCategory, setSubCategory] = useState(false);

    // CATEGORY VALUE STATE
    const [details, setDetails] = useState({
        name: '',
        parent_id: 0,
        status: 0,
        image: '',
    });

    // SETTING VALUE TO STATE VARIABLE
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

    // ADD CATEGORY API CALL
    const category = (e) => {
        e.preventDefault();

        const credentials = { ...details };

        const response = UpdateData({ url: 'category/add', cred: credentials });
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
            <form onSubmit={category}>
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

                                    <div className="mb-4">
                                        <input type="submit" className="btn btn-outline-primary btn-sm mb-0" value="Save" />

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="row">
                            {/* Category Card */}
                            <div className="card w-100">
                                <div className="card-body p-md-5">
                                    <div className="mb-5">
                                        <h5 className="mb-0 fs-exact-18">Category</h5>
                                    </div>
                                    {/* <div className="mb-4">
                                        <label className="form-check">
                                            <input type="checkbox" className="form-check-input" name="status" onClick={() => setSubCategory(!subCategory)} />
                                            <span className="form-check-label">Child Category</span>
                                        </label>
                                    </div> */}

                                    {/* {subCategory && <React.Fragment> */}
                                    <div className="mb-3">
                                        <h6 className="mb-0 fs-exact-18">Select Parent</h6>
                                    </div>
                                    <div className="row">
                                        <select className="sa-select2 form-select select2-hidden-accessible mb-4" name="parent_id" multiple="" data-select2-id="1" tabIndex="-1" aria-hidden="true" onChange={handleDetails} required>
                                            <option defaultValue={null}>Select Parent Category</option>
                                            {categories.map((cat, index) => {
                                                return <option key={index + 1} value={cat._id}>{cat.name}</option>;
                                            })}
                                        </select>

                                    </div>
                                    {/* </React.Fragment>} */}
                                </div>
                            </div>

                            {/* Visibility Card */}
                            <div className="card w-100 mt-5">
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
                </div>
            </form>
        </React.Fragment>
    );
};

export default AddCategory;