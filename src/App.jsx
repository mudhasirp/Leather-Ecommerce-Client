import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "@/Routes/ProtectedRoute";
import AdminRoute from "@/Routes/AdminRoute";
import PublicRoute from "@/Routes/PublicRoute";


// AUTH

import LoginPage from "./Pages/Auth/LoginPage";
import RegisterPage from "./Pages/Auth/RegisterPage";
import VerifyOtpPage from "./Pages/Auth/VerifyOtp";
import ForgotPasswordPage from "./Pages/Auth/ForgetPasswordPage";
import ResetPasswordPage from "./Pages/Auth/ResetPasswordPage";
import ResetOtpPage from "./Pages/Auth/ResetOtpPage";
import HomePage from "./Pages/Home/HomePage";
import ShopPage from "./Pages/Shop/ShopPage";
import ProductDetailPage from "./Pages/ProductDetail/ProductDetailPage";
import CartPage from "./Pages/Cart/CartPage";
import CheckoutPage from "./Pages/Checkout/CheckoutPage";
import OrderSuccessPage from "./Pages/Orders/OrderSuccessPage";
import OrdersPage from "./Pages/Orders/OrderPage";
import OrderDetailsPage from "./Pages/Orders/OrderPageDetails";
import AddressPage from "./Pages/Address/AddressPage";

import AdminLoginPage from "./Admin/Pages/Login/AdminLoginPage";
import AdminDashboardPage from "./Admin/Pages/Dashboard/AdminDashboardPage";
import CategoriesPage from "./Admin/Pages/Category/AdminCategoryPage";
import ProductsPage from "./Admin/Pages/Product/AdminProductPage";
import AdminOrdersPage from "./Admin/Pages/Order/AdminOrdersPage";
import AdminEnquiryPage from "./Admin/Pages/Enquiry/AdminEnquiryPage";
import CustomersPage from "./Admin/Pages/Customer/AdminCustomerListPage";
import CustomerDetailsPage from "./Admin/Pages/Customer/AdminCustomerDetailPage";
import Unauthorized from "./Pages/Unauthorized/Unauthorized";
function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<PublicRoute />}>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/verify-otp" element={<VerifyOtpPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/reset-otp" element={<ResetOtpPage />} />
        </Route>
   <Route path="/unauthorized" element={<Unauthorized/>}/>
{/* User*/}
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:slug" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-success" element={<OrderSuccessPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/orders/:id" element={<OrderDetailsPage />} />
          <Route path="/account/addresses" element={<AddressPage />} />
        </Route>

        <Route path="/admin" element={<AdminLoginPage />} />

{/* Admin */}
        <Route element={<AdminRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin/category" element={<CategoriesPage />} />
          <Route path="/admin/product" element={<ProductsPage />} />
          <Route path="/admin/orders" element={<AdminOrdersPage />} />
          <Route path="/admin/enquiry" element={<AdminEnquiryPage />} />
          <Route path="/admin/customers" element={<CustomersPage />} />
          <Route path="/admin/customers/:id" element={<CustomerDetailsPage />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;