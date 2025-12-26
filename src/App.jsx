// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "@/Routes/ProtectedRoute";
import AdminRoute from "@/Routes/AdminRoute";

import LoginPage from './Pages/Auth/LoginPage'
import RegisterPage from './Pages/Auth/RegisterPage'
import VerifyOtpPage from './Pages/Auth/VerifyOtp'
import ForgotPasswordPage from './Pages/Auth/ForgetPasswordPage'
import ResetPasswordPage from './Pages/Auth/ResetPasswordPage'
import ResetOtpPage from './Pages/Auth/ResetOtpPage'
import HomePage from './Pages/Home/HomePage'
import ShopPage from './Pages/Shop/ShopPage'
import AdminLoginPage from './Admin/Pages/AdminLoginPage'
import AdminDashboardPage from './Admin/Pages/AdminDashboardPage'
import CategoriesPage from './Admin/Pages/AdminCategoryPage'
import ProductsPage from './Admin/Pages/AdminProductPage'
import ProductDetailPage from './Pages/ProductDetail/ProductDetailPage'
import CartPage from './Pages/Cart/CartPage'
import CheckoutPage from "./Pages/Checkout/CheckoutPage";
import OrderSuccessPage from "./Pages/Orders/OrderSuccessPage";
import AdminOrdersPage from "./Admin/Pages/AdminOrdersPage";
import AddressPage from "./Pages/Address/AddressPage";
import OrdersPage from "./Pages/Orders/OrderPage";
import OrderDetailsPage from "./Pages/Orders/OrderPageDetails";
import AdminEnquiryPage from "./Admin/Pages/AdminEnquiryPage";
import CustomersPage from "./Admin/Pages/Customer/AdminCustomerListPage";
import CustomerDetailsPage from "./Admin/Pages/Customer/AdminCustomerDetailPage";
import PublicRoute from "./Routes/PublicRoute";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        < Route path="/" element=
        {
        <PublicRoute>
          <LoginPage />
        </PublicRoute>}
        />
        <Route path="/register" element={
                  <PublicRoute>
          <RegisterPage />
                  </PublicRoute>
} />
        <Route path="/verify-otp" element={
                  <PublicRoute>
          <VerifyOtpPage />
                  </PublicRoute>
          } />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/reset-otp" element={<ResetOtpPage />} />
        <Route path="/product/:slug" element={<ProtectedRoute>
          <ProductDetailPage/>
        </ProtectedRoute>  }  />
        <Route path="/checkout" element={
          <ProtectedRoute>     <CheckoutPage/></ProtectedRoute>
     
          
          }/>
        <Route path="/order-success" element={
          <ProtectedRoute>
                      <OrderSuccessPage />
          </ProtectedRoute>}/>



        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/shop"
          element={
            <ProtectedRoute>
              <ShopPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        />
        <Route path="/account/addresses" element={
                      <ProtectedRoute>
          <AddressPage/>
                      </ProtectedRoute>
}/>
       <Route path="/orders" element={
        <ProtectedRoute>
        <OrdersPage/> 
      </ProtectedRoute>
        }/>
       <Route path="/orders/:id" element={
                              <ProtectedRoute>
        <OrderDetailsPage/>
                              </ProtectedRoute>
        }/>
        <Route path="/admin" element={<AdminLoginPage />} />

        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboardPage />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/category"
          element={
            <AdminRoute>
              <CategoriesPage />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/product"
          element={
            <AdminRoute>
              <ProductsPage />
            </AdminRoute>
          }
        />
        <Route path="/admin/orders" element={
          <AdminOrdersPage/>
        }/>
        <Route path="/admin/enquiry" element={
          <AdminEnquiryPage/>
        }/>
        <Route path="/admin/customers" element={
          <CustomersPage/>
        }/>
        <Route path="/admin/customers/:id" element={<CustomerDetailsPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
