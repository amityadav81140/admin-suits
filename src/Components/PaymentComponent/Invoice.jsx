import React from 'react';
import { Link } from 'react-router-dom';

const Invoice = React.forwardRef((props, ref) => {

    // Mpping List of Printable Orderd Items
    const printableItems = props?.details?.product_items?.map((elem, index) => {
        
        const product_price = (Number(elem?.product_details?.[0]?.price ? elem?.product_details?.[0]?.price : elem?.price) * Number(elem?.qty));
        
        const product_total_tax = elem?.tax?.length && elem?.tax !== "0" ? elem?.tax?.reduce((total, current) => {
            return total + current?.percentage;
        }, 0) : props?.details?.order_details?.[0]?.tax;

        const total_ammount =(product_price + ((product_total_tax / 100) * product_price));
        
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
                        <p className="text-xs font-weight-bold mb-0">{
                            (elem?.product_details?.[0]?.price ? Number(elem?.product_details?.[0]?.price) : Number(elem?.price))?.toLocaleString('en-US', { style: 'currency', currency: 'INR' })
                        }</p>
                    </td>
                    <td className="align-middle text-center text-sm">
                        <p className="text-xs font-weight-bold mb-0">{elem?.qty}</p>
                    </td>
                    <td className="align-middle text-center text-sm">
                        <p className="text-xs font-weight-bold mb-0">{
                            (Number(elem?.product_details?.[0]?.price ? elem?.product_details?.[0]?.price : elem?.price) * Number(elem?.qty))?.toLocaleString('en-US', { style: 'currency', currency: 'INR' })
                        }</p>
                    </td>
                    <td className="align-middle text-center text-sm">
                        <p className="text-xs font-weight-bold mb-0">{
                            elem?.tax?.length ?
                            elem.tax.map((tax,i)=>{
                                return(
                                    <div key={i+1}>
                                        {tax?.name} {tax?.percentage}%
                                    </div>
                                )
                            })
                            :
                            <div>{props?.details?.order_details?.[0]?.tax}%</div>
                        }</p>
                    </td>
                    <td className="align-middle text-center text-sm">
                        <p className="text-xs font-weight-bold mb-0">{total_ammount?.toLocaleString('en-US', { style: 'currency', currency: 'INR' })}</p>
                    </td>
                </tr>
            </React.Fragment>
        );
    });

    // Mapping Customer Details
    const customer = [props?.details?.shipping_address]?.map((elem, index) => {
        return (
            <div className="card-body pt-4" key={index + 1}>
                <div className="d-flex align-items-center">
                    <div className="ps-2">
                        <Link to='#'>
                            {/* <h5 className="mb-0"><span className='text-secondary'>Customer Name:- </span>{elem.contact_person_name}</h5> */}
                            {/* <p className="text-sm text-secondary mb-0">{props?.details?.costomer_email}</p> */}
                        </Link>
                    </div>
                </div>

                <div className="row mb-4">
                    {/* <div className='mb-4'> */}
                    <div className="pt-4 col-md-4">
                        <h6 className="fs-exact-16 mb-0">Customer Details</h6>
                        <div className='pt-1'>
                            <p className='text-sm text-bold mb-1 text-secondary'>{elem?.contact_person_name}</p>
                            <p className='text-sm mb-1'>Mobile: {elem.phone}</p>
                            <p className='text-sm mb-1'>Email: {props?.details?.costomer_email}</p>
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
        <div className="newsletter-inner popup-inner p-4" ref={ref}>
            <h2 className="newsletter-heading mb-3">Invoice</h2>

            {/* Invoice Details */}
            <p className="mb-0">
                <span className='text-bold'>Order Id:-</span>
                <span className=''>{props?.details?.order_details?.[0]?._id}</span>
            </p>
            <p className="mb-0">
                <span className='text-bold'>Invoice No.:-</span>
                <span className=''>{props?.details?.invoice_no}</span>
            </p>
            <p className="mb-0">
                <span className='text-bold'>Invoice Date:-</span>
                <span className=''>{(new Date(props?.details?.date_time)).toDateString()}</span>
            </p>

            {/* Customer Details */}
            {customer}
            <h3 className="newsletter-heading">Items</h3>
            <div className="col-12">
                <div className="card mb-4">
                    <div className="card-body px-0 pt-0 pb-2">

                        {/* Items List Table */}
                        <div className="table-responsive p-0">

                            <table className="table align-items-center mb-0">
                                <thead>
                                    <tr>
                                        <th className="text-uppercase text-secondary text-xs font-weight-bolder">Products</th>
                                        <th className="text-center text-uppercase text-secondary text-xs font-weight-bolder">Color</th>
                                        <th className="text-center text-uppercase text-secondary text-xs font-weight-bolder">Size</th>
                                        <th className="text-center text-uppercase text-secondary text-xs font-weight-bolder">Unit Price</th>
                                        <th className="text-center text-uppercase text-secondary text-xs font-weight-bolder">Quantity</th>
                                        <th className="text-center text-uppercase text-secondary text-xs font-weight-bolder">Price</th>
                                        <th className="text-center text-uppercase text-secondary text-xs font-weight-bolder">Tax</th>
                                        <th className="text-center text-uppercase text-secondary text-xs font-weight-bolder">Total</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {printableItems}
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
                                                {props?.details?.order_details?.[0]?.sub_total?.toLocaleString('en-US', { style: 'currency', currency: 'INR' })}
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
                                                {Number(props?.details?.order_details?.[0]?.royality_discount)?.toLocaleString('en-US', { style: 'currency', currency: 'INR' })}
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
                                                {props?.details?.order_details?.[0]?.shipping_charge?.toLocaleString('en-US', { style: 'currency', currency: 'INR' })}
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
                                                {props?.details?.order_details?.[0]?.discount}%
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
                                                {props?.details?.order_details?.[0]?.tax}%
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
                                                {props?.details?.order_details?.[0]?.grand_total?.toLocaleString('en-US', { style: 'currency', currency: 'INR' })}
                                            </p>
                                        </td>

                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
                {/* Transaction Details */}
                <div className="card mb-4">
                    <div className="card-body px-0 pt-0 pb-2">
                        <div className="card mb-4">
                            <div className="card-header pb-0">
                                <h6>Transactions</h6>
                            </div>
                            <div className="card-body px-0 pt-0 pb-2">
                                <div className="table-responsive p-0">
                                    <table className="table align-items-center mb-0">
                                        <thead>
                                            <tr>
                                                <th className="text-uppercase text-secondary text-xs font-weight-bolder">Payment Id</th>
                                                <th className="text-uppercase text-secondary text-xs font-weight-bolder">Invoice No.</th>
                                                <th className="text-uppercase text-secondary text-xs font-weight-bolder">Payment Type</th>
                                                <th className="text-uppercase text-secondary text-xs font-weight-bolder ps-2">Payment Method</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            <tr>
                                                <td>
                                                    <div className="d-flex px-2 py-1">
                                                        <div className="d-flex flex-column justify-content-center">
                                                            <h6 className="mb-0 text-sm">{props?.details?.payment_id}</h6>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <p className="text-xs font-weight-bold mb-0">{props?.details?.invoice_no}</p>
                                                </td>
                                                <td>
                                                    <p className="text-xs font-weight-bold mb-0">{props?.details?.transaction_type}</p>
                                                </td>
                                                <td>
                                                    <p className="text-xs font-weight-bold mb-0">{props?.details?.payment_method}</p>
                                                </td>
                                            </tr>
                                        </tbody>

                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default Invoice;