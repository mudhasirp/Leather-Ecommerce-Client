import React from "react";
import Login from "@/Components/Login/LoginForm";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../API/axiosInstance";
import { toast } from "sonner";
import OtpVerify from "@/Components/Login/OtpVerify";
import { verifyOtpApi } from "@/API/userAPI";

const ResetOtpLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  if (!email) {
    navigate("/forgot-password");
  }

  const handleVerify = async (otp, done) => {
    try {
      await verifyOtpApi({
        email,
        otp,
        purpose: "reset",
      });

      toast.success("Code verified. You can now set a new password 🤎");
      navigate("/reset-password", { state: { email } });
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
        <>
          

          <div className="w-full max-w-[340px] mx-auto md:mx-0 md:ml-[100px] mt-6">
            <OtpVerify email={email} onVerify={handleVerify} />
          </div>
        </>
      }
    />
  );
};

export default ResetOtpLayout;
