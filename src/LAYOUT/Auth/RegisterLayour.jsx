import React, { useState } from "react";
import Login from "@/Components/Login/LoginForm";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import api from "../../API/axiosInstance";
import { toast } from "sonner";
import { sendOtpApi } from "@/API/userAPI";
import { Eye, EyeOff } from "lucide-react";

const RegisterLayout = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail]     = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

   const submitRegister = async (e) => {
  e.preventDefault();

  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return;
  }

  setIsLoading(true);

  try {
    const data= await sendOtpApi({
      name: fullName,
      email,
      password,
      purpose: "register",        
    });

    toast.success("OTP sent to your email 🤎");

    navigate("/verify-otp", {
      state: { email, name: fullName, purpose: "register" }, 
    });
  } catch (err) {
    console.error("Register error:", err.response?.data || err.message);
    toast.error(err.response?.data?.message || "Failed to send OTP");

    setPassword("");
    setConfirmPassword("");
  } finally {
    setIsLoading(false);
  }
};



  return (
    <Login
      HeadContent={`Create your <br />  Fresh Mart account`}
      mainContent={
        <>
          <div className="space-y-2 mt-6 text-center md:text-left md:ml-[100px]">
            <h2 className="font-sans text-4xl md:text-5xl font-light tracking-tight text-foreground">
              FRESH
              <br />
              MART
            </h2>
            <div className="h-0.5 w-12 bg-linear-to-r from-transparent via-accent to-transparent md:mx-0 mx-auto my-4" />
            <p className="text-xs tracking-widest text-muted-foreground font-light">
                            PREMIUM SHOP FOR GROCERIES
            </p>
          </div>

          <form
            onSubmit={submitRegister}
            className="space-y-6 w-full max-w-[340px] mx-auto md:mx-0 md:ml-[100px] mt-6"
          >
            <div className="space-y-2 text-left">
              <label
                htmlFor="fullName"
                className="block text-xs tracking-widest text-muted-foreground font-light uppercase"
              >
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full border border-border/50 bg-card text-foreground placeholder:text-muted-foreground/60 px-3 py-2 rounded-lg focus:border-accent focus:ring-2 focus:ring-accent/30 outline-none transition-all"
              />
            </div>

            <div className="space-y-2 text-left">
              <label
                htmlFor="email"
                className="block text-xs tracking-widest text-muted-foreground font-light uppercase"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-border/50 bg-card text-foreground placeholder:text-muted-foreground/60 px-3 py-2 rounded-lg focus:border-accent focus:ring-2 focus:ring-accent/30 outline-none transition-all"
              />
            </div>
            <div className="space-y-2 text-left">
        <label
          htmlFor="password"
          className="block text-xs tracking-widest text-muted-foreground font-light uppercase"
        >
          Password
        </label>

        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-border/50 bg-card text-foreground placeholder:text-muted-foreground/60 px-3 py-2 pr-10 rounded-lg focus:border-accent focus:ring-2 focus:ring-accent/30 outline-none transition-all"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      {/* Confirm Password */}
      <div className="space-y-2 text-left">
        <label
          htmlFor="confirmPassword"
          className="block text-xs tracking-widest text-muted-foreground font-light uppercase"
        >
          Confirm Password
        </label>

        <div className="relative">
          <input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border border-border/50 bg-card text-foreground placeholder:text-muted-foreground/60 px-3 py-2 pr-10 rounded-lg focus:border-accent focus:ring-2 focus:ring-accent/30 outline-none transition-all"
          />

          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>
      
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-light tracking-widest uppercase text-sm h-11 transition-all rounded-lg disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>

            <div className="pt-4 border-t border-border/30 text-center text-sm text-muted-foreground font-light">
              Already have an account?{" "}
              <Link
                to="/"
                className="text-foreground hover:text-accent font-medium transition-colors"
              >
                Sign in
              </Link>
            </div>
          </form>
        </>
      }
    />
  );
};

export default RegisterLayout;
