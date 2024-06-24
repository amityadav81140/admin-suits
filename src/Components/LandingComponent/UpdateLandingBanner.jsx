import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { UpdateData } from '../../Apis/Setters/UpdateData';
import PlainEditor from '../EditorComponent/PlainEditor';

const UpdateLandingBanner = () => {

    // GETTING AUTH TOKEN
    const token = window.sessionStorage.getItem("access-vs");
    useEffect(() => {
        fetch();
    }, []);
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
    // INPUT DETAILS STATE
    const [details, setDetails] = useState({
        title: '',
        description: '',
        slide1Title: '',
        slide2Title: '',
        slide3Title: '',
        tab1: '',
        tab2: '',
        tab3: '',
    });
    // SETTING VALUE TO STATE VARIABLE
    const handleDetails = (e) => {

        const { name, value } = e.target

        setDetails({
            ...details,
            [name]: value,
        });
    };
    // HTML DATA INSIDE TEXT EDITOR
    const [slide1Description, setSlide1Description] = useState("");
    const [slide2Description, setSlide2Description] = useState("");
    const [slide3Description, setSlide3Description] = useState("");
    // FETCH DATA API CALL
    const fetch = async () => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BASE_URL}admin/business_settings_get`,
                { "type": "landing" },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                    withCredentials: true,
                }
            );

            if (response.data.status) {
                setDetails(prevState => {
                    return {
                        ...prevState,
                        title: response.data.data.value[0].title,
                        description: response.data.data.value[0].description,
                        slide1Title: response.data.data.value[0].slide1Title,
                        slide2Title: response.data.data.value[0].slide2Title,
                        slide3Title: response.data.data.value[0].slide3Title,
                        tab1: response.data.data.value[0].tab1,
                        tab2: response.data.data.value[0].tab2,
                        tab3: response.data.data.value[0].tab3,
                    }
                });
                setSlide1Description(response.data.data.value[0].slide1Description)
                setSlide2Description(response.data.data.value[0].slide2Description)
                setSlide3Description(response.data.data.value[0].slide3Description)
            };
        } catch (AxiosError) {
            console.log(AxiosError.response.data.errors)
        }
    };

    // SET DATA API CALL
    const update = async (e) => {
        e.preventDefault();

        let credentials = {
            'type': 'landing',
            'value': [{ ...details, slide1Description, slide2Description, slide3Description }],
        };
        const response = UpdateData({ url: 'business_settings_save', cred: credentials });
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

    return (
        <React.Fragment>
            <form onSubmit={update}>
                <div className="container-fluid py-4">
                    <div className="g-4">
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
                        <div className="card mb-3">
                            <div className="card-body p-md-5">
                                <h5>Home Banner Content</h5>
                                <div className="row">
                                    {/* <div className="mb-4 col-md-6">
                                        <label htmlFor="form-settings/profile" className="form-label">Profile picture</label>
                                        <input type="file" className="form-control" id="form-settings/profile" />
                                    </div> */}
                                    <div className="mb-4">
                                        <label htmlFor="form-landing/title" className="form-label">Title</label>
                                        <input type="text" name='title' className="form-control" id="form-landing/title" value={details.title} onChange={handleDetails} />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="form-landing/description" className="form-label">
                                            Description
                                        </label>
                                        <textarea id="form-landing/description" name='description' className="form-control" rows="2" value={details.description} onChange={handleDetails} ></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card mb-3">
                            <div className="card-body p-md-5">
                                <h5>Home Banner Slider</h5>
                                <div className="row">
                                    {/* <div className="mb-4 col-md-6">
                                        <label htmlFor="form-settings/profile" className="form-label">Profile picture</label>
                                        <input type="file" className="form-control" id="form-settings/profile" />
                                    </div> */}
                                    <div className="mb-4 col-md-12">
                                        <label htmlFor="form-landing/slidertitle1" className="form-label">Slide 1 Title</label>
                                        <textarea id="form-landing/slidertitle1" name='slide1Title' className="form-control" rows="2" value={details.slide1Title} onChange={handleDetails} ></textarea>
                                    </div>
                                    <div className="mb-4 col-md-12">
                                        <label htmlFor="form-landing/sliderdescription1" className="form-label">Slide 1 Description</label>
                                        <PlainEditor data={[slide1Description, setSlide1Description]} />
                                    </div>

                                    <div className="mb-4 col-12">
                                        <label htmlFor="form-landing/slidertitle2" className="form-label">Slide 2 Title</label>
                                        <textarea id="form-landing/slidertitle2" name='slide2Title' className="form-control" rows="2" value={details.slide2Title} onChange={handleDetails} ></textarea>
                                    </div>
                                    <div className="mb-4 col-12">
                                        <label htmlFor="form-landing/sliderdescription2" className="form-label">Slide 2 Description</label>
                                        <PlainEditor data={[slide2Description, setSlide2Description]} />
                                    </div>

                                    <div className="mb-4 col-12">
                                        <label htmlFor="form-landing/slidertitle3" className="form-label">Slide 3 Title</label>
                                        <textarea id="form-landing/slidertitle3" name='slide3Title' className="form-control" rows="2" value={details.slide3Title} onChange={handleDetails} ></textarea>
                                    </div>
                                    <div className="mb-4 col-12">
                                        <label htmlFor="form-landing/sliderdescription3" className="form-label">Slide 3 Description</label>
                                        <PlainEditor data={[slide3Description, setSlide3Description]} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card mb-3">
                            <div className="card-body p-md-5">
                                <h5>Home Banner Navigation Tabs</h5>

                                <div className="row">
                                    {/* <div className="mb-4 col-md-6">
                                        <label htmlFor="form-settings/profile" className="form-label">Profile picture</label>
                                        <input type="file" className="form-control" id="form-settings/profile" />
                                    </div> */}

                                    <div className="mb-4 col-md-12">
                                        <label htmlFor="form-landing/itemName1" className="form-label">Tab 1 Name</label>
                                        <input type="text" name='tab1' className="form-control" id="form-landing/itemName1" value={details.tab1} onChange={handleDetails} />
                                    </div>
                                    {/* <div className="mb-4 col-md-6">
                                        <label htmlFor="form-landing/itemSlug1" className="form-label">1 Item Slug</label>
                                        <input type="text" className="form-control" id="form-landing/itemSlug1" value="" />
                                    </div> */}

                                    <div className="mb-4 col-md-12">
                                        <label htmlFor="form-landing/itemName2" className="form-label">Tab 2 Name</label>
                                        <input type="text" name='tab2' className="form-control" id="form-landing/itemName2" value={details.tab2} onChange={handleDetails} />
                                    </div>
                                    {/* <div className="mb-4 col-md-6">
                                        <label htmlFor="form-landing/itemSlug2" className="form-label">2 Item Slug</label>
                                        <input type="text" className="form-control" id="form-landing/itemSlug2" value="" />
                                    </div> */}

                                    <div className="mb-4 col-md-12">
                                        <label htmlFor="form-landing/itemName3" className="form-label">Tab 3 Name</label>
                                        <input type="text" name='tab3' className="form-control" id="form-landing/itemName3" value={details.tab3} onChange={handleDetails} />
                                    </div>
                                    {/* <div className="mb-4 col-md-6">
                                        <label htmlFor="form-landing/itemSlug3" className="form-label">3 Item Slug</label>
                                        <input type="text" className="form-control" id="form-landing/itemSlug3" value="" />
                                    </div> */}

                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="card text-center">
                                <div className="text-reset p-4 text-decoration-none sa-hover-area">
                                    <input type="submit" className="btn btn-outline-primary btn-sm mb-0" value="Update Home Banner" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </React.Fragment>
    );
};

export default UpdateLandingBanner;