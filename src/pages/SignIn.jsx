import axios from "axios";
import React, { useState } from "react";
// sign-in page background image
import curved6 from "../assets/img/curved-images/tailor_img.png";
// footer component
import Footer from "../Components/Footer";

const SignIn = () => {

  // REMEMBER ME STATE
  // const [remember, setRemember] = useState(false);

  // LOGIN ERROR STATE
  const [loginErr, setLoginErr] = useState({
    status: false,
    message: '',
  });

  // LOGING INPUT VALUES STATE
  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: "",
    // remember: false,
  });

  // METHOD TO SET LOGING USER CREDENTIALS IN loginCredentials STATE VARIABLE
  const handleLogin = (e) => {
    const { name, value } = e.target;
    setLoginCredentials({
      ...loginCredentials,
      [name]: value,
    });
  };

  // LOGIN HANDLING METHOD(API CALL)
  const signIn = (e) => {
    e.preventDefault();
    let credentials = {
      ...loginCredentials,
      // remember: remember,
    }

    axios.post(`${process.env.REACT_APP_BASE_URL}login`, credentials, { withCredentials: true })
      .then(res => {
        // console.log(res.data.data.token);
        if (res.data.status) {
          window.sessionStorage.setItem("access-vs", res.data.data.token);
          // setRemember(false);
          setLoginCredentials({
            email: "",
            password: "",
            // remember: false,
          });
          window.location.href = "/admin";
        } else {
          setLoginErr({
            status: true,
            message: res.data.message,
          });
        }
      })
      .catch((AxiosError) => {
        console.log(AxiosError.response.data.errors);
      });

  };

  return (
    <React.Fragment>
      <main className="main-content  mt-0">
        <section id="sign-in">
          <div className="page-header h-100">
            <div className="container-fluid m-0 p-0 h-100">
              <div className="row h-100">
                <div className="col-xl-4 col-lg-5 col-md-6 d-flex flex-column mx-auto justify-content-center pb-5">
                  <div className="card card-plain mt-8">
                    <div className="card-header pb-0 text-left bg-transparent">
                      <h3 className="font-weight-bolder text-info text-gradient">
                        Welcome Back
                      </h3>
                      <p className="mb-0">
                        Enter your email and password to sign in
                      </p>
                      {/* ------------------- LOGIN FORM ERROR MESSAGE -------------------- */}
                      {loginErr.status &&
                        <div className="alert alert-danger alert-dismissible fade show text-white" role="alert">{loginErr.message}<button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => {
                          setLoginErr({
                            status: false,
                            message: '',
                          });
                        }}></button>
                        </div>
                      }
                    </div>
                    <div className="card-body">
                      <form onSubmit={signIn}>
                        {/* <label>Email</label> */}
                        <div className="mb-3">
                          <input
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="Email"
                            aria-label="Email"
                            aria-describedby="email-addon"
                            onChange={handleLogin}
                            value={loginCredentials.email}
                            required
                          />
                        </div>
                        {/* <label>Password</label> */}
                        <div className="mb-3">
                          <input
                            type="password"
                            name="password"
                            className="form-control"
                            placeholder="Password"
                            aria-label="Password"
                            aria-describedby="password-addon"
                            onChange={handleLogin}
                            value={loginCredentials.password}
                            required
                          />
                        </div>
                        {/* <div className="form-check form-switch">
                          <input
                            name="remember"
                            className="form-check-input"
                            type="checkbox"
                            id="rememberMe"
                            onClick={() => setRemember(!remember)}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="rememberMe"
                          >
                            Remember me
                          </label>
                        </div> */}
                        <div className="text-center">
                          <button
                            type="submit"
                            className="btn bg-gradient-info w-100 mt-4 mb-0"
                          >
                            Sign in
                          </button>
                        </div>
                      </form>
                    </div>
                    {/* <div className="card-footer text-center pt-0 px-lg-2 px-1">
                      <p className="mb-4 text-sm mx-auto">
                        Don't have an account?
                        <a href="" className="text-info text-gradient font-weight-bold">Sign up</a>
                      </p>
                    </div> */}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="oblique top-0 h-100 d-md-block d-none me-n8">
                    <div
                      className="oblique-image bg-cover ms-auto h-100 z-index-0"
                      style={{ backgroundImage: `url(${curved6})` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </React.Fragment>
  );
};

export default SignIn;
