
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";           
import { adminLoginApi } from "@/API/adminApi";
import AdminLoginForm from "../../Component/Login/AdminLoginForm";

export default function AdminLoginLayout() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

const handleAdminLogin = async (e) => {
  e.preventDefault();

  if (!email || !password) {
    toast.error("Please enter email and password");
    return;
  }

  setIsLoading(true);
  try {
    const data = await adminLoginApi({ email, password });

    dispatch({
      type: "SET_USER",
      payload: {
        user: data.user,              
        accessToken: data.accessToken,
      },
    });

    toast.success("Welcome back, admin 🤎");
    navigate("/admin/dashboard"); 
  } catch (err) {
    console.error("Admin login error:", err.response?.data || err.message);
    toast.error(
      err.response?.data?.message || "Admin login failed. Check credentials."
    );
    setPassword("");
  } finally {
    setIsLoading(false);
  }
};


  return (
    <section className="relative min-h-screen w-full bg-background flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-linear-to-b from-background via-background/95 to-background" />

        <div className="absolute inset-0 opacity-[0.14]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(180,160,130,0.46)_1px,transparent_1px)] bg-size-[34px_34px]" />
        </div>

        <div className="absolute inset-0 mix-blend-soft-light">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),transparent_70%)]" />
        </div>

        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[radial-gradient(circle,rgba(196,166,111,0.55),transparent_70%)] blur-3xl opacity-70" />
        <div className="absolute -bottom-24 -left-16 w-64 h-64 rounded-full bg-[radial-gradient(circle,rgba(95,70,55,0.7),transparent_70%)] blur-3xl opacity-65" />
      </div>

      <div className="relative z-10 w-full max-w-md px-6">
        <div className="mb-8 text-center space-y-2">
          <p className="text-[11px] tracking-[0.25em] uppercase text-muted-foreground">
            Fresh Mart· Admin
          </p>
          <h1 className="font-sans text-3xl sm:text-4xl font-light tracking-tight text-foreground">
            Dashboard Access
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-2">
            Sign in to manage products, orders and customers.
          </p>
        </div>

        <div className="bg-background/80 border border-border/60 backdrop-blur-sm px-6 py-6 sm:px-8 sm:py-8 shadow-[0_18px_50px_rgba(15,10,5,0.45)]">
          <AdminLoginForm
            email={email}
            password={password}
            isLoading={isLoading}
            onEmailChange={setEmail}
            onPasswordChange={setPassword}
            onSubmit={handleAdminLogin}
          />
        </div>

        <p className="mt-4 text-[11px] text-center text-muted-foreground/80 tracking-wide">
          Admin access is monitored. Contact system owner if you’ve lost your credentials.
        </p>
      </div>
    </section>
  );
}
