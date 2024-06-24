import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSettings, settingsSelector } from '../../Apis/Getters/settings';
import { UpdateData } from '../../Apis/Setters/UpdateData';
import EditorComponent from '../EditorComponent';

const TermsConditions = () => {

  // USING REDUX DISPACHER HOOK
  const dispatch = useDispatch();
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

  // FETCHING SETTINGS
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchSettings());
  }, [successMsg]);

  // GETTING TERMS & CONDTIONS
  const conditions = useSelector(state => settingsSelector.selectAll(state)).filter(e => {
    return e?.key === "tesrms&conditions";
  });
  const tesrms_conditions = conditions?.[0]?.value?.[0];
  // HTML DATA INSIDE TEXT EDITOR
  const [value, setValue] = useState(tesrms_conditions);
  console.log(value)
  
  // FINAL SUBMIT
  const page = (e) => {
    e.preventDefault();
    const credentials = {
      type: 'tesrms&conditions',
      value: value,
    };

    const response = UpdateData({ url: 'business_settings_save', cred: credentials });
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
    })
  };

  return (
    <EditorComponent
      data={[value, setValue]}
      errors={[errMsg, setErrMsg]}
      success={[successMsg, setSuccessMsg]}
      submit={page}
    />
  );
};

export default TermsConditions;