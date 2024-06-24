import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import attributesReducer from "./Apis/Getters/attributes";
import bannersReducer from "./Apis/Getters/banners";
import brandsReducer from "./Apis/Getters/brands";
import categoriesReducer from "./Apis/Getters/categories";
import colorsReducer from "./Apis/Getters/colors";
import currencyReducer from "./Apis/Getters/currency";
import customersReducer from "./Apis/Getters/customers";
import employeesReducer from "./Apis/Getters/employees";
import enquiriesReducer from "./Apis/Getters/enquiries";
import faqsReducer from "./Apis/Getters/faqs";
import menusReducer from "./Apis/Getters/menus";
import newslettersReducer from "./Apis/Getters/newsletters";
import ordersReducer from "./Apis/Getters/orders";
import paymentsReducer from "./Apis/Getters/payments";
import pickupReducer from "./Apis/Getters/pickup";
import productsReducer from "./Apis/Getters/products";
import reviewsReducer from "./Apis/Getters/reviews";
import rolesReducer from "./Apis/Getters/roles";
import settingsReducer from "./Apis/Getters/settings";
import storyReducer from "./Apis/Getters/story";
import subcategoriesReducer from "./Apis/Getters/subcategories";
import taxesReducer from "./Apis/Getters/taxes";
import testimonialsReducer from "./Apis/Getters/testimonials";

const store = configureStore({
    reducer: {
        products: productsReducer,
        categories: categoriesReducer,
        subcategories: subcategoriesReducer,
        colors: colorsReducer,
        currency: currencyReducer,
        brands: brandsReducer,
        banners: bannersReducer,
        enquiries: enquiriesReducer,
        reviews: reviewsReducer,
        faqs: faqsReducer,
        story: storyReducer,
        testimonials: testimonialsReducer,
        customers: customersReducer,
        attributes: attributesReducer,
        menus: menusReducer,
        orders: ordersReducer,
        payments: paymentsReducer,
        pickup: pickupReducer,
        roles: rolesReducer,
        employees: employeesReducer,
        settings: settingsReducer,
        taxes: taxesReducer,
        newsletters: newslettersReducer,
    },
    middleware: [thunk],
    devTools: process.env.NODE_ENV === "production" ? false : true,
});

export default store;