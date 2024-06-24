import React, { useContext, useEffect, useRef } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { ordersSelector } from '../../Apis/Getters/orders';
import { EditOrdersContext } from '../../Context/EditOrdersContext';
import PrintOrder from './PrintOrder';

const EditOrder = () => {

    // Using Edit Context Api
    const [id, setId] = useContext(EditOrdersContext);
    // CHANGE POPUP STATE
    // const [contentStatus, setContentStatus] = useState(false);
    // CHANGE PRINT POPUP STATE
    const [printStatus, setPrintStatus] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Getting Order from Redux State
    const order = useSelector(state => ordersSelector.selectById(state, id));

    // Mpping List of Orderd Items
    const itemsList = order?.orderDetails?.map((elem, index) => {

        const product_price = (Number(elem?.product_details?.[0]?.price ? elem?.product_details?.[0]?.price : elem?.price) * Number(elem?.qty));

        const product_total_tax = elem?.tax?.length && elem?.tax !== "0" ? elem?.tax?.reduce((total, current) => {
            return total + current?.percentage;
        }, 0) : order?.tax;

        const total_ammount = (product_price + ((product_total_tax / 100) * product_price));


        return (
            <React.Fragment>
                <tr key={index + 1}>
                    <td>
                        {/* <Link to='#'> */}
                        <div className="d-flex px-2 py-1">
                            <div>
                                <img src={elem?.product_image} className="avatar avatar-sm me-3" alt="user1" />
                            </div>
                            <div className="d-flex flex-column justify-content-center">
                                <h6 className="mb-0 text-sm">{elem?.product_name}</h6>
                            </div>
                        </div>
                        {/* </Link> */}
                    </td>
                    <td className="align-middle text-center text-sm">
                        <p className="text-xs font-weight-bold mb-0">{elem?.product_details?.[0]?.color}</p>
                    </td>
                    <td className="align-middle text-center text-sm">
                        <p className="text-xs font-weight-bold mb-0">{elem?.product_details?.[0]?.size}</p>
                    </td>
                    <td className="align-middle text-center">
                        <p className="text-xs font-weight-bold mb-0">
                            {
                                elem?.product_details?.[0]?.price
                                    ?
                                    Number(elem?.product_details?.[0]?.price)?.toLocaleString('en-US', { style: 'currency', currency: 'INR' })
                                    :
                                    Number(elem?.price)?.toLocaleString('en-US', { style: 'currency', currency: 'INR' })
                            }
                        </p>
                    </td>
                    <td className="align-middle text-center text-sm">
                        <p className="text-xs font-weight-bold mb-0">{elem?.qty}</p>
                    </td>
                    <td className="align-middle text-center">
                        <p className="text-xs font-weight-bold mb-0">
                            {
                                (Number(elem?.product_details?.[0]?.price ? elem?.product_details?.[0]?.price : elem?.price) * Number(elem?.qty))?.toLocaleString('en-US', { style: 'currency', currency: 'INR' })
                            }
                        </p>
                    </td>
                    <td className="align-middle text-center">
                        <p className="text-xs font-weight-bold mb-0">
                            {
                                elem?.tax?.length ?
                                    elem.tax.map((tax, i) => {
                                        return (
                                            <div key={i + 1}>
                                                {tax?.name} {tax?.percentage}%
                                            </div>
                                        )
                                    })
                                    :
                                    <div>{order?.tax}%</div>
                            }
                        </p>
                    </td>
                    <td className="text-center">
                        <span className="text-secondary text-xs font-weight-bold">{total_ammount?.toLocaleString('en-US', { style: 'currency', currency: 'INR' })}</span>
                    </td>
                    {/* <td className="align-middle">
                        <div className=" text-center px-2 py-1">
                            <Link className="cursor-pointer" id="dropdownTable" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="fa fa-ellipsis-v text-secondary" aria-hidden="true"></i>
                            </Link>
                            <ul className="dropdown-menu px-2 py-3 ms-sm-n4 ms-n5" aria-labelledby="dropdownTable" data-popper-placement="bottom-start">
                                <li><Link className="dropdown-item border-radius-md" to='/admin/orders/order'>Edit</Link></li>
                                <li><Link className="dropdown-item border-radius-md" to='#'>Delete</Link></li>
                            </ul>
                        </div>
                    </td> */}
                </tr>
            </React.Fragment>
        );
    });

    // Mapping Customer Details
    const customer = order?.shipping_address?.map((elem, index) => {
        return (
            <div className="card-body pt-4" key={index + 1}>
                <div className="d-flex align-items-center">
                    {/* <div className="sa-symbol sa-symbol--shape--circle sa-symbol--size--lg">
                        <img src={images.productThumbnail} width="40" height="40" alt="" />
                    </div> */}
                    <div className="ps-2">
                        <Link to='#'>
                            <h6 className="mb-0 text-sm">{elem.contact_person_name}</h6>
                            <p className="text-xs text-secondary mb-0">{order?.customer_id}</p>
                        </Link>
                    </div>
                </div>

                <div className="row">
                    <div className='mb-4'>
                        <div className="pt-4">
                            <h6 className="fs-exact-16 mb-0">Contact Details</h6>
                            <div className='pt-1'>
                                <p className='text-sm mb-1'>{order?.customer_id}</p>
                                <p className='text-sm mb-1'>{elem.phone}</p>
                            </div>
                        </div>
                        <div className="pt-4">
                            <h6 className="fs-exact-16 mb-0">Shipping Address</h6>
                            <div className='pt-1'>
                                <p className='text-sm mb-1'>
                                    {
                                        `${elem.address}, ${elem.city}, ${elem.state}, ${elem.zip}, ${elem.country}`
                                    }
                                </p>
                            </div>
                        </div>
                        <div className="pt-4">
                            <h6 className="fs-exact-16 mb-0">Billing Address</h6>
                            <div className='pt-1'>
                                <p className='text-sm mb-1'>
                                    {
                                        `${elem.address}, ${elem.city}, ${elem.state}, ${elem.zip}, ${elem.country}`
                                    }
                                </p>
                            </div>
                        </div>
                        {/* <div className="pt-4">
                            <h6 className="fs-exact-16 mb-0">Measurements</h6>
                            <div className='pt-1'>
                                <p className='text-sm mb-1'>
                                    <button className='btn btn-primary' onClick={() => setContentStatus(!contentStatus)}>View</button>
                                </p>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        );
    });

    // MAPPING MEASUREMENTS
    // const measures = order?.measurements?.map((elem, index) => {
    //     return (
    //         <div className="row" key={index + 1} id='printData'>
    //             <div className="col-12 d-flex justify-content-center">
    //                 <div className="unit-container px-3 text-center">
    //                     <h5>Height</h5>
    //                     <span className='secondary-color'>{elem?.height} {elem?.length_units}</span>
    //                 </div>
    //                 <div className="unit-container px-3 text-center">
    //                     <h5>Weight</h5>
    //                     <span className='secondary-color'>{elem?.weight} {elem?.weight_units}</span>
    //                 </div>
    //                 <div className="unit-container px-3 text-center">
    //                     <h5>Age</h5>
    //                     <span className='secondary-color'>{elem?.age}</span>
    //                 </div>
    //             </div>
    //             <div className="constitution">

    //                 <div className="options left">
    //                     <div className="property active" id="shoulder">
    //                         <div className="wrap">
    //                             <div className="title">Shoulders</div>
    //                             <div className="select">
    //                                 <div className="selector-content form_profile" rel="param_shoulders">
    //                                     <div
    //                                         className='option active'>{elem?.param_shoulders}</div>
    //                                 </div>
    //                             </div>

    //                         </div>
    //                     </div>
    //                     <div className="property active" id="stomach">
    //                         <div className="wrap">
    //                             <div className="title">Abdomen</div>
    //                             <div className="select">
    //                                 <div className="selector-content form_profile" rel="param_abdomen">
    //                                     <div
    //                                         className='option active'>{elem?.param_abdomen}</div>
    //                                 </div>
    //                             </div>

    //                         </div>
    //                     </div>
    //                     <div className="property active">
    //                         <div className="wrap">
    //                             <div className="title">Sleeves length</div>
    //                             <div className="select">
    //                                 <div className="selector-content form_profile">
    //                                     <div className='option active'>
    //                                         {elem?.measurement?.sleeves_length}
    //                                         <span className="weight-unit"> cm</span>
    //                                     </div>
    //                                 </div>
    //                             </div>

    //                         </div>
    //                     </div>
    //                     <div className="property active">
    //                         <div className="wrap">
    //                             <div className="title">Shoulder width</div>
    //                             <div className="select">
    //                                 <div className="selector-content form_profile">
    //                                     <div className='option active'>
    //                                         {elem?.measurement?.shoulders}
    //                                         <span className="weight-unit"> cm</span>
    //                                     </div>
    //                                 </div>
    //                             </div>

    //                         </div>
    //                     </div>
    //                     <div className="property active">
    //                         <div className="wrap">
    //                             <div className="title">Chest around</div>
    //                             <div className="select">
    //                                 <div className="selector-content form_profile">
    //                                     <div className='option active'>
    //                                         {elem?.measurement?.chest}
    //                                         <span className="weight-unit"> cm</span>
    //                                     </div>
    //                                 </div>
    //                             </div>

    //                         </div>
    //                     </div>
    //                     <div className="property active">
    //                         <div className="wrap">
    //                             <div className="title">Stomach</div>
    //                             <div className="select">
    //                                 <div className="selector-content form_profile">
    //                                     <div className='option active'>
    //                                         {elem?.measurement?.stomach}
    //                                         <span className="weight-unit"> cm</span>
    //                                     </div>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     </div>
    //                     <div className="property active">
    //                         <div className="wrap">
    //                             <div className="title">Neck</div>
    //                             <div className="select">
    //                                 <div className="selector-content form_profile">
    //                                     <div className='option active'>
    //                                         {elem?.measurement?.neck}
    //                                         <span className="weight-unit"> cm</span>
    //                                     </div>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     </div>
    //                     <div className="property active">
    //                         <div className="wrap">
    //                             <div className="title">Torso length</div>
    //                             <div className="select">
    //                                 <div className="selector-content form_profile">
    //                                     <div className='option active'>
    //                                         {elem?.measurement?.body_length}
    //                                         <span className="weight-unit"> cm</span>
    //                                     </div>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     </div>
    //                     <div className="property active">
    //                         <div className="wrap">
    //                             <div className="title">Bicep around</div>
    //                             <div className="select">
    //                                 <div className="selector-content form_profile">
    //                                     <div className='option active'>
    //                                         {elem?.measurement?.biceps}
    //                                         <span className="weight-unit"> cm</span>
    //                                     </div>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>

    //                 <div className="view">
    //                     <div className="front">
    //                         <img alt='' className="chest" src={`https://d2w9m16hs9jc37.cloudfront.net/images/measures/measures4/morphology/front/chest_${elem?.param_chest ? elem?.param_chest : 'base'}.svg`} />
    //                         <img alt='' className="shoulder" src={`https://d2w9m16hs9jc37.cloudfront.net/images/measures/measures4/morphology/front/shoulder_${elem?.param_shoulders ? elem?.param_shoulders : 'base'}.svg`} />
    //                         <img alt='' className="stomach" src={`https://d2w9m16hs9jc37.cloudfront.net/images/measures/measures4/morphology/front/stomach_${elem?.param_abdomen ? elem?.param_abdomen : 'base'}.svg`} />
    //                     </div>
    //                     <div className="side">
    //                         <img alt='' className="back" src={`https://d2w9m16hs9jc37.cloudfront.net/images/measures/measures4/morphology/side/back_${elem?.param_stance ? elem?.param_stance : 'base'}.svg`} />
    //                         <img alt='' className="chest" src={`https://d2w9m16hs9jc37.cloudfront.net/images/measures/measures4/morphology/side/chest_${elem?.param_chest ? elem?.param_chest : 'base'}.svg`} />
    //                         <img alt='' className="stomach" src={`https://d2w9m16hs9jc37.cloudfront.net/images/measures/measures4/morphology/side/stomach_${elem?.param_abdomen ? elem?.param_abdomen : 'base'}.svg`} />
    //                     </div>
    //                 </div>

    //                 <div className="options right">
    //                     <div className="property active" id="chest">
    //                         <div className="wrap">
    //                             <div className="title">Chest</div>
    //                             <div className="select">
    //                                 <div className="selector-content form_profile" rel="param_chest">
    //                                     <div
    //                                         className='option active'>{elem?.param_chest}</div>
    //                                 </div>
    //                             </div>

    //                         </div>
    //                     </div>
    //                     <div className="property active" id="back">
    //                         <div className="wrap">
    //                             <div className="title">Stance</div>
    //                             <div className="select">
    //                                 <div className="selector-content form_profile" rel="param_stance">
    //                                     <div
    //                                         rel="straight"
    //                                         className='option active'>{elem?.param_stance}</div>
    //                                 </div>
    //                             </div>

    //                         </div>
    //                     </div>
    //                     <div className="property active">
    //                         <div className="wrap">
    //                             <div className="title">Leg Length</div>
    //                             <div className="select">
    //                                 <div className="selector-content form_profile">
    //                                     <div className='option active'>
    //                                         {elem?.measurement?.pants_length}
    //                                         <span className="weight-unit"> cm</span>
    //                                     </div>
    //                                 </div>
    //                             </div>

    //                         </div>
    //                     </div>
    //                     <div className="property active">
    //                         <div className="wrap">
    //                             <div className="title">Pants Waist</div>
    //                             <div className="select">
    //                                 <div className="selector-content form_profile">
    //                                     <div className='option active'>
    //                                         {elem?.measurement?.pants_position}
    //                                         <span className="weight-unit"> cm</span>
    //                                     </div>
    //                                 </div>
    //                             </div>

    //                         </div>
    //                     </div>
    //                     <div className="property active">
    //                         <div className="wrap">
    //                             <div className="title">Hips</div>
    //                             <div className="select">
    //                                 <div className="selector-content form_profile">
    //                                     <div className='option active'>
    //                                         {elem?.measurement?.hips}
    //                                         <span className="weight-unit"> cm</span>
    //                                     </div>
    //                                 </div>
    //                             </div>

    //                         </div>
    //                     </div>
    //                     <div className="property active">
    //                         <div className="wrap">
    //                             <div className="title">Thigh</div>
    //                             <div className="select">
    //                                 <div className="selector-content form_profile">
    //                                     <div className='option active'>
    //                                         {elem?.measurement?.thigh}
    //                                         <span className="weight-unit"> cm</span>
    //                                     </div>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     </div>
    //                     <div className="property active">
    //                         <div className="wrap">
    //                             <div className="title">Rise</div>
    //                             <div className="select">
    //                                 <div className="selector-content form_profile">
    //                                     <div className='option active'>
    //                                         {elem?.measurement?.crotch}
    //                                         <span className="weight-unit"> cm</span>
    //                                     </div>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     </div>
    //                     <div className="property active">
    //                         <div className="wrap">
    //                             <div className="title">Wrist</div>
    //                             <div className="select">
    //                                 <div className="selector-content form_profile">
    //                                     <div className='option active'>
    //                                         {elem?.measurement?.wrist}
    //                                         <span className="weight-unit"> cm</span>
    //                                     </div>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>

    //             </div>
    //         </div>
    //     );
    // });

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <React.Fragment>
            <div className="container-fluid py-4">
                <div className="row">

                    {/* <div className="col-12">
                        <button className='btn btn-primary' onClick={() => setPrintStatus(!printStatus)}>Measurements & Print preview</button>
                    </div> */}

                    {/* Order Highlights */}
                    <div className="col-12">
                        <div className="card mb-4">
                            <div className="card-body p-0">
                                <div className="table-responsive p-0">
                                    <table className="table align-items-center mb-0">

                                        <tbody>
                                            <tr>
                                                <td>
                                                    <div className="d-flex px-2 py-1">
                                                        <div className="d-flex flex-column justify-content-center">
                                                            <h6 className="mb-0 text-sm">
                                                                {new Date(order?.created_at)?.toDateString()}
                                                                &nbsp;&nbsp;&nbsp;
                                                                {new Date(order?.created_at)?.toLocaleTimeString()}
                                                            </h6>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <p className="text-xs font-weight-bold mb-0">{order?.orderDetails?.length} items</p>
                                                </td>
                                                <td className="align-middle text-center text-sm">
                                                    <p className="text-xs font-weight-bold mb-0">Total {order?.grand_total.toLocaleString('en-US', { style: 'currency', currency: 'INR' })}</p>
                                                </td>
                                                <td className="align-middle text-center">
                                                    <span className="badge badge-sm bg-gradient-secondary">{order?.order_status}</span>
                                                </td>
                                            </tr>
                                        </tbody>

                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Order Details */}
                    <div className="col-md-8">
                        <div className="card mb-4">
                            <div className="card-header pb-0">
                                <h4>Items table</h4>
                            </div>
                            <div className="card-body px-0 pt-0 pb-2">

                                {/* Items List Table */}
                                <div className="table-responsive p-0" id="order-items">
                                    <table className="table align-items-center mb-0">
                                        <thead>
                                            <tr>
                                                <th className="text-uppercase text-secondary text-xs font-weight-bolder">Products</th>
                                                <th className="text-center text-uppercase text-secondary text-xs font-weight-bolder">Color</th>
                                                <th className="text-center text-uppercase text-secondary text-xs font-weight-bolder">Size</th>
                                                <th className="text-uppercase text-secondary text-xs font-weight-bolder ps-2">Unit Price</th>
                                                <th className="text-center text-uppercase text-secondary text-xs font-weight-bolder">Quantity</th>
                                                <th className="text-uppercase text-secondary text-xs font-weight-bolder ps-2">Price</th>
                                                <th className="text-uppercase text-secondary text-xs font-weight-bolder ps-2">Tax</th>
                                                <th className="text-center text-uppercase text-secondary text-xs font-weight-bolder">Total Amount</th>
                                                {/* <th className="text-center text-uppercase text-secondary text-xs font-weight-bolder">Action</th> */}
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {itemsList}
                                        </tbody>

                                    </table>
                                </div>

                                {/* Order Totaling Table */}
                                <div className="table-responsive p-0">
                                    <table className="table align-items-center mb-0">
                                        <tbody>
                                            <tr className='border-transparent'>
                                                <td colSpan={3}>
                                                    <div className="d-flex px-2 py-1">
                                                        <div className="d-flex flex-column justify-content-center">
                                                            <h6 className="mb-0">Subtotal</h6>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <p className="font-weight-bold mb-0 text-end pe-4">
                                                        {order?.sub_total?.toLocaleString('en-US', { style: 'currency', currency: 'INR' })}
                                                    </p>
                                                </td>

                                            </tr>
                                            <tr>
                                                <td colSpan={3}>
                                                    <div className="d-flex px-2 py-1">
                                                        <div className="d-flex flex-column justify-content-center">
                                                            <h6 className="mb-0">Loyalty Discount</h6>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <p className="font-weight-bold mb-0 text-end pe-4">
                                                        {Number(order?.royality_discount)?.toLocaleString('en-US', { style: 'currency', currency: 'INR' })}
                                                    </p>
                                                </td>

                                            </tr>
                                            <tr>
                                                <td colSpan={3}>
                                                    <div className="d-flex px-2 py-1">
                                                        <div className="d-flex flex-column justify-content-center">
                                                            <h6 className="mb-0">Shipping</h6>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <p className="font-weight-bold mb-0 text-end pe-4">
                                                        {order?.shipping_charge?.toLocaleString('en-US', { style: 'currency', currency: 'INR' })}
                                                    </p>
                                                </td>

                                            </tr>
                                            <tr>
                                                <td colSpan={3}>
                                                    <div className="d-flex px-2 py-1">
                                                        <div className="d-flex flex-column justify-content-center">
                                                            <h6 className="mb-0">Discount</h6>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <p className="font-weight-bold mb-0 text-end pe-4">
                                                        {order?.discount}%
                                                    </p>
                                                </td>

                                            </tr>
                                            <tr>
                                                <td colSpan={3}>
                                                    <div className="d-flex px-2 py-1">
                                                        <div className="d-flex flex-column justify-content-center">
                                                            <h6 className="mb-0">Total Tax</h6>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <p className="font-weight-bold mb-0 text-end pe-4">
                                                        {order?.tax}%
                                                    </p>
                                                </td>

                                            </tr>
                                            <tr>
                                                <td colSpan={3}>
                                                    <div className="d-flex px-2 py-1">
                                                        <div className="d-flex flex-column justify-content-center">
                                                            <h6 className="mb-0">Grand Total</h6>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <p className="font-weight-bold mb-0 text-end pe-4">
                                                        {order?.grand_total?.toLocaleString('en-US', { style: 'currency', currency: 'INR' })}
                                                    </p>
                                                </td>

                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Customer Details */}
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-body d-flex align-items-center justify-content-between pb-0 pt-4">
                                <h4 className="fs-exact-16 mb-0">Customer Details</h4>
                            </div>
                            {customer}
                        </div>
                        <button className='btn btn-primary mt-3 ms-1' onClick={() => setPrintStatus(!printStatus)}>Measurements & Print preview</button>
                    </div>
                </div>
            </div>

            {/* VIEW DATA */}
            {/* {contentStatus && <div className="password-popup">
                <div className="rts-newsletter-popup popup popup-large">
                    <div className="newsletter-close-btn" onClick={() => setContentStatus(!contentStatus)}>
                        <i className="fa fa-times"></i>
                    </div>
                    <div className="newsletter-inner popup-inner p-4">
                        <h3 className="newsletter-heading">Measurements</h3>
                        {measures}
                    </div>
                </div>
            </div>} */}

            {/* PRINT DATA */}
            {printStatus && <div className="password-popup">
                <div className="rts-newsletter-popup popup popup-large">
                    <div className="newsletter-close-btn" onClick={() => setPrintStatus(!printStatus)}>
                        <i className="fa fa-times"></i>
                    </div>

                    <div className="newsletter-inner popup-inner p-4">
                        <span className="newsletter-heading"><button className='btn btn-primary float-end' onClick={handlePrint}> <i className="fa fa-print"></i> print</button></span>
                        <PrintOrder order={order} ref={componentRef} />
                    </div>
                </div>
            </div>}
        </React.Fragment>
    );
};

export default EditOrder;