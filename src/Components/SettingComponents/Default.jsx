import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSettings } from '../../Apis/Getters/settings';

const Default = () => {

  // USING REDUX DISPACHER HOOK
  const dispatch = useDispatch();

  // FETCHING SETTINGS
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchSettings());
  }, []);

  return (
    <React.Fragment>
      <div className="container-fluid py-4">
        <div className="row g-4">
          <div className="col-md-6 col-lg-3">
            <div className="card text-center">
              <Link
                to='/admin/settings/general'
                className="text-reset p-5 text-decoration-none sa-hover-area"
              >
                <div className="fs-4 mb-4 text-muted opacity-50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-box"
                  >
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                    <line x1="12" y1="22.08" x2="12" y2="12"></line>
                  </svg>
                </div>
                <h2 className="fs-6 fw-medium mb-3">General</h2>
                <div className="text-muted fs-exact-14">
                  General Store Settings
                </div>
              </Link>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="card text-center">
              <Link
                to='/admin/settings/admin'
                className="text-reset p-5 text-decoration-none sa-hover-area"
              >
                <div className="fs-4 mb-4 text-muted opacity-50">
                  <i className="far fa-user"></i>
                </div>
                <h2 className="fs-6 fw-medium mb-3">Admin</h2>
                <div className="text-muted fs-exact-14">
                  Administrator Settings
                </div>
              </Link>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="card text-center">
              <Link
                to='/admin/settings/navbar'
                className="text-reset p-5 text-decoration-none sa-hover-area"
              >
                <div className="fs-4 mb-4 text-muted opacity-50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-credit-card"
                  >
                    <rect
                      x="1"
                      y="4"
                      width="22"
                      height="16"
                      rx="2"
                      ry="2"
                    ></rect>
                    <line x1="1" y1="10" x2="23" y2="10"></line>
                  </svg>
                </div>
                <h2 className="fs-6 fw-medium mb-3">Navbar</h2>
                <div className="text-muted fs-exact-14">
                  Navigation Bar Settings
                </div>
              </Link>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="card text-center">
              <Link
                to='/admin/settings/payment'
                className="text-reset p-5 text-decoration-none sa-hover-area"
              >
                <div className="fs-4 mb-4 text-muted opacity-50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-dollar-sign"
                  >
                    <line x1="12" y1="1" x2="12" y2="23"></line>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                  </svg>
                </div>
                <h2 className="fs-6 fw-medium mb-3">Payment</h2>
                <div className="text-muted fs-exact-14">
                  Payment Gateway Settings
                </div>
              </Link>
            </div>
          </div>
          <div className="col-6 col-md-4 col-lg-3">
            <div className="card text-center">
              <Link
                to='/admin/settings/pickup'
                className="text-reset p-5 text-decoration-none sa-hover-area"
              >
                <div className="fs-4 mb-4 text-muted opacity-50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-truck"
                  >
                    <rect x="1" y="3" width="15" height="13"></rect>
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                    <circle cx="5.5" cy="18.5" r="2.5"></circle>
                    <circle cx="18.5" cy="18.5" r="2.5"></circle>
                  </svg>
                </div>
                <h2 className="fs-6 fw-medium mb-3">Warehouse</h2>
                <div className="text-muted fs-exact-14">
                  Warehouse Pickup Point Settings
                </div>
              </Link>
            </div>
          </div>
          <div className="col-6 col-md-4 col-lg-3">
            <div className="card text-center">
              <Link
                to='/admin/settings/shipping-partner'
                className="text-reset p-5 text-decoration-none sa-hover-area"
              >
                <div className="fs-4 mb-4 text-muted opacity-50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-users"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <h2 className="fs-6 fw-medium mb-3">Shipping Partner</h2>
                <div className="text-muted fs-exact-14">
                  Shipping Partner Credentials Settings
                </div>
              </Link>
            </div>
          </div>
          <div className="col-6 col-md-4 col-lg-3">
            <div className="card text-center">
              <Link
                to='/admin/settings/tax'
                className="text-reset p-5 text-decoration-none sa-hover-area"
              >
                <div className="fs-4 mb-4 text-muted opacity-50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-percent"
                  >
                    <line x1="19" y1="5" x2="5" y2="19"></line>
                    <circle cx="6.5" cy="6.5" r="2.5"></circle>
                    <circle cx="17.5" cy="17.5" r="2.5"></circle>
                  </svg>
                </div>
                <h2 className="fs-6 fw-medium mb-3">Taxes</h2>
                <div className="text-muted fs-exact-14">
                  Taxes Percentage Settings
                </div>
              </Link>
            </div>
          </div>
          {/* <div className="col-6 col-md-4 col-lg-3">
            <div className="card text-center">
              <Link
                to='#!'
                className="text-reset p-5 text-decoration-none sa-hover-area"
              >
                <div className="fs-4 mb-4 text-muted opacity-50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-mail"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <h2 className="fs-6 fw-medium mb-3">Emails</h2>
                <div className="text-muted fs-exact-14">
                  As evidenced by tallies found on bone
                </div>
              </Link>
            </div>
          </div>
          <div className="col-6 col-md-4 col-lg-3">
            <div className="card text-center">
              <Link
                to='#!'
                className="text-reset p-5 text-decoration-none sa-hover-area"
              >
                <div className="fs-4 mb-4 text-muted opacity-50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-dollar-sign"
                  >
                    <line x1="12" y1="1" x2="12" y2="23"></line>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                  </svg>
                </div>
                <h2 className="fs-6 fw-medium mb-3">Currency</h2>
                <div className="text-muted fs-exact-14">
                  Three leading types of definition of mathematics today
                </div>
              </Link>
            </div>
          </div>
          <div className="col-6 col-md-4 col-lg-3">
            <div className="card text-center">
              <Link
                to='#!'
                className="text-reset p-5 text-decoration-none sa-hover-area"
              >
                <div className="fs-4 mb-4 text-muted opacity-50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-globe"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                  </svg>
                </div>
                <h2 className="fs-6 fw-medium mb-3">Languages</h2>
                <div className="text-muted fs-exact-14">
                  An early definition of mathematics in terms
                </div>
              </Link>
            </div>
          </div>
          <div className="col-6 col-md-4 col-lg-3">
            <div className="card text-center">
              <Link
                to='#!'
                className="text-reset p-5 text-decoration-none sa-hover-area"
              >
                <div className="fs-4 mb-4 text-muted opacity-50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-unlock"
                  >
                    <rect
                      x="3"
                      y="11"
                      width="18"
                      height="11"
                      rx="2"
                      ry="2"
                    ></rect>
                    <path d="M7 11V7a5 5 0 0 1 9.9-1"></path>
                  </svg>
                </div>
                <h2 className="fs-6 fw-medium mb-3">Privacy</h2>
                <div className="text-muted fs-exact-14">
                  Mathematics arises from many different kinds of problems
                </div>
              </Link>
            </div>
          </div>
          <div className="col-6 col-md-4 col-lg-3">
            <div className="card text-center">
              <Link
                to='#!'
                className="text-reset p-5 text-decoration-none sa-hover-area"
              >
                <div className="fs-4 mb-4 text-muted opacity-50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-percent"
                  >
                    <line x1="19" y1="5" x2="5" y2="19"></line>
                    <circle cx="6.5" cy="6.5" r="2.5"></circle>
                    <circle cx="17.5" cy="17.5" r="2.5"></circle>
                  </svg>
                </div>
                <h2 className="fs-6 fw-medium mb-3">Taxes</h2>
                <div className="text-muted fs-exact-14">
                  Most of the mathematical notation
                </div>
              </Link>
            </div>
          </div>
          <div className="col-6 col-md-4 col-lg-3">
            <div className="card text-center">
              <Link
                to='#!'
                className="text-reset p-5 text-decoration-none sa-hover-area"
              >
                <div className="fs-4 mb-4 text-muted opacity-50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-truck"
                  >
                    <rect x="1" y="3" width="15" height="13"></rect>
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                    <circle cx="5.5" cy="18.5" r="2.5"></circle>
                    <circle cx="18.5" cy="18.5" r="2.5"></circle>
                  </svg>
                </div>
                <h2 className="fs-6 fw-medium mb-3">Shipping</h2>
                <div className="text-muted fs-exact-14">
                  The study of quantity starts with numbers
                </div>
              </Link>
            </div>
          </div>
          <div className="col-6 col-md-4 col-lg-3">
            <div className="card text-center">
              <Link
                to='#!'
                className="text-reset p-5 text-decoration-none sa-hover-area"
              >
                <div className="fs-4 mb-4 text-muted opacity-50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-users"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <h2 className="fs-6 fw-medium mb-3">Users</h2>
                <div className="text-muted fs-exact-14">
                  Practical applications for what began
                </div>
              </Link>
            </div>
          </div> */}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Default;