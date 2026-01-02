import React, { useState, useEffect } from "react";
import Login from "@/Components/Login/LoginForm";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { resetPasswordApi } from "@/API/userAPI";

const ResetPasswordLayout = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  useEffect(() => {
    if (!email) {
      navigate("/forgot-password");
    }
  }, [email, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      toast.error("Please enter and confirm your new password");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      await resetPasswordApi(email,newPassword)

      toast.success("Password reset successfully 🤎");
      navigate("/");
    } catch (err) {
      console.error("Reset password error:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Failed to reset password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Login
      mainContent={
        <>
          <div className="space-y-2 mt-6 text-center md:text-left md:ml-[100px]">
            <h2 className="font-serif text-4xl md:text-5xl font-light tracking-tight text-foreground">
              FRESH
              <br />
              MART
            </h2>
            <div className="h-0.5 w-12 bg-linear-to-r from-transparent via-accent to-transparent md:mx-0 mx-auto my-4" />
            <p className="text-xs tracking-widest text-muted-foreground font-light">
              AVAILABLE FRESH VEGETABLES
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 w-full max-w-[340px] mx-auto md:mx-0 md:ml-[100px] mt-6"
          >
            <div className="space-y-2 text-left">
              <h2 className="text-xl md:text-2xl font-light tracking-tight text-foreground">
                Set a new password
              </h2>
              <p className="text-xs md:text-sm text-muted-foreground font-light">
                Choose a strong password to secure your Fresh Mart account.
              </p>
            </div>

            <div className="space-y-2 text-left">
              <label
                htmlFor="newPassword"
                className="block text-xs tracking-widest text-muted-foreground font-light uppercase"
              >
                New Password
              </label>
              <input
                id="newPassword"
                type="password"
                placeholder="••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="w-full bg-card border border-border/50 rounded-lg px-3 py-2 text-foreground placeholder:text-muted-foreground/60 focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all focus:outline-none"
              />
            </div>

            <div className="space-y-2 text-left">
              <label
                htmlFor="confirmPassword"
                className="block text-xs tracking-widest text-muted-foreground font-light uppercase"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full bg-card border border-border/50 rounded-lg px-3 py-2 text-foreground placeholder:text-muted-foreground/60 focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-light tracking-widest uppercase text-sm h-11 transition-all rounded-lg disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        </>
      }
    />
  );
};

export default ResetPasswordLayout;
