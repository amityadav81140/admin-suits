import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { bannersSelector, fetchBanners, remove } from '../../Apis/Getters/banners';
import { DeleteItem } from '../../Apis/Setters/DeleteItem';
import { EditBannerContext } from '../../Context/EditBannerContext';

const BannersList = () => {

    // Declaring Dispatch Method
    const dispatch = useDispatch();
    useEffect(() => {
        // Dispatching Fetch Method of this Component
        const token = window.sessionStorage.getItem("access-vs");
        dispatch(fetchBanners(token));
    }, []);
    // Getting List from Redux State of this Component
    const banners = useSelector(state => bannersSelector.selectAll(state));
    // Using Edit Context Api of this Component
    const [id, setId] = useContext(EditBannerContext);
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

    // API CALL METHOD TO DELETE AN ITEM
    const deleteBanner = (id) => {
        
        const response = DeleteItem({id: id, url:'banner/delete'});
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

    // MAPPING THE LIST OF FETCHED ITEMS
    const list = banners.map((elem, index) => {
        return (
            <tr key={index + 1}>
                <td>
                    <div className="d-flex px-2 py-1">
                        <Link to="#" className="">
                            <div className="sa-symbol sa-symbol--shape--rounded sa-symbol--size--lg">
                                <img src={elem.image} className='img-fluid' width="100" height="100" alt={elem.page + ' banner'} />
                            </div>
                        </Link>
                    </div>
                </td>
                <td className="align-middle">
                    <div className=" text-left px-2 py-1">
                        <div className=" text-left">
                            <span className="text-sm">{elem.page}</span>
                        </div>
                    </div>
                </td>
                <td className="align-middle">
                    <div className=" text-left px-2 py-1">
                        <div className=" text-left">
                            <div className="badge bg-primary">{elem.status === "1" ? "Visible" : "Hidden"}</div>
                        </div>
                    </div>
                </td>
                <td className="align-middle">
                    <div className=" text-center px-2 py-1">
                        <Link className="cursor-pointer" id="dropdownTable" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fa fa-ellipsis-v text-secondary" aria-hidden="true"></i>
                        </Link>
                        <ul className="dropdown-menu px-2 py-3 ms-sm-n4 ms-n5" aria-labelledby="dropdownTable" data-popper-placement="bottom-start">
                            <li onClick={() => setId(elem._id)}>
                                <Link className="dropdown-item border-radius-md"
                                    to={"/admin/banners/banner/" + elem._id}
                                >
                                    Edit
                                </Link>
                            </li>
                            <li onClick={() => {
                                dispatch(remove(elem._id));
                                deleteBanner(elem._id);
                            }}>
                                <Link className="dropdown-item border-radius-md" to='#'>Delete</Link>
                            </li>
                        </ul>
                    </div>
                </td>
            </tr >
        )
    });

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
                                        <h6>Categories List</h6>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body px-0 pb-2">
                                <div className="table-responsive">
                                    <table className="table align-items-center mb-0">
                                        <thead>
                                            <tr>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder">
                                                    Banner
                                                </th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder">
                                                    Page
                                                </th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder ps-2">
                                                    Visibility
                                                </th>
                                                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder">
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {/* DISPLAYING THE LIST OF MAPPED ITEMS */}
                                            {list}

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default BannersList;