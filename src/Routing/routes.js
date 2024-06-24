// Vaibhav Shashank Admin components
import CategoriesList from "../Components/CategoryComponents/CategoriesList";
import Admin from "../Components/SettingComponents/Admin";
import Default from "../Components/SettingComponents/Default";
import EditProduct from "../Components/ProductComponents/EditProduct";
import General from "../Components/SettingComponents/General";
import Dashboard from "../pages/Dashboard";
import Settings from "../pages/Settings";
import SignIn from "../pages/SignIn";
import ProductsList from "../Components/ProductComponents/ProductsList";
import OrdersList from "../Components/OrderComponents/OrdersList";
import EditOrder from "../Components/OrderComponents/EditOrder";
import CustomersList from "../Components/CustomerComponents/CustomersList";
import Customer from "../Components/CustomerComponents/Customer";
import CTAList from "../Components/CTAComponents/CTAList";
import UpdateLandingBanner from "../Components/LandingComponent/UpdateLandingBanner";
import EditBanners from "../Components/BannerComponents/EditBanners";
import AddCategory from "../Components/CategoryComponents/AddCategory";
import EditCategory from "../Components/CategoryComponents/EditCategory";
import AddProducts from "../Components/ProductComponents/AddProducts";
import ColorsList from "../Components/ColorsComponents/ColorsList";
import AddColor from "../Components/ColorsComponents/AddColor";
import EditColor from "../Components/ColorsComponents/EditColor";
import CurrencyList from "../Components/CurrencyComponents/CurrencyList";
import AddCurrency from "../Components/CurrencyComponents/AddCurrency";
import EditCurrency from "../Components/CurrencyComponents/EditCurrency";
import BrandsList from "../Components/BrandComponents/BrandsList";
import AddBrand from "../Components/BrandComponents/AddBrand";
import EditBrand from "../Components/BrandComponents/EditBrand";
// import DeprecatedAddProducts from "../deprecated/DeprecatedAddProducts";
import Navbar from "../Components/SettingComponents/Navbar";
import SubCategoriesList from "../Components/CategoryComponents/SubCategoriesList";
import UpdateLoyaltyCard from "../Components/LoyaltyCardComponents/UpdateLoyaltyCard";
import BannersList from "../Components/BannerComponents/BannersList";
import AddBanner from "../Components/BannerComponents/AddBanner";
// import Debouncing from "../Components/Debouncing";
import ContactsList from "../Components/ContactComponent/ContactsList";
import ReviewsList from "../Components/ReviewsComponent/ReviewsList";
import PrivacyPolicy from "../Components/PagesComponent/PrivacyPolicy";
import PaymentsList from "../Components/PaymentComponent/PaymentsList";
import PaymentDetails from "../Components/PaymentComponent/PaymentDetails";
import TermsConditions from "../Components/PagesComponent/TermsConditions";
import OurStory from "../Components/PagesComponent/OurStory";
import Support from "../Components/PagesComponent/Support";
import FAQ from "../Components/PagesComponent/FAQ";
import Testimonials from "../Components/PagesComponent/Testimonials";
import Attributes from "../Components/VariationsComponent/Attributes";
import Employee from "../Components/Role&Permission/Employee";
import RolePermission from "../Components/Role&Permission/RolePermission";
import Role from "../Components/Role&Permission/Role";
import Payment from "../Components/SettingComponents/Payment";
import Pickup from "../Components/SettingComponents/Pickup";
import ProcessOrder from "../Components/OrderProcessingComponent/ProcessOrder";
import OrderTrack from "../Components/OrderProcessingComponent/OrderTrack";
import NDRList from "../Components/OrderProcessingComponent/NDRList";
import ShippingPartner from "../Components/SettingComponents/ShippingPartner";
import MorePages from "../Components/PagesComponent/MorePages";
import Tax from "../Components/TaxComponents/Tax";
import Newsletters from "../Components/NewsletterComponents/Newsletters";

