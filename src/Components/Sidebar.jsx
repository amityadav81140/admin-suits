import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { images } from "../assets/images";

const Sidebar = () => {

  // NAVBAR TOGGLING STATE
  const [navToggler, setNavToggler] = useState();
  // SIDEBAR MENUS STATE
  const [menus, setMenus] = useState(false);

  useEffect(() => {
    setNavToggler({
      ...navToggler,
      iconSidenav: document.getElementById("iconSidenav"),
      body: document.querySelector(".g-sidenav-show"),
      className: "g-sidenav-pinned",
    });
    fetchSidebar();
  }, []);

  // SIDEBAR TOGGLING METHOD
  function toggleSidenav() {
    if (navToggler?.body?.classList?.contains(navToggler?.className)) {
      navToggler?.body?.classList?.remove(navToggler?.className);
    } else {
      navToggler?.body?.classList?.add(navToggler?.className);
      navToggler?.iconSidenav?.classList?.remove("d-none");
    }
  };

  // FETCHING SIDEBAR MENUS (API CALL)
  const fetchSidebar = async () => {
    const token = window.sessionStorage.getItem("access-vs");
    await axios.post(`${process.env.REACT_APP_BASE_URL}admin/getSidebar`, {}, { headers: { 'Authorization': `Bearer ${token}` }, withCredentials: true }
    ).then(res => {
      setMenus(res.data.data);
    }).catch(error => {
      console.log(error);
    })
  };

  // MAPPING SIDEBAR MENUS
  const menusList = menus ? menus.map((menu, index) => {
    return (
      <li className="nav-item" key={index+1}>
        <Link data-bs-toggle={menu.submenus.length ? "collapse" : ''} to={menu.url} className="nav-link collapsed" aria-controls={menu.url.slice(1)} role="button" aria-expanded="false">
          <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center d-flex align-items-center justify-content-center  me-2">
            <i className={menu.icon}></i>
          </div>
          <span className="nav-link-text ms-1">{menu.name}</span>
        </Link>
        <div className="collapse" id={menu.url.slice(1)}>
          <ul className="nav ms-4 ps-3">
            {menu.submenus.length &&
              menu.submenus.map((subMenu, subIndex) => {
                return (
                  <li className="nav-item" key={subIndex+1}>
                    <Link data-bs-toggle={subMenu.submenus.length ? "collapse" : ''} to={subMenu.url} className="nav-link collapsed" aria-controls={subMenu.url.slice(1)} role="button" aria-expanded="false">
                      <span className="nav-link-text ms-1">{subMenu.name}</span>
                    </Link>
                    <div className="collapse" id={subMenu.url.slice(1)}>
                      <ul className="nav ms-4 ps-3">
                        {subMenu.submenus.length &&
                          subMenu.submenus.map((subSubMenu, subSubIndex) => {
                            return (
                              <li className="nav-item " key={subSubIndex+1}>
                                <Link className="nav-link  " to={subSubMenu.url}>
                                  <span className="sidenav-normal"> {subSubMenu.name} </span>
                                </Link>
                              </li>
                            );
                          })}
                      </ul>
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
      </li>
    );
  }) : '';

  return (
    <React.Fragment>
      <aside
        className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 "
        id="sidenav-main"
      >
        <div className="sidenav-header">
          <i
            className="fas fa-times p-3 cursor-pointer text-white position-absolute end-0 top-0 d-xl-none"
            aria-hidden="true"
            id="iconSidenav"
            onClick={toggleSidenav}
          ></i>
          <Link className="navbar-brand m-0" to="/admin/dashboard">
            <img
              src={images.logo}
              className="navbar-brand-img h-100"
              alt="logo"
            />
            <br></br>
            <h5 className="font-weight-bold text-white text-center pt-3">
              Admin Panel
            </h5>
          </Link>
        </div>
        <hr className="horizontal dark mt-0" />
        <div className="collapse navbar-collapse  w-auto " id="sidenav-collapse-main">
          <ul className="navbar-nav">
            {/* <li className="nav-item">
              <Link className="nav-link  " to="/admin/dashboard">
                <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                  <i className="fa fa-home"></i>
                </div>
                <span className="nav-link-text ms-1">Dashboard</span>
              </Link>
            </li>
            <li className="nav-item">
              <a data-bs-toggle="collapse" href="#employees" className="nav-link collapsed" aria-controls="employees" role="button" aria-expanded="false">
                <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center d-flex align-items-center justify-content-center  me-2">
                  <i className="fa fa-users"></i>
                </div>
                <span className="nav-link-text ms-1">Role & Permissions</span>
              </a>
              <div className="collapse" id="employees">
                <ul className="nav ms-4 ps-3">
                  <li className="nav-item ">
                    <Link className="nav-link" to="/admin/employee">
                      <span className="sidenav-mini-icon"> E </span>
                      <span className="sidenav-normal"> Employee </span>
                    </Link>
                  </li>
                  <li className="nav-item ">
                    <Link className="nav-link" to="/admin/role">
                      <span className="sidenav-mini-icon"> R </span>
                      <span className="sidenav-normal"> Role </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <a data-bs-toggle="collapse" href="#application" className="nav-link collapsed" aria-controls="application" role="button" aria-expanded="false">
                <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center d-flex align-items-center justify-content-center  me-2">
                  <i className="fa fa-desktop"></i>
                </div>
                <span className="nav-link-text ms-1">Application</span>
              </a>
              <div className="collapse" id="application">
                <ul className="nav ms-4 ps-3">
                  <li className="nav-item ">
                    <Link className="nav-link" to="/admin/settings">
                      <span className="sidenav-mini-icon"> S </span>
                      <span className="sidenav-normal"> Settings </span>
                    </Link>
                  </li>
                  <li className="nav-item ">
                    <Link className="nav-link" to="/admin/payments">
                      <span className="sidenav-mini-icon"> P </span>
                      <span className="sidenav-normal"> Payments </span>
                    </Link>
                  </li>
                  <li className="nav-item ">
                    <Link className="nav-link" to="/admin/contacts">
                      <span className="sidenav-mini-icon"> Co </span>
                      <span className="sidenav-normal"> Contact </span>
                    </Link>
                  </li>
                  <li className="nav-item ">
                    <Link className="nav-link" to="/admin/reviews">
                      <span className="sidenav-mini-icon"> Re </span>
                      <span className="sidenav-normal"> Reviews </span>
                    </Link>
                  </li>
                  <li className="nav-item ">
                    <Link className="nav-link" to="/admin/cta">
                      <span className="sidenav-mini-icon"> CTA </span>
                      <span className="sidenav-normal"> CTA </span>
                    </Link>
                  </li>
                  <li className="nav-item ">
                    <Link className="nav-link" to="/admin/customers">
                      <span className="sidenav-mini-icon"> Cu </span>
                      <span className="sidenav-normal"> Customers </span>
                    </Link>
                  </li>
                  <li className="nav-item ">
                    <Link className="nav-link" to="/admin/royalty-card">
                      <span className="sidenav-mini-icon"> RC </span>
                      <span className="sidenav-normal"> Royalty Card </span>
                    </Link>
                  </li>
                  <li className="nav-item ">
                    <Link className="nav-link" to="/admin/orders">
                      <span className="sidenav-mini-icon"> O </span>
                      <span className="sidenav-normal"> Orders </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <a data-bs-toggle="collapse" href="#pages" className="nav-link collapsed" aria-controls="pages" role="button" aria-expanded="false">
                <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center d-flex align-items-center justify-content-center  me-2">
                  <i className="fa fa-file"></i>
                </div>
                <span className="nav-link-text ms-1">Pages</span>
              </a>
              <div className="collapse" id="pages">
                <ul className="nav ms-4 ps-3">
                  <li className="nav-item ">
                    <Link className="nav-link  " to="/admin/faq">
                      <span className="sidenav-mini-icon"> FAQ </span>
                      <span className="sidenav-normal"> FAQs </span>
                    </Link>
                  </li>
                  <li className="nav-item ">
                    <Link className="nav-link  " to="/admin/our-story">
                      <span className="sidenav-mini-icon"> OS </span>
                      <span className="sidenav-normal"> Our Story </span>
                    </Link>
                  </li>
                  <li className="nav-item ">
                    <Link className="nav-link  " to="/admin/support">
                      <span className="sidenav-mini-icon"> S </span>
                      <span className="sidenav-normal"> Support </span>
                    </Link>
                  </li>
                  <li className="nav-item ">
                    <Link className="nav-link  " to="/admin/testimonials">
                      <span className="sidenav-mini-icon"> T </span>
                      <span className="sidenav-normal"> Testimonials </span>
                    </Link>
                  </li>
                  <li className="nav-item ">
                    <Link className="nav-link  " to="/admin/privacy-policy">
                      <span className="sidenav-mini-icon"> T </span>
                      <span className="sidenav-normal"> Privacy Policy </span>
                    </Link>
                  </li>
                  <li className="nav-item ">
                    <Link className="nav-link  " to="/admin/terms-&-conditions">
                      <span className="sidenav-mini-icon"> T </span>
                      <span className="sidenav-normal"> Terms & Conditions </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <a data-bs-toggle="collapse" href="#ecommerce" className="nav-link collapsed" aria-controls="ecommerce" role="button" aria-expanded="false">
                <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center d-flex align-items-center justify-content-center  me-2">
                  <i className="fa fa-store"></i>
                </div>
                <span className="nav-link-text ms-1">E-commerce</span>
              </a>
              <div className="collapse" id="ecommerce">
                <ul className="nav ms-4 ps-3">
                  <li className="nav-item">
                    <a data-bs-toggle="collapse" href="#color" className="nav-link collapsed" aria-controls="color" role="button" aria-expanded="false">
                      <span className="nav-link-text ms-1">Colours</span>
                    </a>
                    <div className="collapse" id="color">
                      <ul className="nav ms-4 ps-3">
                        <li className="nav-item ">
                          <Link className="nav-link  " to="/admin/colors">
                            <span className="sidenav-mini-icon"> CL </span>
                            <span className="sidenav-normal"> Colours List </span>
                          </Link>
                        </li>
                        <li className="nav-item ">
                          <Link className="nav-link  " to="/admin/colors/color">
                            <span className="sidenav-mini-icon"> AC </span>
                            <span className="sidenav-normal"> Add Colour </span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="nav-item">
                    <a data-bs-toggle="collapse" href="#category" className="nav-link collapsed" aria-controls="category" role="button" aria-expanded="false">
                      <span className="nav-link-text ms-1">Category</span>
                    </a>
                    <div className="collapse" id="category">
                      <ul className="nav ms-4 ps-3">
                        <li className="nav-item ">
                          <Link className="nav-link  " to="/admin/categories">
                            <span className="sidenav-mini-icon"> CL </span>
                            <span className="sidenav-normal"> Category List </span>
                          </Link>
                        </li>
                        <li className="nav-item ">
                          <Link className="nav-link  " to="/admin/categories/category">
                            <span className="sidenav-mini-icon"> AC </span>
                            <span className="sidenav-normal"> Add Category </span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="nav-item">
                    <a data-bs-toggle="collapse" href="#currency" className="nav-link collapsed" aria-controls="currency" role="button" aria-expanded="false">
                      <span className="nav-link-text ms-1">Currency</span>
                    </a>
                    <div className="collapse" id="currency">
                      <ul className="nav ms-4 ps-3">
                        <li className="nav-item ">
                          <Link className="nav-link  " to="/admin/currencies">
                            <span className="sidenav-mini-icon"> CL </span>
                            <span className="sidenav-normal"> Currency List </span>
                          </Link>
                        </li>
                        <li className="nav-item ">
                          <Link className="nav-link  " to="/admin/currencies/currency">
                            <span className="sidenav-mini-icon"> AC </span>
                            <span className="sidenav-normal"> Add Currency </span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="nav-item">
                    <a data-bs-toggle="collapse" href="#brands" className="nav-link collapsed" aria-controls="brands" role="button" aria-expanded="false">
                      <span className="nav-link-text ms-1">Brands</span>
                    </a>
                    <div className="collapse" id="brands">
                      <ul className="nav ms-4 ps-3">
                        <li className="nav-item ">
                          <Link className="nav-link  " to="/admin/brands">
                            <span className="sidenav-mini-icon"> CL </span>
                            <span className="sidenav-normal"> Brands List </span>
                          </Link>
                        </li>
                        <li className="nav-item ">
                          <Link className="nav-link  " to="/admin/brands/brand">
                            <span className="sidenav-mini-icon"> AC </span>
                            <span className="sidenav-normal"> Add Brand </span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="nav-item ">
                    <Link className="nav-link" to="/admin/attributes">
                      <span className="sidenav-mini-icon"> A </span>
                      <span className="sidenav-normal"> Attributes </span>
                    </Link>
                  </li>
                  <li className="nav-item ">
                    <a className="nav-link collapsed" data-bs-toggle="collapse" aria-expanded="false" href="#products">
                      <span className="sidenav-mini-icon"> P </span>
                      <span className="sidenav-normal">
                        Products <b className="caret"></b>
                      </span>
                    </a>
                    <div className="collapse" id="products">
                      <ul className="nav nav-sm flex-column">
                        <li className="nav-item ">
                          <Link className="nav-link  " to="/admin/products">
                            <span className="sidenav-mini-icon"> PL </span>
                            <span className="sidenav-normal"> Products List </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link " to="/admin/products/product">
                            <span className="sidenav-mini-icon text-xs"> N </span>
                            <span className="sidenav-normal"> New Product </span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="nav-item">
                    <a data-bs-toggle="collapse" href="#banners" className="nav-link collapsed" aria-controls="banners" role="button" aria-expanded="false">
                      <span className="nav-link-text ms-1">Banners</span>
                    </a>
                    <div className="collapse" id="banners">
                      <ul className="nav ms-4 ps-3">
                        <li className="nav-item ">
                          <Link className="nav-link  " to="/admin/home-banner">
                            <span className="sidenav-mini-icon"> HB </span>
                            <span className="sidenav-normal"> Home Banner </span>
                          </Link>
                        </li>
                        <li className="nav-item ">
                          <Link className="nav-link  " to="/admin/banners">
                            <span className="sidenav-mini-icon"> BL </span>
                            <span className="sidenav-normal"> Banners List </span>
                          </Link>
                        </li>
                        <li className="nav-item ">
                          <Link className="nav-link  " to="/admin/banners/banner">
                            <span className="sidenav-mini-icon"> BL </span>
                            <span className="sidenav-normal"> Add Banner </span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </li> */}

            {menusList}
          </ul>
        </div>
      </aside>
    </React.Fragment>
  );
};

export default Sidebar;
