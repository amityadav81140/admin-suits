import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { enquiriesSelector, fetchEnquiries, remove } from '../../Apis/Getters/enquiries';
import { DeleteItem } from '../../Apis/Setters/DeleteItem';
import useColumnSearchProps from '../../hooks/useColumnSearchProps';
import Datatable from '../DataTableComponent/Datatable';

const ContactsList = () => {

  // Declaring Dispatch Method
  const dispatch = useDispatch();
  // Declaring ColumnSearchProps Method
  const columnSearchProps = useColumnSearchProps();
  useEffect(() => {
    // Dispatching Fetch Method of this Component
    const token = window.sessionStorage.getItem("access-vs");
    dispatch(fetchEnquiries(token));
  }, []);
  // Getting List from Redux State of this Component
  const enquiries = useSelector(state => enquiriesSelector.selectAll(state));

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
  // CHANGE ENQUIRY POPUP STATE
  const [msgStatus, setMsgStatus] = useState(false);
  // ENQUIRY POPUP DETAILS STATE
  const [enqDetails, setEnqDetails] = useState({
    name: '',
    email: '',
    message: '',
  });

  // DESTRUCTURING DATA FOR DATA TABLE
  const data = [...enquiries];

  // DEFINING DATA TABLE COLUMNS
  const columns = [
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
      title: "EMAIL",
      key: 'email',
      dataIndex: 'email',
      sorter: {
        compare: (a, b) => a.email - b.email,
        multiple: 3,
      },
      ...columnSearchProps('email'),
    },
    {
      title: "MESSAGE",
      key: 'message',
      dataIndex: 'message',
      sorter: {
        compare: (a, b) => a.message - b.message,
        multiple: 3,
      },
      ...columnSearchProps('message'),
      render: (_,elem) => <span>{elem.message.slice(0, 25)}...</span>
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
            setMsgStatus(!msgStatus);
            setEnqDetails({
              name: elem.name,
              email: elem.email,
              message: elem.message,
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

  // API CALL METHOD TO DELETE AN ITEM
  const deleteItem = (id) => {

    const response = DeleteItem({ id: id, url: 'contactus_delete' });
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
                    <h6>Enquiries List</h6>
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
      {msgStatus && <div className="password-popup">
        <div className="rts-newsletter-popup popup">
          <div className="newsletter-close-btn" onClick={() => setMsgStatus(!msgStatus)}>
            <i className="fa fa-times"></i>
          </div>
          <div className="newsletter-inner popup-inner">
            <h3 className="newsletter-heading">Enquiry</h3>
            <form>
              <div className="input-area">
                <div className="input-div">
                  <input name='name' type="text" value={enqDetails.name} placeholder='Name' disabled />
                </div>
                <div className="input-div">
                  <input name='email' type="email" value={enqDetails.email} placeholder='Email' disabled />
                </div>
                <div className="input-div">
                  <textarea rows={5} value={enqDetails.message} placeholder='Message' disabled></textarea>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>}
    </React.Fragment>
  );
};

export default ContactsList;