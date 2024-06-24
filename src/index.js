import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store';
import EditCategoryContextWrapper from './Context/EditCategoryContext';
import EditColorContextWrapper from './Context/EditColorContext';
import EditCurrencyContextWrapper from './Context/EditCurrencyContext';
import EditBrandContextWrapper from './Context/EditBrandContext';
import EditProductContextWrapper from './Context/EditProductContext';
import SubcategoryContextWrapper from './Context/SubcategoryContext';
import EditBannerContextWrapper from './Context/EditBannerContext';
import CustomerDetailsContextWrapper from './Context/CustomerDetailsContext';
import RolePermissionContextWrapper from './Context/RolePermissionContext';
import EditOrdersContextWrapper from './Context/EditOrdersContext';
import PaymentsContextWrapper from './Context/PaymentsContext';
import { disableReactDevTools } from './disableReactDevTools';

const root = ReactDOM.createRoot(document.getElementById('root'));
if (process.env.NODE_ENV === "production") disableReactDevTools();
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <EditProductContextWrapper>
      <EditCategoryContextWrapper>
        <SubcategoryContextWrapper>
          <EditColorContextWrapper>
            <EditCurrencyContextWrapper>
              <EditBrandContextWrapper>
                <EditBannerContextWrapper>
                  <EditOrdersContextWrapper>
                    <CustomerDetailsContextWrapper>
                      <PaymentsContextWrapper>
                        <RolePermissionContextWrapper>
                          <App />
                        </RolePermissionContextWrapper>
                      </PaymentsContextWrapper>
                    </CustomerDetailsContextWrapper>
                  </EditOrdersContextWrapper>
                </EditBannerContextWrapper>
              </EditBrandContextWrapper>
            </EditCurrencyContextWrapper>
          </EditColorContextWrapper>
        </SubcategoryContextWrapper>
      </EditCategoryContextWrapper>
    </EditProductContextWrapper>
  </Provider>
  // </React.StrictMode>
);

reportWebVitals();
