
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/Components/ui/button";
import HeaderLayout from "@/Layout/Header/HeaderLayout";
import { CheckCircle } from "lucide-react";

export default function OrderSuccessPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const orderId = location.state?.orderId || null;

  return (
    <>
      <HeaderLayout />

      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="max-w-xl w-full text-center bg-card border border-border rounded-3xl p-10 shadow-sm animate-fade-in">

          <div className="flex justify-center mb-6">
            <CheckCircle className="w-20 h-20 text-green-600" />
          </div>

          
          <h1 className="font-sans text-4xl text-primary mb-3">
            Order Placed Successfully!
          </h1>

          <p className="text-muted-foreground text-lg mb-6">
            Thank you for shopping with us. Your fresh items will be delivered
            soon 🚚
          </p>

          {orderId && (
            <div className="mb-6 text-sm text-muted-foreground">
              Order ID:{" "}
              <span className="font-medium text-foreground">
                #{orderId}
              </span>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button
              onClick={() => navigate("/orders")}
              className="rounded-2xl px-8 py-6 text-lg font-sans"
            >
              View My Orders
            </Button>

            <Button
              variant="outline"
              onClick={() => navigate("/shop")}
              className="rounded-2xl px-8 py-6 text-lg font-sans"
            >
              Continue Shopping
            </Button>
          </div>

          <p className="text-xs text-muted-foreground mt-8">
            You will receive order updates via SMS / Email
          </p>
        </div>
      </div>
    </>
  );
}
