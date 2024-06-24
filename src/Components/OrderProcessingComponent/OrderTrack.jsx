import React, { useContext, useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import axios from "axios";
import { EditOrdersContext } from "../../Context/EditOrdersContext";
import "../../assets/css/Track.css";

const OrderTrack = () => {

  // Using Edit Context Api of this Component
  const [id, setId] = useContext(EditOrdersContext);
  // ORDER TRACK STATE
  const [track, setTrack] = useState([]);
  // FETCHING USER AUTH TOKEN
  const token = window.sessionStorage.getItem("access-vs");
  useEffect(() => {
    fetchTrack(token);
  }, []);

  // FETCHING ORDER TRACK
  const fetchTrack = async (token) => {
    await axios.post(
      `${process.env.REACT_APP_BASE_URL}admin/orderProcessing/track`,
      { order_id: id },
      { headers: { 'Authorization': `Bearer ${token}` }, withCredentials: true }
    ).then(res => {
      if (res.data.status) {
        setTrack(res?.data?.data?.history);
      }
    }).catch(err => {
      console.log(err);
    })
  };

  // MAPPING ORDER TRACK
  const orderTrack = track?.map((elem, index) => {
    return (
      <React.Fragment key={index + 1}>
        <div className="span-container d-flex  align-items-center">
          {/* <span className="dot"></span> */}
          <i class="fas fa-dot-circle me-3"></i>
          <div className="d-flex">
            <span className="me-3">{elem?.event_time}</span>
            <span>{elem?.location}</span>
          </div>
        </div>
        {track.length === index + 1 ? '' : <hr className="flex-fill track-line" />}
      </React.Fragment>
    );
  });

  return (
    <React.Fragment>
      <section className="vh-100">
        <MDBContainer className="h-100">
          <MDBRow className="h-100">
            <MDBCol>
              <MDBCard
                className="card-stepper"
                style={{ borderRadius: "10px" }}
              >
                <MDBCardHeader className="px-4 py-5 primary-bottom-border">
                  <MDBRow>
                    <MDBCol md="12">
                      <MDBTypography
                        tag="h5"
                        className="text-muted mb-0 primary-color"
                      >
                        Your order status{" "}
                      </MDBTypography>
                    </MDBCol>
                  </MDBRow>
                </MDBCardHeader>
                <MDBCardBody className="p-4">
                  <div className="d-flex flex-column justify-content-between">
                    {track.length ? orderTrack : <h2>Status not found</h2>}
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </React.Fragment>
  );
};

export default OrderTrack;