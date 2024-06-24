import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { categoriesSelector, fetchCategories, remove } from '../../Apis/Getters/categories';
// import { EditCategoryContext } from '../../Context/EditCategoryContext';
import { SubcategoryContext } from '../../Context/SubcategoryContext';

const CategoriesList = () => {

    // Declaring Dispatch Method
    const dispatch = useDispatch();
    useEffect(() => {
        // Dispatching Fetch Method of this Component
        const token = window.sessionStorage.getItem("access-vs");
        dispatch(fetchCategories(token));
    }, []);
    // Getting List from Redux State of this Component
    const categories = useSelector(state => categoriesSelector.selectAll(state));

    // Using Edit Context Api of this Component
    // const [id, setId] = useContext(EditCategoryContext);

    // Using Subcategory Context Api of this Component
    const [subcategory, setSubcategory] = useContext(SubcategoryContext);
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
    // const deleteCategory = (id) => {
    //     const credentials = { id: id };
    //     const token = window.sessionStorage.getItem("access-vs");
    //     // console.log(credentials);

    //     axios.post(
    //         "http://localhost:3001/admin/category/delete",
    //         credentials,
    //         {
    //             headers: {
    //                 'Authorization': `Bearer ${token}`,
    //             },
    //             withCredentials: true,
    //         },
    //     ).then(res => {
    //         // console.log(res.data);

    //         window.scrollTo(0, 0);
    //         if (res.data.status) {
    //             setSuccessMsg({
    //                 status: true,
    //                 message: res.data.message,
    //             });
    //             setErrMsg({
    //                 status: false,
    //                 message: '',
    //             });
    //         } else {
    //             setSuccessMsg({
    //                 status: false,
    //                 message: '',
    //             });
    //             setErrMsg({
    //                 status: true,
    //                 message: res.data.message,
    //             });
    //         }

    //     }).catch(AxiosError => console.log(AxiosError.response.data.errors));
    // }

    // MAPPING THE LIST OF FETCHED ITEMS
    let list = categories.map((elem, index) => {
        return (
            <tr key={index + 1}>
                <td>
                    <div className="d-flex px-2 py-1">
                        <Link to="#" className="me-4">
                            <div className="sa-symbol sa-symbol--shape--rounded sa-symbol--size--lg">
                                <img src={elem.image} className='avatar avatar-sm me-3' width="40" height="40" alt="" />
                            </div>
                        </Link>
                        <div className="d-flex flex-column justify-content-center">
                            <h6 className="mb-0 text-sm">
                                <Link to='#'>{elem.name}</Link>
                            </h6>
                        </div>
                    </div>
                </td>
                <td className="align-middle">
                    <div className=" text-left px-2 py-1">
                        <div className=" text-left">
                            <span className="text-sm">10</span>
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
                            <li onClick={() => setSubcategory(elem._id)}>
                                <Link className="dropdown-item border-radius-md"
                                    to={"/admin/categories/subcategories"}
                                >
                                    View Subcategories
                                </Link>
                            </li>
                            {/* <li onClick={() => setId(elem._id)}>
                                <Link className="dropdown-item border-radius-md"
                                    to={"/admin/categories/category/" + elem._id}
                                >
                                    Edit
                                </Link>
                            </li>
                            <li onClick={() => {
                                dispatch(remove(elem._id));
                                deleteCategory(elem._id);
                            }}>
                                <Link className="dropdown-item border-radius-md" to='#'>Delete</Link>
                            </li> */}
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
                                                    Category Name
                                                </th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder">
                                                    Items
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

export default CategoriesList;