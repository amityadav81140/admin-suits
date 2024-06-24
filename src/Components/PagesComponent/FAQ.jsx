import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { faqsSelector, fetchFaqs, remove } from '../../Apis/Getters/faqs';
import { DeleteItem } from '../../Apis/Setters/DeleteItem';
import { UpdateData } from '../../Apis/Setters/UpdateData';
import useColumnSearchProps from '../../hooks/useColumnSearchProps';
import Datatable from '../DataTableComponent/Datatable';

const FAQ = () => {

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
    // ADD FAQ DETAILS STATE
    const [faq, setFaq] = useState({
        question: '',
        answer: '',
        status: 1,
    });
    // HANDLING ADD FAQ DETAILS TO ABOVE STATE
    const handleDetails = (e) => {
        const { name, value } = e.target;
        setFaq({
            ...faq,
            [name]: value,
        });
    };

    useEffect(() => {
        dispatch(fetchFaqs());
    }, [successMsg]);

    // SELECTING ALL FAQS FROM REDUX STATE
    const faqs = useSelector(state => faqsSelector.selectAll(state));


    // CHANGE FAQ POPUP STATE
    const [faqStatus, setFaqStatus] = useState(false);
    // FAQ POPUP DETAILS STATE
    const [faqDetails, setFaqDetails] = useState({
        question: '',
        answer: '',
        status: 1,
    });

    // DESTRUCTURING DATA FOR DATA TABLE
    const data = [...faqs];

    // DEFINING DATA TABLE COLUMNS
    const columns = [
        {
            title: "QUESTION",
            key: 'question',
            dataIndex: 'question',
            sorter: {
                compare: (a, b) => a.question - b.question,
                multiple: 3,
            },
            ...columnSearchProps('question'),
        },
        {
            title: "ANSWER",
            key: 'answer',
            dataIndex: 'answer',
            sorter: {
                compare: (a, b) => a.answer - b.answer,
                multiple: 3,
            },
            ...columnSearchProps('answer'),
            render: (_,elem) => <span>{elem.answer.slice(0, 25)}...</span>
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
                        setFaqStatus(!faqStatus);
                        setFaqDetails({
                            id: elem._id,
                            question: elem.question,
                            answer: elem.answer,
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

    // ADD FAQ API METHOD
    const addFaq = (e) => {
        e.preventDefault();
        const credentials = { ...faq };
        // console.log(credentials);
        const response = UpdateData({ url: 'faq/add', cred: credentials });
        response.then(res => {
            // console.log(res.data);

            window.scrollTo(0, 0);
            if (res.data.status) {
                setFaq({
                    question: '',
                    answer: '',
                    status: 1,
                });
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

    // UPDATE FAQ API METHOD
    const updateFaq = (e) => {
        e.preventDefault();
        const credentials = { ...faqDetails };
        const response = UpdateData({ url: 'faq/update', cred: credentials });
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
                setFaqStatus(!faqStatus);
            } else {
                setSuccessMsg({
                    status: false,
                    message: '',
                });
                setErrMsg({
                    status: true,
                    message: res.data.message,
                });
                setFaqStatus(!faqStatus);
            }

        }).catch(AxiosError => console.log(AxiosError.response.data.errors));
    };

    // API CALL METHOD TO DELETE AN ITEM
    const deleteItem = (id) => {
        const response = DeleteItem({ id: id, url: 'faq/delete' });
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
                        {/* ADD FAQ FORM */}
                        <div className="g-4">
                            <div className="card mb-3">
                                <div className="card-body p-md-5">
                                    <h4>FAQs</h4>
                                    <form onSubmit={addFaq}>
                                        <div className="row">
                                            <div className="mb-4">
                                                <label htmlFor="form-faq/question" className="form-label">Question</label>
                                                <input type="text" name='question' className="form-control" id="form-faq/question" value={faq.question} onChange={handleDetails} />
                                            </div>
                                            <div className="mb-4">
                                                <label htmlFor="form-faq/answer" className="form-label">Answer</label>
                                                <textarea name='answer' rows='5' className="form-control" id="form-faq/answer" value={faq.answer} onChange={handleDetails}>

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

                        {/* FAQs LIST */}
                        <div className="card">
                            <div className="card-header pb-0">
                                <div className="row">
                                    <div className="col-lg-6 col-7">
                                        <h6>FAQs List</h6>
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

            {/* VIEW & UPDATE FAQ */}
            {faqStatus && <div className="password-popup">
                <div className="rts-newsletter-popup popup">
                    <div className="newsletter-close-btn" onClick={() => setFaqStatus(!faqStatus)}>
                        <i className="fa fa-times"></i>
                    </div>
                    <div className="newsletter-inner popup-inner">
                        <h3 className="newsletter-heading">FAQ</h3>
                        <form onSubmit={updateFaq}>
                            <div className="input-area">
                                <div className="input-div">
                                    <input name='question' type="text" value={faqDetails.question} placeholder='Question' onChange={(e)=>setFaqDetails({...faqDetails, question : e.target.value})} required />
                                </div>
                                <div className="input-div">
                                    <textarea name='answer' rows={5} value={faqDetails.answer} placeholder='Answer' onChange={(e)=>setFaqDetails({...faqDetails, answer : e.target.value})} required></textarea>
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

export default FAQ;