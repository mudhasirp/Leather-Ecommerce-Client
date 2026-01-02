
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderLayout from "@/Layout/Header/HeaderLayout";
import { Button } from "@/Components/ui/button";
import { toast } from "sonner";

import {
  getCartApi,
  createOrderApi,
    getAddressesApi,
  createAddressApi,
} from "@/API/userAPI";



export default function CheckoutPage() {
  const navigate = useNavigate();

  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [showNewAddress, setShowNewAddress] = useState(false);

  const [newAddress, setNewAddress] = useState({
    fullName: "",
    phone: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
  });

  const [paymentMethod, setPaymentMethod] = useState("COD");

  useEffect(() => {
    (async () => {
      try {
        const cartRes = await getCartApi();
        setCart(cartRes.cart || cartRes);

        const addrRes = await getAddressesApi();
        setAddresses(addrRes.addresses || []);

        const defaultAddr = addrRes.addresses?.find((a) => a.isDefault);
        if (defaultAddr) setSelectedAddressId(defaultAddr._id);
      } catch {
        toast.error("Failed to load checkout");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const subtotal =
    cart?.items?.reduce((s, i) => s + i.price * i.qty, 0) || 0;
  const deliveryFee = subtotal >= 499 ? 0 : 40;
  const total = subtotal + deliveryFee;

  const handlePlaceOrder = async () => {
    let addressPayload;

    if (showNewAddress) {
      const required = [
        "fullName",
        "phone",
        "line1",
        "city",
        "state",
        "postalCode",
      ];
      for (const f of required) {
        if (!newAddress[f]) {
          toast.error("Please complete address");
          return;
        }
      }

      const res = await createAddressApi(newAddress);
      addressPayload = res.address;
    } else {
      addressPayload = addresses.find((a) => a._id === selectedAddressId);
      if (!addressPayload) {
        toast.error("Please select an address");
        return;
      }
    }

    try {
      const res = await createOrderApi({
  address: {
    fullName: addressPayload.fullName,
    phone: addressPayload.phone,
    line1: addressPayload.line1,
    line2: addressPayload.line2 || "",
    city: addressPayload.city,
    state: addressPayload.state,
    postalCode: addressPayload.postalCode,
    country: addressPayload.country || "India",
  },
  paymentMethod,
});

      toast.success("Order placed successfully");
      navigate("/order-success", {
        state: { orderId: res.order._id },
      });
    } catch (err) {
      toast.error(err?.response?.data?.message || "Order failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading checkout…
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <>
      <HeaderLayout />

      <div className="max-w-7xl mx-auto px-6 py-10 grid gap-10 lg:grid-cols-[1fr_420px]">

        <div className="space-y-8">

          <section className="bg-card border rounded-2xl p-6">
            <h2 className="text-2xl font-sans mb-4">
              Delivery Address
            </h2>

            {!showNewAddress && (
              <div className="space-y-4">
                {addresses.map((addr) => (
                  <label
                    key={addr._id}
                    className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer
                      ${
                        selectedAddressId === addr._id
                          ? "border-green-600 bg-green-50"
                          : "border-border"
                      }`}
                  >
                    <input
                      type="radio"
                      checked={selectedAddressId === addr._id}
                      onChange={() => setSelectedAddressId(addr._id)}
                    />
                    <div>
                      <p className="font-medium">{addr.fullName}</p>
                      <p className="text-sm text-muted-foreground">
                        {addr.line1}, {addr.city} – {addr.postalCode}
                      </p>
                      <p className="text-sm">📞 {addr.phone}</p>
                    </div>
                  </label>
                ))}

               <button
  onClick={() => setShowNewAddress(true)}
  className="
    inline-flex items-center gap-2
    px-4 py-2
    rounded-lg
    bg-green-50 text-green-700
    border border-green-200
    text-sm font-medium
    hover:bg-green-100 hover:border-green-300
    transition
  "
>
  <span className="text-lg leading-none">＋</span>
  Add new address
</button>

              </div>
            )}

            {showNewAddress && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  ["fullName", "Full name"],
                  ["phone", "Phone"],
                  ["line1", "Street"],
                  ["line2", "Apartment (optional)"],
                  ["city", "City"],
                  ["state", "State"],
                  ["postalCode", "Pincode"],
                ].map(([k, label]) => (
                  <input
                    key={k}
                    placeholder={label}
                    className="lux-input"
                    value={newAddress[k]}
                    onChange={(e) =>
                      setNewAddress({
                        ...newAddress,
                        [k]: e.target.value,
                      })
                    }
                  />
                ))}

               <button
  onClick={() => setShowNewAddress(false)}
  className="
    col-span-full
    inline-flex items-center gap-2
    text-sm font-medium
    text-muted-foreground
    hover:text-foreground
    transition
  "
>
  <span className="text-lg">←</span>
  Use saved address
</button>

              </div>
            )}
          </section>

          <section className="bg-card border rounded-2xl p-6">
            <h2 className="text-2xl font-sans mb-4">
              Payment Method
            </h2>

            {["COD", "UPI", "CARD"].map((m) => (
              <label
                key={m}
                className={`flex gap-3 p-4 rounded-xl border cursor-pointer mb-3
                  ${
                    paymentMethod === m
                      ? "border-green-600 bg-green-50"
                      : "border-border"
                  }`}
              >
                <input
                  type="radio"
                  checked={paymentMethod === m}
                  onChange={() => setPaymentMethod(m)}
                />
                {m}
              </label>
            ))}
          </section>
        </div>

        <aside className="bg-card border rounded-2xl p-6 h-fit sticky top-8">
          <h2 className="text-2xl font-sans mb-4">
            Order Summary
          </h2>

          {cart.items.map((i) => (
            <div key={i._id} className="flex justify-between text-sm mb-2">
              <span>{i.name} × {i.qty}</span>
              <span>₹{i.price * i.qty}</span>
            </div>
          ))}

          <div className="h-px bg-border my-4" />

          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Delivery</span>
            <span>{deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}</span>
          </div>

          <div className="h-px bg-border my-4" />

          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <Button
            onClick={handlePlaceOrder}
            className="w-full mt-6 bg-green-600 hover:bg-green-700 rounded-xl py-6 text-lg"
          >
            Place Order
          </Button>
        </aside>
      </div>
    </>
  );
}
