import React, { useContext, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { paymentsSelector } from '../../Apis/Getters/payments';
import { PaymentsContext } from '../../Context/PaymentsContext';
import Invoice from './Invoice';

const PaymentDetails = () => {

  // CHANGE PRINT POPUP STATE
  const [printStatus, setPrintStatus] = useState(false);
  // USING CONTEXT API
  const [id, setId] = useContext(PaymentsContext);

  // SELECTING PAYMENT DETAILS FROM REDUX STATE
  const paymentsDetails = useSelector(state => paymentsSelector.selectById(state, id));

  // CREATING INVOICE REF TO BE PRINTED
  const componentRef = useRef();
  // HANDLING REF & PRINTING INVOICE USING REACT TO PRINT
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  // console.log(paymentsDetails)
  return (
    <React.Fragment>
      <div className="container-fluid py-4">
        <div className="row">

          <div className="col-12">
            <button className='btn btn-primary' onClick={() => setPrintStatus(!printStatus)}>Download Invoice</button>
          </div>

          {/* Order Highlights */}
          <div className="col-12">
            <div className="card mb-4">
              <div className="card-body p-0">
                <div className="table-responsive p-0">
                  <table className="table align-items-center mb-0">

                    <tbody>
                      <tr>
                        <td>
                          <p className="text-xs font-weight-bold mb-0"><span className='secondary-color text-md'>Order id:- </span>{paymentsDetails?.order_details?.[0]?._id}</p>
                        </td>
                        <td>
                          <div className="d-flex px-2 py-1">
                            <div className="d-flex flex-column justify-content-center">
                              <h6 className="mb-0 text-sm">{(new Date(paymentsDetails?.date_time))?.toDateString()} {(new Date(paymentsDetails?.date_time))?.toLocaleTimeString()}</h6>
                            </div>
                          </div>
                        </td>
                        <td>
                          <p className="text-xs font-weight-bold mb-0">{paymentsDetails?.product_items?.length}</p>
                        </td>
                        <td className="align-middle text-center text-sm">
                          <p className="text-xs font-weight-bold mb-0">Total {paymentsDetails?.amount?.toLocaleString('en-US', { style: 'currency', currency: 'INR' })}</p>
                        </td>
                        <td className="align-middle text-center">
                          <span className="badge badge-sm bg-gradient-secondary">{paymentsDetails?.payment_status}</span>
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
                <div className="table-responsive p-0">

                  <table className="table align-items-center mb-0">
                    <thead>
                      <tr>
                        <th className="text-uppercase text-secondary text-xs font-weight-bolder">Products</th>
                        <th className="text-uppercase text-secondary text-xs font-weight-bolder ps-2">Price</th>
                        <th className="text-center text-uppercase text-secondary text-xs font-weight-bolder">Quantity</th>
                        <th className="text-center text-uppercase text-secondary text-xs font-weight-bolder">Total</th>
                      </tr>
                    </thead>

                    <tbody>
                      {paymentsDetails?.product_items?.map((elem, index) => {
                        return (
                          <tr key={index + 1}>
                            <td>
                              <Link to='#'>
                                <div className="d-flex px-2 py-1">
                                  <div>
                                    <img src={elem?.product_image} className="avatar avatar-sm me-3" alt={elem?.product_name} />
                                  </div>
                                  <div className="d-flex flex-column justify-content-center">
                                    <h6 className="mb-0 text-sm">{elem?.product_name}</h6>
                                  </div>
                                </div>
                              </Link>
                            </td>
                            <td>
                              <p className="text-xs font-weight-bold mb-0">{
                                (elem?.product_details?.[0]?.price ? Number(elem?.product_details?.[0]?.price) : Number(elem?.price))?.toLocaleString('en-US', { style: 'currency', currency: 'INR' })
                              }</p>
                            </td>
                            <td className="align-middle text-center text-sm">
                              <p className="text-xs font-weight-bold mb-0">{elem?.qty}</p>
                            </td>
                            <td className="align-middle text-center">
                              <span className="text-secondary text-xs font-weight-bold">{
                                (Number(elem?.product_details?.[0]?.price ? elem?.product_details?.[0]?.price : elem?.price) * Number(elem?.qty))?.toLocaleString('en-US', { style: 'currency', currency: 'INR' })
                              }</span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>

                  </table>
                </div>
              </div>
            </div>

            {/* Transaction Details */}
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
                              <h6 className="mb-0 text-sm">{paymentsDetails?.payment_id}</h6>
                            </div>
                          </div>
                        </td>
                        <td>
                          <p className="text-xs font-weight-bold mb-0">{paymentsDetails?.invoice_no}</p>
                        </td>
                        <td>
                          <p className="text-xs font-weight-bold mb-0">{paymentsDetails?.transaction_type}</p>
                        </td>
                        <td>
                          <p className="text-xs font-weight-bold mb-0">{paymentsDetails?.payment_method}</p>
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
              <div className="card-body pt-4">
                <div className="d-flex align-items-center">
                  <div className="sa-symbol sa-symbol--shape--circle sa-symbol--size--lg">
                    <img src={paymentsDetails?.costomer_profile_img} width="40" height="40" alt="" />
                  </div>
                  <div className="ps-2">
                    <Link to='#'>
                      <h6 className="mb-0 text-sm">{paymentsDetails?.costomer_name}</h6>
                      {/* <p className="text-xs text-secondary mb-0">#123456</p> */}
                    </Link>
                  </div>
                </div>

                <div className="row">
                  <div className='mb-4'>
                    <div className="pt-4">
                      <h6 className="fs-exact-16 mb-0">Contact Details</h6>
                      <div className='pt-1'>
                        <p className='text-sm mb-1'>{paymentsDetails?.costomer_email}</p>
                        <p className='text-sm mb-1'>{paymentsDetails?.costomer_mobile}</p>
                      </div>
                    </div>
                    <div className="pt-4">
                      <h6 className="fs-exact-16 mb-0">Shipping Address</h6>
                      <div className='pt-1'>
                        <p className='text-sm mb-1'>{
                          `${paymentsDetails?.shipping_address?.address}, ${paymentsDetails?.shipping_address?.city}, ${paymentsDetails?.shipping_address?.state}, ${paymentsDetails?.shipping_address?.zip}, ${paymentsDetails?.shipping_address?.country}`
                        }</p>
                      </div>
                    </div>
                    <div className="pt-4">
                      <h6 className="fs-exact-16 mb-0">Billing Address</h6>
                      <div className='pt-1'>
                        <p className='text-sm mb-1'>{
                          `${paymentsDetails?.shipping_address?.address}, ${paymentsDetails?.shipping_address?.city}, ${paymentsDetails?.shipping_address?.state}, ${paymentsDetails?.shipping_address?.zip}, ${paymentsDetails?.shipping_address?.country}`
                        }</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* PRINT INVOICE DATA */}
      {printStatus && <div className="password-popup">
        <div className="rts-newsletter-popup popup popup-large">
          <div className="newsletter-close-btn" onClick={() => setPrintStatus(!printStatus)}>
            <i className="fa fa-times"></i>
          </div>

          <div className="newsletter-inner popup-inner p-4">
            <span className="newsletter-heading"><button className='btn btn-primary float-end' onClick={handlePrint}> <i className="fa fa-print"></i> print</button></span>
            {/* INVOICE COMPONENT */}
            <Invoice details={paymentsDetails} ref={componentRef} />
          </div>
        </div>
      </div>}
    </React.Fragment>
  );
};

export default PaymentDetails;