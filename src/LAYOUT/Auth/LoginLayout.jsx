import React, { useState } from "react";
import Login from "@/Components/Login/LoginForm";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import api from "../../API/axiosInstance";
import { useGoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { googleLoginApi, loginUserApi } from "@/API/userAPI";
import { Eye, EyeOff } from "lucide-react";

const LoginLayout = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const data = await googleLoginApi(tokenResponse.access_token)
        dispatch({
          type: "SET_USER",
          payload: {
            user: data.user,
            accessToken: data.accessToken,
          },
        });

        toast.success("Welcome back 🤎");
           navigate("/home");

      } catch (error) {
        console.error(error);
        toast.error("Google login failed");
      }
    },
    onError: () => {
      toast.error("Google Login cancelled");
    },
  });

  const submitLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data=await loginUserApi(email,password);

      dispatch({
        type: "SET_USER",
        payload: {
          user: data.user,
          accessToken: data.accessToken,
        },
      });

      navigate("/home");
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Login failed");
      setPassword("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Login
      HeadContent={`Sign in <br /> to Fresh Mart`}
      mainContent={
        <>
          <div className="space-y-2 mt-6 text-center md:text-left md:ml-[100px]">
            <h2 className="font-sans text-green-700 text-4xl md:text-5xl font-light tracking-tight ">
              FRESH
              <br />
              MART
            </h2>
            <div className="h-0.5 w-12 bg-linear-to-r from-transparent via-accent to-transparent md:mx-0 mx-auto my-4" />
            <p className="text-xs tracking-widest text-muted-foreground font-light">
              PREMIUM SHOP FOR GROCERIES
            </p>
          </div>

          <div className="w-full max-w-[340px] mx-auto md:mx-0 md:ml-[100px] mt-6">
            <button
              type="button"
              onClick={() => loginWithGoogle()}
              className="flex items-center justify-center gap-2 w-full border border-border/50 bg-card hover:bg-muted/60 text-foreground text-sm py-2.5 rounded-lg transition-all"
            >
              <FcGoogle size={22} />
              <span className="tracking-wide">Continue with Google</span>
            </button>
          </div>

          <div className="flex items-center justify-center mt-4 mb-2 w-full max-w-[340px] mx-auto md:mx-0 md:ml-[100px]">
            <div className="flex-1 h-px bg-border/60" />
            <span className="px-3 text-xs text-muted-foreground uppercase tracking-[0.2em]">
              or
            </span>
            <div className="flex-1 h-px bg-border/60" />
          </div>

        
          <form
            onSubmit={submitLogin}
            className="space-y-6 w-full max-w-[340px] mx-auto md:mx-0 md:ml-[100px] mt-2"
          >
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


            <div className="text-right">
              <Link
                to="/forgot-password"
                className="text-xs text-muted-foreground hover:text-accent transition-colors font-light"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-light tracking-widest uppercase text-sm h-11 transition-all rounded-lg disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>

            <div className="pt-4 border-t border-border/30 text-center text-sm text-muted-foreground font-light">
              Don&apos;t have an account?{" "}
              <Link
                to="/register"
                className="text-foreground hover:text-accent font-medium transition-colors"
              >
                Register here
              </Link>
            </div>
          </form>
        </>
      }
    />
  );
};

export default LoginLayout;
