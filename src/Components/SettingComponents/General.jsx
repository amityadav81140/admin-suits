import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { settingsSelector } from '../../Apis/Getters/settings';
import FileUpload from '../../Apis/Setters/FileUpload';
import { UpdateData } from '../../Apis/Setters/UpdateData';

const General = () => {

  // SETTINGS ERROR STATE
  const [settingsErr, setSettingsErr] = useState({
    status: false,
    message: '',
  });
  // SETTINGS Success STATE
  const [settingsSuccess, setSettingsSuccess] = useState({
    status: false,
    message: '',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [settingsSuccess]);

  // GETTING STORE IDENTITY
  const store = useSelector(state => settingsSelector.selectAll(state)).filter(e => {
    return e?.key === "storeIdentity";
  });
  const storeId = store?.[0]?.value?.[0];

  // STORE IDENTITY SETTINGS INPUT VALUES STATE
  const [storeIdentity, setStoreIdentity] = useState({
    headerLogo: storeId?.headerLogo,
    footerLogo: storeId?.footerLogo,
    storeName: storeId?.storeName,
    description: storeId?.description,
    copyright: storeId?.copyright,
  });

  // METHOD TO SET STORE IDENTITY SETTINGS CREDENTIALS IN storeIdentity STATE VARIABLE
  const handleStoreIdentity = (e) => {
    const { name, value } = e.target;
    setStoreIdentity({
      ...storeIdentity,
      [name]: value,
    });
  };

  // GETTING CONTACT DETAILS
  const contactData = useSelector(state => settingsSelector.selectAll(state)).filter(e => {
    return e?.key === "contactDetails";
  });
  const contacts = contactData?.[0]?.value?.[0];

  // CONTACT DETAILS SETTINGS INPUT VALUES STATE
  const [contactDeatils, setContactDeatils] = useState({
    phone: contacts?.phone,
    email: contacts?.email,
    address: contacts?.address,
  });

  // METHOD TO SET CONTACT DETAILS SETTINGS CREDENTIALS IN contactDeatils STATE VARIABLE
  const handleContactDeatils = (e) => {
    const { name, value } = e.target;
    setContactDeatils({
      ...contactDeatils,
      [name]: value,
    });
  };

  // GETTING SOCIAL LINKS
  const socialData = useSelector(state => settingsSelector.selectAll(state)).filter(e => {
    return e?.key === "storeSocialLinks";
  });
  const socialDetails = socialData?.[0]?.value?.[0];

  // SOCIAL LINKS SETTINGS INPUT VALUES STATE
  const [socialLinks, setSocialLinks] = useState({
    facebook: socialDetails?.facebook,
    instagram: socialDetails?.instagram,
    twitter: socialDetails?.twitter,
    linkedin: socialDetails?.linkedin,
  });

  // METHOD TO SET SOCIAL LINKS CREDENTIALS IN socialLinks STATE VARIABLE
  const handleSocialLinks = (e) => {
    const { name, value } = e.target;
    setSocialLinks({
      ...socialLinks,
      [name]: value,
    });
  };

  // STORE IDENTITY FILE UPLOAD METHOD(API CALL)
  const fileUpload = (e) => {
    const field = e.target.name;
    const response = FileUpload({ file: e.target.files[0], path: 'store' });
    response.then(res => {
      // console.log(res.data.data._id);
      if (res.data.status) {
        if (field == 'headerLogo') {
          setStoreIdentity({
            ...storeIdentity,
            headerLogo: res.data.data._id,
          });
        } else {
          setStoreIdentity({
            ...storeIdentity,
            footerLogo: res.data.data._id,
          });
        }
      } else {
        setSettingsErr({
          status: true,
          message: res.data.message,
        });
      }
    }).catch((AxiosError) => {
      console.log(AxiosError.response.data.errors);
    });

  };

  // STORE SETTINGS HANDLING METHOD(API CALL)
  const settings = (e) => {
    e.preventDefault();

    let credentials = {
      'type': '',
      'value': [{}],
    };

    switch (e.target.name) {
      case 'storeIdentity':
        credentials = {
          'type': 'storeIdentity',
          'value': [{ ...storeIdentity }],
        }
        break;
      case 'storeContact':
        credentials = {
          'type': 'contactDetails',
          'value': [{ ...contactDeatils }],
        }
        break;
      case 'storeSocialLinks':
        credentials = {
          'type': 'storeSocialLinks',
          'value': [{ ...socialLinks }],
        }
        break;

      default:
        break;
    };

    const response = UpdateData({ url: 'business_settings_save', cred: credentials });
    response.then(res => {
      window.scrollTo(0, 0);
      if (res.data.status) {
        setSettingsSuccess({
          status: true,
          message: res.data.message,
        });
        setSettingsErr({
          status: false,
          message: '',
        });
      } else {
        setSettingsErr({
          status: true,
          message: res.data.message,
        });
        setSettingsSuccess({
          status: false,
          message: '',
        });
      }
    }).catch((AxiosError) => {
      console.log(AxiosError.response.data.errors);
    });

  };

  return (
    <div className="container-fluid py-4">
      <div className="row g-4">

        {/* DISPLAY ERROR MESSAGE */}
        {settingsErr.status &&
          <div className="alert alert-danger alert-dismissible fade show text-white" role="alert">{settingsErr.message}<button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => {
            setSettingsErr({
              status: false,
              message: '',
            });
          }}></button>
          </div>
        }

        {/* DISPLAY SUCCESS MESSAGE */}
        {settingsSuccess.status &&
          <div className="alert alert-success alert-dismissible fade show text-white" role="alert">{settingsSuccess.message}<button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => {
            setSettingsSuccess({
              status: false,
              message: '',
            });
          }}></button>
          </div>
        }

        <div className="card mb-3">
          <div className="card-body p-5">
            <h5>Store Identity Settings</h5>
            <form onSubmit={settings} name='storeIdentity'>
              <div className="row">
                <div className="mb-4 col-md-6">
                  <label htmlFor="form-settings/headerLogo" className="form-label">Header Logo</label>
                  <input type="file" name='headerLogo' className="form-control" id="form-settings/headerLogo"
                    // value={storeIdentity.headerLogo.name} 
                    onChange={fileUpload} />
                </div>
                <div className="mb-4 col-md-6">
                  <label htmlFor="form-settings/footerLogo" className="form-label">Footer Logo</label>
                  <input type="file" name='footerLogo' className="form-control" id="form-settings/footerLogo" onChange={fileUpload} />
                </div>
                <div className="mb-4">
                  <label htmlFor="form-settings/name" className="form-label">Store Name</label>
                  <input type="text" name='storeName' className="form-control" id="form-settings/name" value={storeIdentity.storeName} onChange={handleStoreIdentity} required />
                </div>
                <div className="mb-4">
                  <label htmlFor="form-settings/description" className="form-label">Store Description</label>
                  <input type="text" name='description' className="form-control" id="form-settings/description" value={storeIdentity.description} onChange={handleStoreIdentity} required />
                </div>
                <div className="mb-4">
                  <label htmlFor="form-settings/copyright" className="form-label">Store Copyright</label>
                  <input type="text" name='copyright' className="form-control" id="form-settings/copyright" value={storeIdentity.copyright} onChange={handleStoreIdentity} required />
                </div>
              </div>
              <div className="mb-4">
                <input type="submit" className="btn btn-outline-primary btn-sm mb-0" value='Save' />
              </div>
            </form>
          </div>
        </div>

        <div className="card mb-3">
          <div className="card-body p-5">
            <h5>Contact Details Settings</h5>
            <form onSubmit={settings} name='storeContact'>
              <div className="mb-4">
                <label htmlFor="form-settings/phone" className="form-label">Phone Number</label>
                <input type="tel" name='phone' className="form-control" id="form-settings/email" aria-describedby="form-settings/email/help" value={contactDeatils.phone} onChange={handleContactDeatils} required />
              </div>
              <div className="mb-4">
                <label htmlFor="form-settings/email" className="form-label">Email Address</label>
                <input type="email" name='email' className="form-control" id="form-settings/email" aria-describedby="form-settings/email/help" value={contactDeatils.email} onChange={handleContactDeatils} required />
              </div>
              <div className="mb-4">
                <label htmlFor="form-settings/address" className="form-label">Address</label>
                <input type="text" name='address' className="form-control" id="form-settings/email" aria-describedby="form-settings/email/help" value={contactDeatils.address} onChange={handleContactDeatils} required />
              </div>
              <div className="mb-4">
                <input type="submit" className="btn btn-outline-primary btn-sm mb-0" value='Save' />
              </div>
            </form>
          </div>
        </div>

        <div className="card mb-3">
          <div className="card-body p-5">
            <h5>Social Links Settings</h5>
            <form onSubmit={settings} name='storeSocialLinks'>
              <div className="row">
                <div className="mb-4 col-md-6">
                  <label htmlFor="form-settings/facebook" className="form-label">Facebook</label>
                  <input type="text" name='facebook' className="form-control" id="form-settings/facebook" value={socialLinks.facebook} onChange={handleSocialLinks} required />
                </div>
                <div className="mb-4 col-md-6">
                  <label htmlFor="form-settings/instagram" className="form-label">Instagram</label>
                  <input type="text" name='instagram' className="form-control" id="form-settings/instagram" value={socialLinks.instagram} onChange={handleSocialLinks} required />
                </div>
                <div className="mb-4 col-md-6">
                  <label htmlFor="form-settings/twitter" className="form-label">Twitter</label>
                  <input type="text" name='twitter' className="form-control" id="form-settings/twitter" value={socialLinks.twitter} onChange={handleSocialLinks} required />
                </div>
                <div className="mb-4 col-md-6">
                  <label htmlFor="form-settings/linkedin" className="form-label">Linkedin</label>
                  <input type="text" name='linkedin' className="form-control" id="form-settings/linkedin" value={socialLinks.linkedin} onChange={handleSocialLinks} required />
                </div>
                <div className="mb-4">
                  <input type="submit" className="btn btn-outline-primary btn-sm mb-0" value='Save' />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

  );
};

export default General;