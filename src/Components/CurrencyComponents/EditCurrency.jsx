import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { currencySelector } from '../../Apis/Getters/currency';
import { UpdateData } from '../../Apis/Setters/UpdateData';
import { EditCurrencyContext } from '../../Context/EditCurrencyContext';

const EditCurrency = () => {

  // Using Edit Context Api of this Component
  const [id, setId] = useContext(EditCurrencyContext);
  const currencyDetails = useSelector(state=>currencySelector.selectById(state,id));
  // ERROR MESSAGE STATE
  const [errMsg, setErrMsg] = useState({
    status: false,
    message: '',
  });
  // SUCCESS MESSAGE STATE
  const [successMsg, setSuccessMsg] = useState({
    status: false,
    message: '',
  });
  // VALUES STATE
  const [details, setDetails] = useState({
    name: currencyDetails.name,
    symbol: currencyDetails.symbol,
    code: currencyDetails.code,
    exchange_rate: currencyDetails.exchange_rate,
    status: currencyDetails.status,
    id: id,
  });
  // METHOD TO SET DETAILS IN details STATE VARIABLE
  const handleDetails = (e) => {
    const { name, value } = e.target;
    setDetails({
      ...details,
      [name]: value,
    });
  };

  // HANDLING API CALL METHOD
  const currency = (e) => {
    e.preventDefault();

    let credentials = { ...details }

    const response = UpdateData({ url: 'currency/update', cred: credentials });
    response.then(res => {
      window.scrollTo(0, 0);
      if (res.data.status) {
        setSuccessMsg({
          status: true,
          message: res.data.message,
        });
        setErrMsg({
          status: false,
          message: '',
        });
      } else {
        setErrMsg({
          status: true,
          message: res.data.message,
        });
        setSuccessMsg({
          status: false,
          message: '',
        });
      }
    }).catch((AxiosError) => {
      console.log(AxiosError.response.data.errors);
    });
  };

  return (
    <React.Fragment>
      <form onSubmit={currency}>
        <div className="container-fluid py-5 row">
          {/* DISPLAY ERROR MESSAGE */}
          {errMsg.status &&
            <div className="alert alert-danger alert-dismissible fade show text-white" role="alert">{errMsg.message}<button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => {
              setErrMsg({
                status: false,
                message: '',
              });
            }}></button>
            </div>
          }

          {/* DISPLAY SUCCESS MESSAGE */}
          {successMsg.status &&
            <div className="alert alert-success alert-dismissible fade show text-white" role="alert">{successMsg.message}<button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => {
              setSuccessMsg({
                status: false,
                message: '',
              });
            }}></button>
            </div>
          }

          <div className="col-md-8 mb-5">
            {/* Basic Information Card */}
            <div className="card">
              <div className="card-body p-md-5">
                <div className="mb-5">
                  <h5 className="mb-0 fs-exact-18">Edit Currency</h5>
                </div>
                <div className="row">
                  <div className="mb-4 col-md-6">
                    <label htmlFor="form-currency/name" className="form-label">
                      Currency Name
                    </label>
                    <input
                      type="text"
                      name='name'
                      className="form-control"
                      id="form-currency/name"
                      value={details.name}
                      onChange={handleDetails}
                      required
                    />
                  </div>
                  <div className="mb-4 col-md-6">
                    <label htmlFor="form-currency/symbol" className="form-label">
                      Currency Symbol HTML Code
                    </label>
                    <input
                      type="text"
                      name='symbol'
                      className="form-control"
                      id="form-currency/symbol"
                      value={details.symbol}
                      onChange={handleDetails}
                      required
                    />
                  </div>
                  <div className="mb-4 col-md-6">
                    <label htmlFor="form-currency/code" className="form-label">
                      Currency Country Code
                    </label>
                    <input
                      type="text"
                      name='code'
                      className="form-control"
                      id="form-currency/code"
                      value={details.code}
                      onChange={handleDetails}
                      required
                    />
                  </div>
                  <div className="mb-4 col-md-6">
                    <label htmlFor="form-currency/exchange_rate" className="form-label">
                      Currency Exchange Rate
                    </label>
                    <input
                      type="number"
                      name='exchange_rate'
                      className="form-control"
                      id="form-currency/exchange_rate"
                      value={details.exchange_rate}
                      onChange={handleDetails}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <input type="submit" className="btn btn-outline-primary btn-sm mb-0" value="Save" />

                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            {/* Visibility Card */}
            <div className="card w-100">
              <div className="card-body p-md-5">
                <div className="mb-5">
                  <h5 className="mb-0 fs-exact-18">Visibility</h5>
                </div>
                <div className="mb-4">
                  <label className="form-check">
                    <input type="radio" className="form-check-input" name="status" onChange={handleDetails} value={1} required />
                    <span className="form-check-label">Default</span>
                  </label>
                  <label className="form-check mb-0">
                    <input type="radio" className="form-check-input" name="status" onChange={handleDetails} value={0} required />
                    <span className="form-check-label">Not Default</span>
                  </label>
                </div>
              </div>
            </div>

          </div>
        </div>
      </form>
    </React.Fragment>
  );
};

export default EditCurrency;