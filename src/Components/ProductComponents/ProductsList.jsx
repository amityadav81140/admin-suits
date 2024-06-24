import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts, productsSelector, remove } from '../../Apis/Getters/products';
import { EditProductContext } from '../../Context/EditProductContext';
import { DeleteItem } from '../../Apis/Setters/DeleteItem';
import Datatable from '../DataTableComponent/Datatable';
import useColumnSearchProps from '../../hooks/useColumnSearchProps';

const ProductsList = () => {

  // Declaring Dispatch Method
  const dispatch = useDispatch();
  // Declaring ColumnSearchProps Method
  const columnSearchProps = useColumnSearchProps();

  useEffect(() => {
    // Dispatching Fetch Method of this Component
    const token = window.sessionStorage.getItem("access-vs");
    dispatch(fetchProducts(token));
  }, []);

  // Getting List from Redux State of this Component
  const products = useSelector(state => productsSelector.selectAll(state));
  // Using Edit Context Api of this Component
  const [id, setId] = useContext(EditProductContext);
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
  const data = [...products];

  // DEFINING DATA TABLE COLUMNS
  const columns = [
    {
      title: "IMAGE",
      key: 'thumbnail',
      dataIndex: 'thumbnail',
      sorter: {
        compare: (a, b) => a.thumbnail - b.thumbnail,
        multiple: 3,
      },
      render: (_, elem) => <Link href="app-product.html" className="me-4">
        <div className="sa-symbol sa-symbol--shape--rounded sa-symbol--size--lg">
          <img src={elem.thumbnail} width="40" height="40" alt="" />
        </div>
      </Link>
    },
    {
      title: "PRODUCT",
      key: 'name',
      dataIndex: 'name',
      sorter: {
        compare: (a, b) => a.name - b.name,
        multiple: 3,
      },
      ...columnSearchProps('name'),
    },
    {
      title: "CATEGORY",
      dataIndex: 'category_name',
      key: 'category_name',
      sorter: {
        compare: (a, b) => a.category_name - b.category_name,
        multiple: 3,
      },
      ...columnSearchProps('category_name'),
    },
    {
      title: "PRICE",
      key: 'price',
      dataIndex: 'price',
      sorter: {
        compare: (a, b) => a.price - b.price,
        multiple: 3,
      },
      ...columnSearchProps('price'),
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
            <Link className="dropdown-item border-radius-md" to={'/admin/products/product/' + elem._id}>Edit</Link>
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
    const response = DeleteItem({ id: id, url: 'product/delete' });
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
                  <div className="col-md-8">
                    <h6>Products List</h6>
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

export default ProductsList;