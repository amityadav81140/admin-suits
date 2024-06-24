import React from 'react';
import { Link } from 'react-router-dom';

const PrintOrder = React.forwardRef((props, ref) => {

    // Mpping List of Printable Orderd Items
    const printableItems = props?.order?.orderDetails?.map((elem, index) => {
        return (
            <React.Fragment>
                <tr key={index + 1}>
                    <td>
                        <div className="d-flex px-2 py-1">
                            <div>
                                <img src={elem?.product_image} className="avatar avatar-sm me-3" alt="user1" />
                            </div>
                            <div className="d-flex flex-column justify-content-center">
                                <h6 className="mb-0 text-sm">{elem?.product_name}</h6>
                            </div>
                        </div>
                    </td>
                    <td className="align-middle text-center text-sm">
                        <p className="text-xs font-weight-bold mb-0">{elem?.product_details?.[0]?.color}</p>
                    </td>
                    <td className="align-middle text-center text-sm">
                        <p className="text-xs font-weight-bold mb-0">{elem?.product_details?.[0]?.size}</p>
                    </td>
                    <td className="align-middle text-center text-sm">
                        <p className="text-xs font-weight-bold mb-0">{elem?.qty}</p>
                    </td>
                </tr>
            </React.Fragment>
        );
    });

    // MAPPING MEASUREMENTS
    const measures = props?.order?.measurements?.map((elem, index) => {
        return (
            <div className="row pagebreak" key={index + 1}>
                <div className="col-12 d-flex justify-content-center">
                    <div className="unit-container px-3 text-center">
                        <h5>Height</h5>
                        <span className='secondary-color'>{elem?.height} {elem?.length_units}</span>
                    </div>
                    <div className="unit-container px-3 text-center">
                        <h5>Weight</h5>
                        <span className='secondary-color'>{elem?.weight} {elem?.weight_units}</span>
                    </div>
                    <div className="unit-container px-3 text-center">
                        <h5>Age</h5>
                        <span className='secondary-color'>{elem?.age}</span>
                    </div>
                </div>
                <div className="constitution">

                    <div className="options left">
                        <div className="property active" id="shoulder">
                            <div className="wrap">
                                <div className="title">Shoulders</div>
                                <div className="select">
                                    <div className="selector-content form_profile" rel="param_shoulders">
                                        <div
                                            className='option active'>{elem?.param_shoulders}</div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="property active" id="stomach">
                            <div className="wrap">
                                <div className="title">Abdomen</div>
                                <div className="select">
                                    <div className="selector-content form_profile" rel="param_abdomen">
                                        <div
                                            className='option active'>{elem?.param_abdomen}</div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="property active">
                            <div className="wrap">
                                <div className="title">Sleeves length</div>
                                <div className="select">
                                    <div className="selector-content form_profile">
                                        <div className='option active'>
                                            {elem?.measurement?.sleeves_length}
                                            <span className="weight-unit"> cm</span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="property active">
                            <div className="wrap">
                                <div className="title">Shoulder width</div>
                                <div className="select">
                                    <div className="selector-content form_profile">
                                        <div className='option active'>
                                            {elem?.measurement?.shoulders}
                                            <span className="weight-unit"> cm</span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="property active">
                            <div className="wrap">
                                <div className="title">Chest around</div>
                                <div className="select">
                                    <div className="selector-content form_profile">
                                        <div className='option active'>
                                            {elem?.measurement?.chest}
                                            <span className="weight-unit"> cm</span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="property active">
                            <div className="wrap">
                                <div className="title">Stomach</div>
                                <div className="select">
                                    <div className="selector-content form_profile">
                                        <div className='option active'>
                                            {elem?.measurement?.stomach}
                                            <span className="weight-unit"> cm</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="property active">
                            <div className="wrap">
                                <div className="title">Neck</div>
                                <div className="select">
                                    <div className="selector-content form_profile">
                                        <div className='option active'>
                                            {elem?.measurement?.neck}
                                            <span className="weight-unit"> cm</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="property active">
                            <div className="wrap">
                                <div className="title">Torso length</div>
                                <div className="select">
                                    <div className="selector-content form_profile">
                                        <div className='option active'>
                                            {elem?.measurement?.body_length}
                                            <span className="weight-unit"> cm</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="property active">
                            <div className="wrap">
                                <div className="title">Bicep around</div>
                                <div className="select">
                                    <div className="selector-content form_profile">
                                        <div className='option active'>
                                            {elem?.measurement?.biceps}
                                            <span className="weight-unit"> cm</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="view">
                        <div className="front">
                            <img alt='' className="chest" src={`https://d2w9m16hs9jc37.cloudfront.net/images/measures/measures4/morphology/front/chest_${elem?.param_chest ? elem?.param_chest : 'base'}.svg`} />
                            <img alt='' className="shoulder" src={`https://d2w9m16hs9jc37.cloudfront.net/images/measures/measures4/morphology/front/shoulder_${elem?.param_shoulders ? elem?.param_shoulders : 'base'}.svg`} />
                            <img alt='' className="stomach" src={`https://d2w9m16hs9jc37.cloudfront.net/images/measures/measures4/morphology/front/stomach_${elem?.param_abdomen ? elem?.param_abdomen : 'base'}.svg`} />
                        </div>
                        <div className="side">
                            <img alt='' className="back" src={`https://d2w9m16hs9jc37.cloudfront.net/images/measures/measures4/morphology/side/back_${elem?.param_stance ? elem?.param_stance : 'base'}.svg`} />
                            <img alt='' className="chest" src={`https://d2w9m16hs9jc37.cloudfront.net/images/measures/measures4/morphology/side/chest_${elem?.param_chest ? elem?.param_chest : 'base'}.svg`} />
                            <img alt='' className="stomach" src={`https://d2w9m16hs9jc37.cloudfront.net/images/measures/measures4/morphology/side/stomach_${elem?.param_abdomen ? elem?.param_abdomen : 'base'}.svg`} />
                        </div>
                    </div>

                    <div className="options right">
                        <div className="property active" id="chest">
                            <div className="wrap">
                                <div className="title">Chest</div>
                                <div className="select">
                                    <div className="selector-content form_profile" rel="param_chest">
                                        <div
                                            className='option active'>{elem?.param_chest}</div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="property active" id="back">
                            <div className="wrap">
                                <div className="title">Stance</div>
                                <div className="select">
                                    <div className="selector-content form_profile" rel="param_stance">
                                        <div
                                            rel="straight"
                                            className='option active'>{elem?.param_stance}</div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="property active">
                            <div className="wrap">
                                <div className="title">Leg Length</div>
                                <div className="select">
                                    <div className="selector-content form_profile">
                                        <div className='option active'>
                                            {elem?.measurement?.pants_length}
                                            <span className="weight-unit"> cm</span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="property active">
                            <div className="wrap">
                                <div className="title">Pants Waist</div>
                                <div className="select">
                                    <div className="selector-content form_profile">
                                        <div className='option active'>
                                            {elem?.measurement?.pants_position}
                                            <span className="weight-unit"> cm</span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="property active">
                            <div className="wrap">
                                <div className="title">Hips</div>
                                <div className="select">
                                    <div className="selector-content form_profile">
                                        <div className='option active'>
                                            {elem?.measurement?.hips}
                                            <span className="weight-unit"> cm</span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="property active">
                            <div className="wrap">
                                <div className="title">Thigh</div>
                                <div className="select">
                                    <div className="selector-content form_profile">
                                        <div className='option active'>
                                            {elem?.measurement?.thigh}
                                            <span className="weight-unit"> cm</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="property active">
                            <div className="wrap">
                                <div className="title">Rise</div>
                                <div className="select">
                                    <div className="selector-content form_profile">
                                        <div className='option active'>
                                            {elem?.measurement?.crotch}
                                            <span className="weight-unit"> cm</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="property active">
                            <div className="wrap">
                                <div className="title">Wrist</div>
                                <div className="select">
                                    <div className="selector-content form_profile">
                                        <div className='option active'>
                                            {elem?.measurement?.wrist}
                                            <span className="weight-unit"> cm</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    });

    // Mapping Customer Details
    const customer = props?.order?.shipping_address?.map((elem, index) => {
        return (
            <div className="card-body pt-4" key={index + 1}>
                <div className="d-flex align-items-center">
                    <div className="ps-2">
                        <Link to='#'>
                            <h6 className="mb-0">{elem.contact_person_name}</h6>
                            <p className="text-sm text-secondary mb-0">{props?.order?.customer_id}</p>
                        </Link>
                    </div>
                </div>

                <div className="row mb-4">
                    {/* <div className='mb-4'> */}
                        <div className="pt-4 col-md-4">
                            <h6 className="fs-exact-16 mb-0">Contact Details</h6>
                            <div className='pt-1'>
                                <p className='text-sm mb-1'>{props?.order?.customer_id}</p>
                                <p className='text-sm mb-1'>{elem.phone}</p>
                            </div>
                        </div>
                        <div className="pt-4 col-md-4">
                            <h6 className="fs-exact-16 mb-0">Shipping Address</h6>
                            <div className='pt-1'>
                                <p className='text-sm mb-1'>
                                    {
                                        `${elem.address}, ${elem.city}, ${elem.state}, ${elem.zip}, ${elem.country}`
                                    }
                                </p>
                            </div>
                        </div>
                        <div className="pt-4 col-md-4">
                            <h6 className="fs-exact-16 mb-0">Billing Address</h6>
                            <div className='pt-1'>
                                <p className='text-sm mb-1'>
                                    {
                                        `${elem.address}, ${elem.city}, ${elem.state}, ${elem.zip}, ${elem.country}`
                                    }
                                </p>
                            </div>
                        </div>
                    {/* </div> */}
                </div>
            </div>
        );
    });

    return (
        // <React.Fragment>
        <div className="newsletter-inner popup-inner p-4" ref={ref}>
            <h3 className="newsletter-heading m-0">Customer Details</h3>
            <p className="text-sm mb-0">Order Id:- <span className='text-secondary'>{props?.order?._id}</span></p>
            {customer}
            <h3 className="newsletter-heading">Items</h3>
            <div className="col-12">
                <div className="card mb-4">
                    <div className="card-body px-0 pt-0 pb-2">
                        <div className="table-responsive p-0">

                            <table className="table align-items-center mb-0">
                                <thead>
                                    <tr>
                                        <th className="text-uppercase text-secondary text-xs font-weight-bolder">Products</th>
                                        <th className="text-center text-uppercase text-secondary text-xs font-weight-bolder">Color</th>
                                        <th className="text-center text-uppercase text-secondary text-xs font-weight-bolder">Size</th>
                                        <th className="text-center text-uppercase text-secondary text-xs font-weight-bolder">Quantity</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {printableItems}
                                </tbody>

                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <h3 className="newsletter-heading">Measurements</h3>
            {measures}
        </div>
        // </React.Fragment>
    );
});

export default PrintOrder;