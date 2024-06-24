import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "/node_modules/flag-icons/css/flag-icons.min.css";

const Header = () => {
    
    const [navToggler, setNavToggler] = useState();

    // Current Path of the page
    const cPath = useLocation().pathname.split('/');
    
    // Mapping the current page name to the navbar
    const path = ()=>{
        return cPath?.slice(1).map((elem,index,arr)=>{
            arr?.splice(2);
            return (
                <li className="breadcrumb-item text-sm text-dark active" aria-current="page" key={index+1}>
                    <Link className="opacity-5 text-dark fw-bold" to={`/admin/`+elem}>
                        {elem.charAt(0).toUpperCase() + elem.slice(1)}
                    </Link>
                </li>
            );
        });
    };


    useEffect(() => {
        setNavToggler({
            ...navToggler,
            iconSidenav: document.getElementById('iconSidenav'),
            body: document.querySelector('.g-sidenav-show'),
            className: 'g-sidenav-pinned',
        });
    }, []);
    
    function toggleSidenav() {
        if (navToggler.body.classList.contains(navToggler.className)) {
            navToggler.body.classList.remove(navToggler.className);

        } else {
            navToggler.body.classList.add(navToggler.className);
            navToggler.iconSidenav.classList.remove('d-none');
        }
    }

    return (
        <React.Fragment>
            <nav
                className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl"
                id="navbarBlur"
                navbar-scroll="true"
            >
                <div className="container-fluid py-1 px-3">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                            {/* <li className="breadcrumb-item text-sm">
                                <Link className="opacity-5 text-dark" to="/admin/">
                                    Admin
                                </Link>
                            </li> */}
                            {path()}
                        </ol>
                        <h5 className="font-weight-bolder mb-0">
                            {cPath.slice(-1).toString().charAt(0).toUpperCase() + cPath.slice(-1).toString().slice(1).toUpperCase()}
                        </h5>
                    </nav>
                    <div
                        className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4"
                        id="navbar"
                    >
                        <div className="ms-md-auto pe-md-3 d-flex align-items-center">
                            {/* {cPath.slice(-1).toString() == 'dashboard' && <div className="input-group">
                                <span className="input-group-text text-body">
                                    <i className="fas fa-search" aria-hidden="true"></i>
                                </span>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Type here..."
                                />
                            </div>} */}
                        </div>
                        <ul className="navbar-nav  justify-content-end">
                            <li className="nav-item d-xl-none ps-3 d-flex align-items-center">
                                <a href="#" className="nav-link text-body p-0" id="iconNavbarSidenav" onClick={toggleSidenav}>
                                    <div className="sidenav-toggler-inner">
                                        <i className="sidenav-toggler-line"></i>
                                        <i className="sidenav-toggler-line"></i>
                                        <i className="sidenav-toggler-line"></i>
                                    </div>
                                </a>
                            </li>
                            <li className="nav-item px-3 d-flex align-items-center">
                                <Link to="/admin/settings" className="nav-link text-body p-0">
                                    <i className="fa fa-cog fixed-plugin-button-nav cursor-pointer"></i>
                                </Link>
                            </li>
                            <li className="nav-item dropdown pe-2 d-flex align-items-center">
                                <Link
                                    to="#"
                                    className="nav-link text-body p-0"
                                    id="dropdownMenuButton"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                    title="Sign out"
                                    onClick={()=>{
                                        window.sessionStorage.setItem("access-vs", '');
                                        window.location.href = '/admin'
                                    }}
                                >
                                    <i className="fa fa-sign-out-alt"></i>
                                    {/* <i className="fa fa-bell cursor-pointer"></i> */}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </React.Fragment>
    );
};

export default Header;