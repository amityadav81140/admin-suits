import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { customersSelector } from "../../Apis/Getters/customers";
import { CustomerDetailsContext } from "../../Context/CustomerDetailsContext";
import { EditOrdersContext } from "../../Context/EditOrdersContext";

const Customer = () => {

    // Using Details Context Api
    const [id, setId] = useContext(CustomerDetailsContext);
    // Using Edit Context Api of this Component
    const [orderId, setOrderId] = useContext(EditOrdersContext);

    // SELECTING CUSTOMER BY ID FROM REDUX STATE
    const customerDetails = useSelector(state => customersSelector.selectById(state, id));

    // MAPPING CUSTOMER ORDERS
    const customerOrders = customerDetails?.orders?.map((elem, index) => {
        return (
            <tr key={index+1}>
                <td>
                    <div className="d-flex px-2 py-1">
                        <div className="d-flex flex-column justify-content-center">
                            <h6 className="mb-0 text-sm" onClick={() => setOrderId(elem?._id)}>
                                <Link to={'/admin/orders/order/' + elem?._id}>{elem?._id}</Link>
                            </h6>
                        </div>
                    </div>
                </td>
                <td>
                    <p className="text-xs font-weight-bold mb-0">
                        {(new Date(elem?.created_at))?.toDateString()}
                    </p>
                </td>
                <td className="align-middle text-center">
                    <div className="d-flex px-2 py-1">
                        <div className="d-flex flex-column justify-content-center">
                            <div className="badge bg-primary">{elem?.order_status}</div>
                        </div>
                    </div>
                </td>
                <td className="align-middle text-center">
                    <div className=" text-center px-2 py-1">
                        <div className=" text-center">
                            <span className="text-sm">{elem?.grand_total?.toLocaleString('en-US', { style: 'currency', currency: 'INR' })}</span>
                        </div>
                    </div>
                </td>
            </tr>
        );
    });

    const grandTotal = customerDetails?.orders?.reduce((total, current)=>{
        const sales = total + Number(current?.grand_total);
        return sales;
    },0);

    return (
        <React.Fragment>
            <div className="container-fluid py-4">
                <div className="row">
                    {/* Customer Details */}
                    <div className="col-md-4 mb-5">
                        <div className="card">
                            <div className="card-body pt-4">
                                <div className="row">
                                    <div className="col-auto">
                                        <div className="avatar avatar-xl position-relative">
                                            <img src={customerDetails?.profile_image} alt="profile_image" className="w-100 border-radius-lg shadow-sm" />
                                        </div>
                                    </div>
                                    <div className="col-auto my-auto">
                                        <div className="h-100">
                                            <h5 className="mb-1">
                                                {customerDetails?.name}
                                            </h5>
                                            {/* <p className="mb-0 font-weight-bold text-sm">
                                                CEO / Co-Founder
                                            </p> */}
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="mb-4">
                                        <div className="pt-4">
                                            <h6 className="fs-exact-16 mb-0">Registered</h6>
                                            <div className="pt-1">
                                                <p className="text-sm mb-1">{(new Date(customerDetails?.created_at)).toDateString()}</p>
                                            </div>
                                        </div>
                                        <div className="pt-4">
                                            <h6 className="fs-exact-16 mb-0">Royalty Points</h6>
                                            <div className="pt-1">
                                                <p className="text-sm mb-1">{customerDetails?.royality_point}</p>
                                            </div>
                                        </div>
                                        <div className="pt-4">
                                            <h6 className="fs-exact-16 mb-0">Contact Details</h6>
                                            <div className="pt-1">
                                                <p className="text-sm mb-1">{customerDetails?.email}</p>
                                                <p className="text-sm mb-1">{customerDetails?.mobile}</p>
                                            </div>
                                        </div>
                                        <div className="pt-4">
                                            <h6 className="fs-exact-16 mb-0">Addresses</h6>
                                            <div className="pt-1">
                                                <p className="text-sm mb-1">
                                                    {customerDetails?.shipping_address?.address}<br />
                                                    {customerDetails?.shipping_address?.city}, <br />
                                                    {customerDetails?.shipping_address?.state},{customerDetails?.shipping_address?.zip}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="pt-4">
                                            <h6 className="fs-exact-16 mb-0">Shipping Address</h6>
                                            <div className="pt-1">
                                                <p className="text-sm mb-1">
                                                    {customerDetails?.shipping_address?.address}<br />
                                                    {customerDetails?.shipping_address?.city}, <br />
                                                    {customerDetails?.shipping_address?.state},{customerDetails?.shipping_address?.zip}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Order Details */}
                    <div className="col-md-8">
                        <div className="card mb-4">
                            <div className="card-header pb-0">
                                <h4>Orders table</h4>
                            </div>
                            <div className="card-body px-0 pt-0 pb-2">
                                <div className="table-responsive p-0">
                                    <table className="table align-items-center mb-0">
                                        <thead>
                                            <tr>
                                                <th className="text-uppercase text-secondary text-xs font-weight-bolder">
                                                    Order No.
                                                </th>
                                                <th className="text-uppercase text-secondary text-xs font-weight-bolder ps-2">
                                                    Date
                                                </th>
                                                <th className="text-center text-uppercase text-secondary text-xs font-weight-bolder">
                                                    Status
                                                </th>
                                                <th className="text-center text-uppercase text-secondary text-xs font-weight-bolder">
                                                    Total
                                                </th>
                                                {/* <th className="text-center text-uppercase text-secondary text-xs font-weight-bolder">Action</th> */}
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {customerOrders.length ? customerOrders : <h4 className="m-3 w-100">No orders found!</h4>}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="card mb-4">
                            <div className="table-responsive p-0">
                                <table className="table align-items-center mb-0">
                                    <tbody>
                                        <tr>
                                            <td colSpan={3}>
                                                <div className="d-flex px-2 py-1">
                                                    <div className="d-flex flex-column justify-content-center">
                                                        <h6 className="mb-0">Total Orders</h6>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <p className="font-weight-bold mb-0 text-end pe-4">
                                                    {customerDetails?.orders?.length}
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan={3}>
                                                <div className="d-flex px-2 py-1">
                                                    <div className="d-flex flex-column justify-content-center">
                                                        <h6 className="mb-0">Total Spend</h6>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <p className="font-weight-bold mb-0 text-end pe-4">
                                                    {Number(grandTotal?.toFixed(2))?.toLocaleString('en-US', { style: 'currency', currency: 'INR' })}
                                                </p>
                                            </td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Customer;
