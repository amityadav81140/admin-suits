import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchTestimonials, remove, testimonialsSelector } from '../../Apis/Getters/testimonials';
import { DeleteItem } from '../../Apis/Setters/DeleteItem';
import FileUpload from '../../Apis/Setters/FileUpload';
import { UpdateData } from '../../Apis/Setters/UpdateData';
import useColumnSearchProps from '../../hooks/useColumnSearchProps';
import Datatable from '../DataTableComponent/Datatable';

const Testimonials = () => {

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
    // ADD testimonials DETAILS STATE
    const [content, setContent] = useState({
        image: '',
        name: '',
        designation: '',
        review: '',
        status: 1,
    });
    // HANDLING ADD TESTIMONIAL DETAILS TO ABOVE STATE
    const handleDetails = (e) => {
        const { name, value } = e.target;
        setContent({
            ...content,
            [name]: value,
        });
    };

    useEffect(() => {
        dispatch(fetchTestimonials());
    }, [successMsg]);

    // SELECTING ALL TESTIMONIALS FROM REDUX STATE
    const testimonials = useSelector(state => testimonialsSelector.selectAll(state));

    // CHANGE TESTIMONIAL POPUP STATE
    const [contentStatus, setContentStatus] = useState(false);
    // TESTIMONIAL POPUP DETAILS STATE
    const [contentDetails, setContentDetails] = useState({
        image: '',
        name: '',
        designation: '',
        review: '',
    });

    // DESTRUCTURING DATA FOR DATA TABLE
    const data = [...testimonials];

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
            render: (_, elem) => <Link href="app-product.html" className="me-4">
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
            title: "DESIGNATION",
            key: 'designation',
            dataIndex: 'designation',
            sorter: {
                compare: (a, b) => a.designation - b.designation,
                multiple: 3,
            },
            ...columnSearchProps('designation'),
        },
        {
            title: "REVIEW",
            key: 'review',
            dataIndex: 'review',
            sorter: {
                compare: (a, b) => a.review - b.review,
                multiple: 3,
            },
            ...columnSearchProps('review'),
            render: (_, elem) => <span>{elem.review.slice(0, 25)}...</span>
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
                            designation: elem.designation,
                            review: elem.review,
                            status: 1,
                        })
                    }}>
                        <Link className="dropdown-item border-radius-md" to='#'>View</Link>
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

    // FILE UPLOAD METHOD(API CALL)
    const fileUpload = (e) => {
        const response = FileUpload({ file: e.target.files[0], path: 'testimonials' });
        response.then(res => {
            // console.log(res.data.data._id);
            if (res.data.status) {
                if (e.target.name == 'update_image') {
                    setContentDetails({
                        ...contentDetails,
                        image: res.data.data._id,
                    });
                } else {
                    setContent({
                        ...content,
                        image: res.data.data._id,
                    });
                }
            } else {
                setErrMsg({
                    status: true,
                    message: res.data.message,
                });
            }
        }).catch((AxiosError) => {
            console.log(AxiosError.response.data.errors);
        });
    };

    // ADD testimonials API METHOD
    const addContent = (e) => {
        e.preventDefault();
        const credentials = { ...content };
        const response = UpdateData({ url: '/admin/testimonial/add', cred: credentials });
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

    // UPDATE testimonials API METHOD
    const updateContent = (e) => {
        e.preventDefault();
        const credentials = { ...contentDetails };

        const response = UpdateData({ url: 'testimonial/update', cred: credentials });
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

    // API CALL METHOD TO DELETE AN ITEM
    const deleteItem = (id) => {
        const response = DeleteItem({ id: id, url: 'testimonial/delete' });
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
                        {/* ADD TESTIMONIAL FORM */}
                        <div className="g-4">
                            <div className="card mb-3">
                                <div className="card-body p-md-5">
                                    <h4>Add Testimonial</h4>
                                    <form onSubmit={addContent}>
                                        <div className="row">
                                            <div className="mb-4">
                                                <label htmlFor="form-testimonials/image" className="form-label">Image</label>
                                                <input type="file" name='image' className="form-control" id="form-testimonials/image" onChange={fileUpload} />
                                            </div>
                                            <div className="mb-4 col-md-6">
                                                <label htmlFor="form-testimonials/name" className="form-label">Name</label>
                                                <input type="text" name='name' className="form-control" id="form-testimonials/name" value={content.name} onChange={handleDetails} />
                                            </div>
                                            <div className="mb-4 col-md-6">
                                                <label htmlFor="form-testimonials/designation" className="form-label">Designation</label>
                                                <input type="text" name='designation' className="form-control" id="form-testimonials/designation" value={content.designation} onChange={handleDetails} />
                                            </div>
                                            <div className="mb-4">
                                                <label htmlFor="form-testimonials/answer" className="form-label">Review</label>
                                                <textarea name='review' rows='5' className="form-control" id="form-testimonials/answer" value={content.review} onChange={handleDetails}>
                                                </textarea>
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <input type="submit" className="btn btn-outline-primary btn-sm mb-0" value='Save' />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        {/* TESTIMONIALS LIST */}
                        <div className="card">
                            <div className="card-header pb-0">
                                <div className="row">
                                    <div className="col-lg-6 col-7">
                                        <h6>Testimonials List</h6>
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

            {/* VIEW & UPDATE TESTIMONIAL */}
            {contentStatus && <div className="password-popup">
                <div className="rts-newsletter-popup popup">
                    <div className="newsletter-close-btn" onClick={() => setContentStatus(!contentStatus)}>
                        <i className="fa fa-times"></i>
                    </div>
                    <div className="newsletter-inner popup-inner">
                        <h3 className="newsletter-heading">Testimonial</h3>
                        <form onSubmit={updateContent}>
                            <div className="input-area">
                                <div className="input-div">
                                    <input name='update_image' type="file" placeholder='Image' onChange={fileUpload} />
                                </div>
                                <div className="input-div">
                                    <input name='name' type="text" value={contentDetails.name} placeholder='Name' onChange={(e) => setContentDetails({ ...contentDetails, name: e.target.value })} required />
                                </div>
                                <div className="input-div">
                                    <input name='designation' type="text" value={contentDetails.designation} placeholder='Designation' onChange={(e) => setContentDetails({ ...contentDetails, designation: e.target.value })} required />
                                </div>
                                <div className="input-div">
                                    <textarea name='review' rows={5} value={contentDetails.review} placeholder='Review' onChange={(e) => setContentDetails({ ...contentDetails, review: e.target.value })} required></textarea>
                                </div>
                                <button type="submit" className="subscribe-btn">Update <i class="fa fa-long-arrow-right ml--5" aria-hidden="true"></i></button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>}
        </React.Fragment>
    );
};

export default Testimonials;