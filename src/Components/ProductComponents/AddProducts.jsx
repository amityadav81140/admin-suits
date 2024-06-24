import { Select } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { brandsSelector, fetchBrands } from "../../Apis/Getters/brands";
import { categoriesSelector, fetchCategories } from "../../Apis/Getters/categories";
import { colorsSelector, fetchColors } from "../../Apis/Getters/colors";
import { fetchSubCategories, subcategoriesSelector } from "../../Apis/Getters/subcategories";
import { fetchTaxes, taxesSelector } from "../../Apis/Getters/taxes";
import FileUpload from "../../Apis/Setters/FileUpload";
import { UpdateData } from "../../Apis/Setters/UpdateData";
import Variants from "../VariationsComponent/Variants";
// import Select from 'react-select'

const AddProducts = () => {

    // Declaring Dispatch Method
    const dispatch = useDispatch();
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
    useEffect(() => {
        // Dispatching Fetch Method of this Component
        const token = window.sessionStorage.getItem("access-vs");
        dispatch(fetchCategories(token));
        dispatch(fetchBrands(token));
        dispatch(fetchColors(token));
        dispatch(fetchTaxes());
    }, [successMsg]);

    // GETTING ALL CATEGORIES, BRANDS & COLORS FROM GLOBAL REDUX STATE
    const categories = useSelector(state => categoriesSelector.selectAll(state));
    const subcategories = useSelector(state => subcategoriesSelector.selectAll(state));
    const brands = useSelector(state => brandsSelector.selectAll(state));
    const colors = useSelector(state => colorsSelector.selectAll(state));
    // SELECTING ALL TAXES FROM REDUX STATE
    const options = useSelector(state => taxesSelector.selectAll(state)).map(elem => {
        return (
            {
                label: elem.name,
                value: elem._id
            }
        );
    });

    // VALUES STATE
    const [details, setDetails] = useState({
        name: "",
        thumbnail: "",
        images: null,
        category: "",
        sub_category: "",
        color: "",
        purchase_price: "",
        price: "",
        discount_type: "Percentage",
        discount: "",
        quantity: 5,
        min_quantity: 1,
        slug: "",
        brand: "",
        refundable: 0,
        new_arrival: 0,
        current_stock: "",
        title: "",
        description: "",
        status: 1,
        free_shipping: 0,
        meta_title: "",
        meta_description: "",
        meta_image: "",
        lookbook: 0,
    });
    // SELECTED ATTRIBUTES STATE
    const [selectedAttributes, setSelectedAttributes] = useState([]);
    // INPUT VARIATIONS STATE
    const [variations, setVariations] = useState([]);
    // VARIANTS INPUT DATA STATE
    const [combinations, setCombinations] = useState({});

    // METHOD TO SET DETAILS IN details STATE VARIABLE
    const handleDetails = (e) => {
        if (e.target.type === "checkbox") {
            const { name, checked } = e.target;
            setDetails({
                ...details,
                [name]: checked,
            });
        } else {
            const { name, value } = e.target;
            setDetails({
                ...details,
                [name]: value,
            });
        }
    };

    // HANDLING TAXES
    const handleChange = (value)=>{
        setDetails(prev=>{
            return {
                ...prev,
                taxes: value,
            };
        });
    };

    // FETCHING SUBCATEGORIES
    const fetchSubcategories = (e) => {
        const token = window.sessionStorage.getItem("access-vs");
        dispatch(fetchSubCategories({ token, subcategory: e.target.value }));
    };

    // FILE UPLOAD METHOD(API CALL)
    const fileUpload = (e) => {
        // Getting details field to set image id
        var fieldName = e.target.name;
        const response = FileUpload({ file: e.target.files[0], path: 'products' });
        response.then(res => {
            if (res.data.status) {

                if (fieldName === "thumbnail") {
                    setDetails({
                        ...details,
                        thumbnail: res.data.data._id,
                    });
                } else {
                    setDetails({
                        ...details,
                        meta_image: res.data.data._id,
                    });
                }

            } else {
                setErrMsg({
                    status: true,
                    message: res.data.message,
                });
            }
        })
            .catch((AxiosError) => {
                console.log(AxiosError.response.data.errors);
            });

    };

    // MULTIPLE FILES UPLOAD METHOD(API CALL)
    const multiFileUpload = (e) => {
        // Storing multiple images into array
        let allInputImages = [...e.target.files];
        // Fetching access token
        const token = window.sessionStorage.getItem("access-vs");
        // Declaring empty array variable
        let img = [];
        // Looping through all input images 
        allInputImages.forEach((e => {

            // Defining image, image path & module id 
            let file = {
                'image': e,
                'module_path': 'products',
                'module_id': 1,
            }

            // Requesting to upload a image
            axios.post(`${process.env.REACT_APP_BASE_URL}upload`,
                file,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                    params: {
                        'module_path': 'products',
                    },
                    withCredentials: true,
                },
            )
                .then(res => {
                    if (res.data.status) {

                        // Pushing image id to declared array variable
                        img = [...img, res.data.data._id];
                        // Updating details state with images array
                        setDetails({
                            ...details,
                            images: img,
                        });

                    } else {
                        setErrMsg({
                            status: true,
                            message: res.data.message,
                        });
                    }
                })
                .catch((AxiosError) => {
                    console.log(AxiosError.response.data.errors);
                });
        }))
    };

    // HANDLING API CALL METHOD
    const product = (e) => {
        e.preventDefault();
        let credentials;
        if (details.meta_image) {
            credentials = { ...details, attributes: variations, combinations: combinations };
        } else {
            credentials = { ...details, attributes: variations, combinations: combinations, meta_image: details.thumbnail };
        };
        if(credentials?.taxes?.length === 0 || credentials?.taxes === undefined){
            window.scrollTo(0,0);
            setErrMsg({
                status: true,
                message: "Tax Field is Required",
            });
        }else{
            const response = UpdateData({ url: 'product/add', cred: credentials });
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
                    setDetails({
                        name: "",
                        thumbnail: "",
                        images: null,
                        category: "",
                        sub_category: "",
                        color: "",
                        purchase_price: "",
                        price: "",
                        discount_type: "Percentage",
                        discount: "",
                        quantity: 5,
                        min_quantity: 1,
                        slug: "",
                        brand: "",
                        refundable: 0,
                        new_arrival: 0,
                        current_stock: "",
                        title: "",
                        description: "",
                        status: 1,
                        free_shipping: 0,
                        meta_title: "",
                        meta_description: "",
                        meta_image: "",
                    });
                } else {
                    setErrMsg({
                        status: true,
                        message: res.data.message,
                    });
                    setSuccessMsg({
                        status: false,
                        message: '',
                    });
                }
            }).catch((AxiosError) => {
                console.log(AxiosError.response.data.errors);
            });
        };
    };

    return (
        <React.Fragment>
            <form onSubmit={product}>
                {/* INPUT PRODUCT DETAILS */}
                <div className="container-fluid row">
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

                    <div className="col-md-8">
                        {/* Basic Information Card */}
                        <div className="card">
                            <div className="card-body p-md-5">
                                <div className="mb-5">
                                    <h4 className="mb-0 fs-exact-18">Basic information</h4>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="form-product/name" className="form-label">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        id="form-product/name"
                                        value={details.name}
                                        onChange={handleDetails}
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="form-product/slug" className="form-label">
                                        Slug
                                    </label>
                                    <div className="input-group input-group--sa-slug">
                                        <input
                                            type="text"
                                            name="slug"
                                            className="form-control"
                                            id="form-product/slug"
                                            aria-describedby="form-product/slug-addon form-product/slug-help"
                                            value={details.slug}
                                            onChange={handleDetails}
                                            required
                                        />
                                    </div>
                                    <div id="form-product/slug-help" className="form-text">
                                        Unique human-readable product identifier. No longer than 255
                                        characters.
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="form-product/title" className="form-label">
                                        Title
                                    </label>
                                    <div className="input-group input-group--sa-title">
                                        <input
                                            type="text"
                                            name="title"
                                            className="form-control"
                                            id="form-product/title"
                                            aria-describedby="form-product/title-addon form-product/title-help"
                                            value={details.title}
                                            onChange={handleDetails}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="form-product/description" className="form-label">
                                        Description
                                    </label>
                                    {/* <EditorComponent /> */}
                                    <textarea
                                        id="form-product/description"
                                        name="description"
                                        className="sa-quill-control form-control sa-quill-control--ready"
                                        rows="4"
                                        value={details.description}
                                        onChange={handleDetails}
                                        required
                                    ></textarea>
                                </div>
                                {/* <div className="mb-4">
                                    <label htmlFor="form-product/short-description" className="form-label">
                                        Short description
                                    </label>
                                    <textarea
                                        id="form-product/short-description"
                                        className="form-control"
                                        rows="2"
                                    ></textarea>
                                </div> */}

                            </div>
                        </div>

                        {/* Variations Card */}
                        <Variants
                            onAttributesChange={[selectedAttributes, setSelectedAttributes]}
                            onVariationChance={[variations, setVariations]}
                            onCombinationChange={[combinations, setCombinations]}
                        />

                        {/* Quantity Card */}
                        <div className="card mt-5">
                            <div className="card-body p-md-5">
                                <div className="mb-5">
                                    <h4 className="mb-0 fs-exact-18">Order Quantity</h4>
                                </div>
                                <div className="row g-4 mb-4">
                                    <div className="col-md-6">
                                        <label htmlFor="form-product/stock" className="form-label">
                                            Product Quantity in Stock
                                        </label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="current_stock"
                                            id="form-product/stock"
                                            value={details.current_stock}
                                            onChange={handleDetails}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="form-product/price" className="form-label">
                                            Minimum Order Quantity
                                        </label>
                                        <input
                                            type="number"
                                            name="min_quantity"
                                            className="form-control"
                                            id="form-product/minorder"
                                            value={details.min_quantity}
                                            onChange={handleDetails}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="form-product/maxorder" className="form-label">
                                            Maximum Order Quantity
                                        </label>
                                        <input
                                            type="number"
                                            name="quantity"
                                            className="form-control"
                                            id="form-product/maxorder"
                                            value={details.quantity}
                                            onChange={handleDetails}
                                            required
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* Pricing Card */}
                        <div className="card mt-5">
                            <div className="card-body p-md-5">
                                <div className="mb-5">
                                    <h4 className="mb-0 fs-exact-18">Pricing</h4>
                                </div>
                                <div className="row g-4 mb-4">
                                    <div className="col-md-6">
                                        <label htmlFor="form-product/price" className="form-label">
                                            Price
                                        </label>
                                        <input
                                            type="number"
                                            name="price"
                                            className="form-control"
                                            id="form-product/price"
                                            value={details.price}
                                            onChange={handleDetails}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="form-product/purchase_price" className="form-label">
                                            Purchase Price
                                        </label>
                                        <input
                                            type="number"
                                            name="purchase_price"
                                            className="form-control"
                                            id="form-product/purchase_price"
                                            value={details.purchase_price}
                                            onChange={handleDetails}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="form-product/discount_type" className="form-label">
                                            Discount Type
                                        </label>
                                        <input
                                            type="text"
                                            name="discount_type"
                                            className="form-control"
                                            id="form-product/discount_type"
                                            value={details.discount_type}
                                            onChange={handleDetails}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="form-product/discount" className="form-label">
                                            Discount
                                        </label>
                                        <input
                                            type="number"
                                            name="discount"
                                            className="form-control"
                                            id="form-product/discount"
                                            value={details.discount}
                                            onChange={handleDetails}
                                            required
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* Tax Card */}
                        <div className="card mt-5">
                            <div className="card-body p-md-5">
                                <div className="mb-5">
                                    <h4 className="mb-0 fs-exact-18">Tax</h4>
                                </div>
                                <div className="row g-4 mb-4">
                                    <div className="col-md-12">
                                        <label className="form-label">
                                            Taxes :
                                        </label>
                                        <Select
                                            mode="multiple"
                                            allowClear
                                            style={{ width: '100%' }}
                                            placeholder="Please select"
                                            // defaultValue={['a10', 'c12']}
                                            onChange={handleChange}
                                            options={options}
                                            // value={selectedAttributes}
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>


                        {/* Images Card */}
                        <div className="card mt-5">
                            <div className="card-body p-md-5">
                                <div className="mb-5">
                                    <h4 className="mb-0 fs-exact-18">Images</h4>
                                </div>
                            </div>
                            <div className="mt-n5 container-fluid">
                                <div className="row">
                                    <div className="mb-4 col-md-6">
                                        <label htmlFor="form-productImage/thumbnail" className="form-label">Thumbnail Image</label>
                                        <input type="file" className="form-control" name='thumbnail' id="form-productImage/thumbnail" onChange={fileUpload} required />
                                    </div>
                                    <div className="mb-4 col-md-6">
                                        <label htmlFor="form-productImage/images" className="form-label">Multiple Product Images</label>
                                        <input type="file" className="form-control" name='images' id="form-productImage/images" onChange={multiFileUpload} multiple required />
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* SEO Card */}
                        <div className="card my-5">
                            <div className="card-body p-md-5">
                                <div className="mb-5">
                                    <h4 className="mb-0 fs-exact-18">Search Engine Optimization(SEO)</h4>
                                    <div className="mt-3 text-muted">
                                        Provide information that will help improve the snippet and bring
                                        your product to the top of search engines.
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="form-product/seo-title" className="form-label">
                                        Meta title
                                    </label>
                                    <input
                                        type="text"
                                        name="meta_title"
                                        className="form-control"
                                        id="form-product/seo-title"
                                        value={details.meta_title}
                                        onChange={handleDetails}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="form-product/seo-description" className="form-label">
                                        Meta description
                                    </label>
                                    <textarea
                                        id="form-product/seo-description"
                                        name="meta_description"
                                        className="form-control"
                                        rows="2"
                                        value={details.meta_description}
                                        onChange={handleDetails}
                                    ></textarea>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="form-product/seo-image" className="form-label">Meta Image</label>
                                    <input type="file" className="form-control" name='meta_image' id="form-product/seo-image" onChange={fileUpload} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Side Cards */}
                    <div className="col-md-4">

                        {/* Visibility Card */}
                        <div className="card w-100">
                            <div className="card-body p-md-5">
                                <div className="mb-5">
                                    <h4 className="mb-0 fs-exact-18">Visibility</h4>
                                </div>
                                <div className="mb-4">
                                    <label className="form-check">
                                        <input type="radio" className="form-check-input" name="status" value={1} onChange={handleDetails} required />
                                        <span className="form-check-label">Active</span>
                                    </label>
                                    <label className="form-check mb-0">
                                        <input type="radio" className="form-check-input" name="status" value={0} onChange={handleDetails} required />
                                        <span className="form-check-label">Inactive</span>
                                    </label>
                                </div>

                            </div>
                        </div>

                        {/* Brands Card */}
                        <div className="card w-100 mt-5">
                            <div className="card-body p-md-5">
                                <div className="mb-5">
                                    <h4 className="mb-0 fs-exact-18">Brands</h4>
                                </div>
                                <div className="row">
                                    {/* <div className="mb-4">

                                        <Select options={categories} isMulti />
                                    </div> */}
                                    <select className="sa-select2 form-select select2-hidden-accessible mb-4" name="brand" multiple="" data-select2-id="1" tabIndex="-1" aria-hidden="true" onChange={handleDetails} required>
                                        <option defaultValue={null}>Select Brand</option>
                                        {
                                            brands.map((brand, index) => {
                                                return <option key={index + 1} value={brand._id}>{brand.name}</option>;
                                            })
                                        }
                                    </select>

                                </div>
                            </div>
                        </div>

                        {/* Categories Card */}
                        <div className="card w-100 mt-5">
                            <div className="card-body p-md-5">
                                <div className="mb-5">
                                    <h4 className="mb-0 fs-exact-18">Categories</h4>
                                </div>
                                <div className="row">
                                    {/* <div className="mb-4">
                                        <Select options={categories} isMulti />
                                    </div> */}
                                    <select className="sa-select2 form-select select2-hidden-accessible mb-4" name="category" multiple="" data-select2-id="1" tabIndex="-1" aria-hidden="true" onChange={(e) => {
                                        fetchSubcategories(e)
                                        handleDetails(e)
                                    }} required>
                                        <option defaultValue={null}>Select Parent Category</option>
                                        {
                                            categories.map((cat, index) => {
                                                return <option key={index + 1} value={cat._id}>{cat.name}</option>;
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="row">
                                    <select className="sa-select2 form-select select2-hidden-accessible mb-4" name="sub_category" multiple="" data-select2-id="1" tabIndex="-1" aria-hidden="true" onChange={handleDetails} required>
                                        <option defaultValue={null}>Select Sub Category</option>
                                        {
                                            subcategories.map((cat, index) => {
                                                return <option key={index + 1} value={cat._id}>{cat.name}</option>;
                                            })
                                        }
                                    </select>
                                </div>
                                {/* <div className="row">
                                    <div className="mt-4 mb-n2">
                                        <label htmlFor="form-product/cat" className="form-label">
                                            Add Category
                                        </label>
                                        <input type="text" className="form-control" id="form-product/cat" value="" />
                                    </div>

                                </div> */}
                            </div>
                        </div>

                        {/* Color Card */}
                        <div className="card w-100 mt-5">
                            <div className="card-body p-md-5">
                                <div className="mb-5">
                                    <h4 className="mb-0 fs-exact-18">Color</h4>
                                </div>
                                <div className="row">
                                    {/* <div className="mb-4">

                                        <Select options={categories} isMulti />
                                    </div> */}
                                    <select className="sa-select2 form-select select2-hidden-accessible mb-4" name="color" multiple="" data-select2-id="1" tabIndex="-1" aria-hidden="true" onChange={handleDetails} required>
                                        <option defaultValue={null}>Select Color</option>
                                        {
                                            colors.map((color, index) => {
                                                return <option key={index + 1} value={color._id}>{color.name}</option>;
                                            })
                                        }
                                    </select>

                                </div>
                            </div>
                        </div>

                        {/* Additional Settings Card */}
                        <div className="card w-100 mt-5">
                            <div className="card-body p-md-5">
                                <div className="mb-5">
                                    <h4 className="mb-0 fs-exact-18">Additional Settings</h4>
                                </div>
                                <div className="row">
                                    <div className="mb-4">
                                        <label className="form-check">
                                            <input type="checkbox" className="form-check-input" name="free_shipping" onChange={handleDetails} />
                                            <span className="form-check-label">Free Shipping</span>
                                        </label>
                                        <label className="form-check mb-0">
                                            <input type="checkbox" className="form-check-input" name="refundable" onChange={handleDetails} />
                                            <span className="form-check-label">Refundable</span>
                                        </label>
                                        <label className="form-check mb-0">
                                            <input type="checkbox" className="form-check-input" name="new_arrival" onChange={handleDetails} />
                                            <span className="form-check-label">New Arrival</span>
                                        </label>
                                        <label className="form-check mb-0">
                                            <input type="checkbox" className="form-check-input" name="lookbook" onChange={handleDetails} />
                                            <span className="form-check-label">Lookbook</span>
                                        </label>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* SUBMIT PRODUCT DETAILS */}
                <div className="container-fluid pb-5 row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body p-md-5">
                                <div className="text-center">
                                    <input type="submit" className="btn btn-outline-primary btn-sm mb-0 px-5" value="Save Poduct Details" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </React.Fragment >
    );
};

export default AddProducts;