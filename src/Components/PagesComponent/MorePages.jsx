import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStory, remove, storySelector } from '../../Apis/Getters/story';
import { DeleteItem } from '../../Apis/Setters/DeleteItem';
import { UpdateData } from '../../Apis/Setters/UpdateData';
import useColumnSearchProps from '../../hooks/useColumnSearchProps';
import Datatable from '../DataTableComponent/Datatable';
import PlainEditor from '../EditorComponent/PlainEditor';

const MorePages = () => {

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
  // ADD DETAILS STATE
  const [content, setContent] = useState({
    name: '',
    page: 'extras',
    status: 1,
  });
  // HTML DATA INSIDE TEXT EDITOR
  const [value, setValue] = useState("");
  // HANDLING ADD DETAILS TO ABOVE STATE
  const handleDetails = (e) => {
    const { name, value } = e.target;
    setContent({
      ...content,
      [name]: value,
    });
  };

  useEffect(() => {
    dispatch(fetchStory('extras'));
  }, [successMsg]);

  // SELECTING DATA FROM REDUX STATE
  const support = useSelector(state => storySelector.selectAll(state));

  // CHANGE POPUP STATE
  const [contentStatus, setContentStatus] = useState(false);
  // POPUP DETAILS STATE
  const [contentDetails, setContentDetails] = useState({
    name: '',
    page: 'support',
    status: 1,
  });
  // HTML DATA INSIDE POPUP TEXT EDITOR
  const [newValue, setNewValue] = useState("");

  // DESTRUCTURING DATA FOR DATA TABLE
  const data = [...support];

  // DEFINING DATA TABLE COLUMNS
  const columns = [
    {
      title: "TAB NAME",
      key: 'name',
      dataIndex: 'name',
      sorter: {
        compare: (a, b) => a.name - b.name,
        multiple: 3,
      },
      ...columnSearchProps('name'),
    },
    {
      title: "TAB DESCRIPTION",
      key: 'description',
      dataIndex: 'description',
      sorter: {
        compare: (a, b) => a.description - b.description,
        multiple: 3,
      },
      ...columnSearchProps('description'),
      render: (_, elem) => <span>{elem.description.slice(0, 25)}...</span>
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
              name: elem.name,
              page: elem.page,
              status: 1,
            });
            setNewValue(elem.description)
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

  // ADD API METHOD
  const addContent = (e) => {
    e.preventDefault();
    const credentials = { ...content, description: value };
    const response = UpdateData({ url: 'page_type/add', cred: credentials });
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
        setContent({
          name: '',
          page: 'extras',
          status: 1,
        });
        setValue("");
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

  // UPDATE API METHOD
  const updateContent = (e) => {
    e.preventDefault();
    const credentials = { ...contentDetails, description: newValue };

    const response = UpdateData({ url: 'page_type/update', cred: credentials });
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
    const response = DeleteItem({ id: id, url: 'page_type/delete' });
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
  };

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
            {/* ADD OUR STORY CONTENT FORM */}
            <div className="g-4">
              <div className="card mb-3">
                <div className="card-body p-md-5">
                  <h4>Add Page</h4>
                  <form onSubmit={addContent}>
                    <div className="row">
                      <div className="mb-4">
                        <label htmlFor="form-extra/name" className="form-label">Page Name</label>
                        <input type="text" name='name' className="form-control" id="form-extra/name" value={content.name} onChange={handleDetails} />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="form-extra/content" className="form-label">Page Content</label>
                        <PlainEditor data={[value, setValue]} />
                      </div>
                    </div>
                    <div className="mb-4">
                      <input type="submit" className="btn btn-outline-primary btn-sm mb-0" value='Save' />
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* SUPPORT CONTENT LIST */}
            <div className="card">
              <div className="card-header pb-0">
                <div className="row">
                  <div className="col-lg-6 col-7">
                    <h6>Pages List</h6>
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

      {/* VIEW & UPDATE SUPPORT */}
      {contentStatus && <div className="password-popup">
        <div className="rts-newsletter-popup popup popup-large">
          <div className="newsletter-close-btn" onClick={() => setContentStatus(!contentStatus)}>
            <i className="fa fa-times"></i>
          </div>
          <div className="newsletter-inner popup-inner">
            <h3 className="newsletter-heading">Page</h3>
            <form onSubmit={updateContent}>
              <div className="input-area">
                <div className="input-div">
                  <input name='name' type="text" value={contentDetails.name} placeholder='Page Name' onChange={(e) => setContentDetails({ ...contentDetails, name: e.target.value })} required />
                </div>
                <div className="input-div">
                  <PlainEditor data={[newValue, setNewValue]} />
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

export default MorePages;