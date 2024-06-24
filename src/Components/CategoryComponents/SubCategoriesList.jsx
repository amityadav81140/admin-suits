import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { categoriesSelector, fetchCategories, remove } from '../../Apis/Getters/categories';
import { DeleteItem } from '../../Apis/Setters/DeleteItem';
import { EditCategoryContext } from '../../Context/EditCategoryContext';
import { SubcategoryContext } from '../../Context/SubcategoryContext';
import useColumnSearchProps from '../../hooks/useColumnSearchProps';
import Datatable from '../DataTableComponent/Datatable';

const SubCategoriesList = () => {

    // Declaring Dispatch Method
    const dispatch = useDispatch();
    // Declaring ColumnSearchProps Method
    const columnSearchProps = useColumnSearchProps();
    const [subcategory, setSubcategory] = useContext(SubcategoryContext);
    useEffect(() => {
        // Dispatching Fetch Method of this Component
        const token = window.sessionStorage.getItem("access-vs");
        dispatch(fetchCategories({ token, subcategory }));
    }, []);
    // Getting List from Redux State of this Component
    const subCategories = useSelector(state => categoriesSelector.selectAll(state));
    // Using Edit Context Api of this Component
    const [id, setId] = useContext(EditCategoryContext);
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

    // DESTRUCTURING DATA FOR DATA TABLE
    const data = [...subCategories];

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
            title: "CATEGORY",
            key: 'name',
            dataIndex: 'name',
            sorter: {
                compare: (a, b) => a.name - b.name,
                multiple: 3,
            },
            ...columnSearchProps('name'),
        },
        {
            title: "ITEMS",
            key: 'items',
            dataIndex: 'items',
            sorter: {
                compare: (a, b) => a.items - b.items,
                multiple: 3,
            },
            ...columnSearchProps('items'),
            render: (_, elem) => 10
        },
        {
            title: "STATUS",
            key: 'status',
            dataIndex: 'status',
            sorter: {
                compare: (a, b) => a.status - b.status,
                multiple: 3,
            },
            render: (_, elem) => <div className=" text-left px-2 py-1">
                <div className=" text-left">
                    <div className="badge bg-primary">{elem.status === "1" ? 'Visible' : "Hidden"}</div>
                </div>
            </div>
        },
        {
            title: "ACTION",
            key: "action",
            render: elem => <div className=" text-center px-2 py-1">
                <Link className="cursor-pointer" id="dropdownTable" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="fa fa-ellipsis-v text-secondary" aria-hidden="true"></i>
                </Link>
                <ul className="dropdown-menu px-2 py-3 ms-sm-n4 ms-n5" aria-labelledby="dropdownTable" data-popper-placement="bottom-start">
                    <li onClick={() => setId(elem._id)}>
                        <Link className="dropdown-item border-radius-md" to={'/admin/categories/category/' + elem._id}>Edit</Link>
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

    // API CALL METHOD TO DELETE AN ITEM
    const deleteItem = (id) => {

        const response = DeleteItem({ id: id, url: 'category/delete' });
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
                                        <h6>Sub Categories List</h6>
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
        </React.Fragment>
    );
};

export default SubCategoriesList;