export const routes = [
    {
        type: "collapse",
        name: "Dashboard",
        key: "dashboard",
        route: "/admin/dashboard",
        component: <Dashboard />,
        noCollapse: true,
    },
    {
        type: "collapse",
        name: "Settings",
        key: "settings",
        route: "/admin/settings",
        component: <Settings />,
        noCollapse: true,
        collapse: [
            {
                type: "collapse",
                name: "Settings",
                key: "general",
                route: "/admin/settings/general",
                component: <General />,
                noCollapse: true,
            },
            {
                type: "collapse",
                name: "Admin Setings",
                key: "admin",
                route: "/admin/settings/admin",
                component: <Admin />,
                noCollapse: true,
            },
            {
                type: "collapse",
                name: "Navbar Setings",
                key: "navbar",
                route: "/admin/settings/navbar",
                component: <Navbar />,
                noCollapse: true,
            },
            {
                type: "collapse",
                name: "Payment Setings",
                key: "payment",
                route: "/admin/settings/payment",
                component: <Payment />,
                noCollapse: true,
            },
            {
                type: "collapse",
                name: "Pickup Point",
                key: "pickuppoint",
                route: "/admin/settings/pickup",
                component: <Pickup />,
                noCollapse: true,
            },
            {
                type: "collapse",
                name: "Pickup Point",
                key: "pickuppoint",
                route: "/admin/settings/shipping-partner",
                component: <ShippingPartner />,
                noCollapse: true,
            },
            {
                type: "collapse",
                name: "Taxes",
                key: "taxes",
                route: "/admin/settings/tax",
                component: <Tax />,
                noCollapse: true,
            },
            {
                type: "collapse",
                name: "Default Settings",
                key: "defaultSettings",
                route: "/admin/settings/*",
                component: <Default />,
                noCollapse: true,
            },
        ],
    },
    {
        type: "collapse",
        name: "Process Order",
        key: "process-order",
        route: "/admin/process-order",
        component: <ProcessOrder />,
        noCollapse: true,
    },
    {
        type: "collapse",
        name: "Products",
        key: "products",
        route: "/admin/products",
        component: <ProductsList />,
        noCollapse: true,
    },
    {
        type: "collapse",
        name: "Product",
        key: "product",
        route: "/admin/products/product",
        component: <AddProducts />,
        noCollapse: true,
    },
    {
        type: "collapse",
        name: "Product",
        key: "product",
        route: "/admin/products/product/:id",
        component: <EditProduct />,
        noCollapse: true,
    },
    {
        type: "collapse",
        name: "Colors",
        key: "colors",
        route: "/admin/colors",
        component: <ColorsList />,
        noCollapse: true,
    },
    {
        type: "collapse",
        name: "AddColors",
        key: "addcolors",
        route: "/admin/colors/color",
        component: <AddColor />,
        noCollapse: true,
    },
    {
        type: "collapse",
        name: "EditColors",
        key: "editcolors",
        route: "/admin/colors/color/:id",
        component: <EditColor />,
        noCollapse: true,
    },
    {
        type: "collapse",
        name: "Attributes",
        key: "attributes",
        route: "/admin/attributes",
        component: <Attributes />,
        noCollapse: true,
    },
    {
        type: "collapse",
        name: "Categories",
        key: "categories",
        route: "/admin/categories",
        component: <CategoriesList />,
        noCollapse: true,
    },
    {
        type: "collapse",
        name: "Sub Categories",
        key: "subcategories",
        route: "/admin/categories/subcategories",
        component: <SubCategoriesList />,
        noCollapse: true,
    },
    {
        type: "collapse",
        name: "AddCategory",
        key: "addcategory",
        route: "/admin/categories/category",
        component: <AddCategory />,
        noCollapse: true,
    },
    {
        type: "collapse",
        name: "EditCategory",
        key: "editcategory",
        route: "/admin/categories/category/:id",
        component: <EditCategory />,
        noCollapse: true,
    },
    {
        type: "collapse",
        name: "Currencies",
        key: "currencies",
        route: "/admin/currencies",
        component: <CurrencyList />,
        noCollapse: true,
    },
    {
        type: "collapse",
        name: "AddCurrency",
        key: "addcurrency",
        route: "/admin/currencies/currency",
        component: <AddCurrency />,
        noCollapse: true,
    },
    {
        type: "collapse",
        name: "EditCurrency",
        key: "editcurrency",
        route: "/admin/currencies/currency/:id",
        component: <EditCurrency />,
        noCollapse: true,
    },
    {
        type: "collapse",
        name: "Brands",
        key: "brands",
        route: "/admin/brands",
        component: <BrandsList />,
        noCollapse: true,
    },
    {
        type: "collapse",
        name: "AddBrands",
        key: "addbrands",
        route: "/admin/brands/brand",
        component: <AddBrand />,
        noCollapse: true,
    },
    {
        type: "collapse",
        name: "EditBrands",
        key: "editbrands",
        route: "/admin/brands/brand/:id",
        component: <EditBrand />,
        noCollapse: true,
    },
    {
        type: "collapse",
        name: "Orders",
        key: "orders",
        route: "/admin/orders",
        component: <OrdersList />,
        noCollapse: true,
    },
    {
        type: "collapse",
        name: "Order",
        key: "order",
        route: "/admin/orders/order/:id",
        component: <EditOrder />,
        noCollapse: true,
    },
    {
        type: "collapse",
        name: "Track",
        key: "track",
        route: "/admin/track",
        component: <OrderTrack />,
        noCollapse: true,
    },
    {
        type: "collapse",
        name: "NDR",
        key: "ndr",
        route: "/admin/ndr",
        component: <NDRList />,
        noCollapse: true,
    },
    {
        type: "collapse",
        name: "Customers",
        key: "customers",
        route: "/admin/customers",
        component: <CustomersList />,
        noCollapse: true,
    },
    {
        type: "collapse",
        name: "Customer",
        key: "customer",
        route: "/admin/customers/customer",
        component: <Customer />,
        noCollapse: true,
    },
    {
        type: "collapse",
        name: "Buttons",
        key: "buttons",
        route: "/admin/cta",
        component: <CTAList />,
        noCollapse: true,
    },
    {
        type: "collapse",
        name: "LandingBanner",
        key: "landingbanner",
        route: "/admin/home-banner",
        component: <UpdateLandingBanner />,
        noCollapse: true,
    },
    {
        type: "collapse",
        name: "Banners",
        key: "banners",
        route: "/admin/banners",
        component: <BannersList />,
        noCollapse: true,
    },
    {
        type: "collapse",
        name: "AddBanners",
        key: "addbanners",
        route: "/admin/banners/banner",
        component: <AddBanner />,
        noCollapse: true,
    },
    {
        type: "collapse",
        name: "EditBanners",
        key: "banners",
        route: "/admin/banners/banner/:id",
        component: <EditBanners />,
        noCollapse: true,
    },
    {
        type: "collapse",
        name: "Loyalty Card",
        key: "loyaltycard",
        route: "/admin/loyalty-card",
        component: <UpdateLoyaltyCard />,
        noCollapse: true,
    },
    {
        type: "collapse",
        name: "Contacts",
        key: "contacts",
        route: "/admin/contacts",
        component: <ContactsList />,
        noCollapse: true,
    },
    {
        type: "collapse",
        name: "Reviews",
        key: "reviews",
        route: "/admin/reviews",
        component: <ReviewsList />,
        noCollapse: true,
    },
    {
        type: "collapse",
        name: "Payments",
        key: "payments",
        route: "/admin/payments",
        component: <PaymentsList />,
        noCollapse: true,
    },
    {
        type: "collapse",
        name: "Payment",
        key: "payment",
        route: "/admin/payment/:id",
        component: <PaymentDetails />,
        noCollapse: true,
    },
    {
        type: "collapse",
        name: "Testimonials",
        key: "testimonials",
        route: "/admin/testimonials",
        component: <Testimonials />,
        noCollapse: true,
    },
    {
        type: "collapse",
        name: "FAQ",
        key: "faq",
        route: "/admin/faq",
        component: <FAQ />,
        noCollapse: true,
    },
    {
        type: "collapse",
        name: "OurStory",
        key: "our-story",
        route: "/admin/our-story",
        component: <OurStory />,
        noCollapse: true,
    },
    {
        type: "collapse",
        name: "Support",
        key: "support",
        route: "/admin/support",
        component: <Support />,
        noCollapse: true,
    },
    {
        type: "collapse",
        name: "Privacy",
        key: "privacy",
        route: "/admin/privacy-policy",
        component: <PrivacyPolicy />,
        noCollapse: true,
    },
    {
        type: "collapse",
        name: "TermsConditions",
        key: "TermsConditions",
        route: "/admin/terms-&-conditions",
        component: <TermsConditions />,
        noCollapse: true,
    },
    {
        type: "collapse",
        name: "Employee",
        key: "employee",
        route: "/admin/employee",
        component: <Employee />,
        noCollapse: true,
    },
    {
        type: "collapse",
        name: "Role",
        key: "role",
        route: "/admin/role",
        component: <Role />,
        noCollapse: true,
    },
    {
        type: "collapse",
        name: "Role&Permission",
        key: "role&permission",
        route: "/admin/role-permission",
        component: <RolePermission />,
        noCollapse: true,
    },
    {
        type: "collapse",
        name: "More Pages",
        key: "morepages",
        route: "/admin/create-pages",
        component: <MorePages />,
        noCollapse: true,
    },
    {
        type: "collapse",
        name: "Newsletter",
        key: "newsletter",
        route: "/admin/newsletter",
        component: <Newsletters />,
        noCollapse: true,
    },
];

export const defaultRoute = [
    {
        type: "collapse",
        name: "Sign In",
        key: "sign-in",
        route: "/admin/sign-in",
        component: <SignIn />,
        noCollapse: true,
    },
];
