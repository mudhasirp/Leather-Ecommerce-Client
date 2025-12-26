import React from "react";
import Login from "@/Components/Login/LoginForm"; // your card wrapper
import OtpVerify from "@/Components/Login/OtpVerify";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import api from "../../API/axiosInstance";
import { toast } from "sonner";
import { verifyOtpApi } from "@/API/userAPI";

const VerifyOtpLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const email = location.state?.email;

  if (!email) {
    // user came here directly
    navigate("/register");
  }

  const handleVerify = async (otp, done) => {
    try {
      const data= await verifyOtpApi({
        email,
        otp,
        purpose:"register"
      });

      dispatch({
        type: "SET_USER",
        payload: {
          user: data.user,
          accessToken: data.accessToken,
        },
      });

      toast.success("Account verified & created 🤎");
      navigate("/");
    } catch (err) {
      console.error("OTP verify error:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "OTP verification failed");
    } finally {
      if (done) done();
    }
  };

  return (
    <Login
      mainContent={
        <OtpVerify
          email={email}
          onVerify={handleVerify}
        />
      }
    />
  );
};

export default VerifyOtpLayout;
