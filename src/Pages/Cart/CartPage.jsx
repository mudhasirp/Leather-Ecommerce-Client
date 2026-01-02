

import React, { useEffect, useState } from "react";
import { Button } from "@/Components/ui/button";
import CartItem from "@/Components/Cart/CartItem";
import { toast } from "sonner";
import {
  getCartApi,
  updateCartItemQtyApi,
  removeCartItemApi
} from "@/API/userAPI";
import HeaderLayout from "@/Layout/Header/HeaderLayout";
import { useNavigate } from "react-router-dom";

function mapServerItemToUI(item) {
  return {
    id: item._id,
    productId: item.productId,
    name: item.name,
    image: item.image,
    price: item.price,
    quantity: item.qty,
    weight:item.unitWeight,
    stock:item.stock
  };
}


export default function CartPage() {
    const navigate=useNavigate()
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingIds, setUpdatingIds] = useState(new Set());
  
  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        const data = await getCartApi(); 
        const cart = data.cart || data;
        const items = (cart.items || []).map(mapServerItemToUI);

        if (!mounted) return;
        setCartItems(items);
      } catch (err) {
        console.error("Failed to load cart:", err);
        toast.error("Failed to load cart");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  const updateQuantity = async (id, delta) => {
  const item = cartItems.find(i => i.id === id);
  if (!item) return;

  const newQty = item.quantity + delta;

  if (newQty < 1) return;

  if (newQty > item.stock) {
    toast.error(`Only ${item.stock} items available`);
    return;
  }

  setUpdatingIds((s) => new Set(s).add(id));

  try {
    const res = await updateCartItemQtyApi(id, newQty);
    const serverItems = res.cart?.items || [];

    setCartItems(serverItems.map(mapServerItemToUI));
  } catch (err) {
    toast.error("Failed to update quantity");
  } finally {
    setUpdatingIds((s) => {
      const next = new Set(s);
      next.delete(id);
      return next;
    });
  }
};


  const removeItem = async (id) => {

  setUpdatingIds((s) => new Set(s).add(id));

  try {
    const res = await removeCartItemApi(id);
    const serverItems = res.cart?.items || (res.cart ? res.cart.items : null);

    if (serverItems) {
      setCartItems(serverItems.map(mapServerItemToUI));
    } else {
      setCartItems((prev) => prev.filter((it) => it.id !== id));
    }

    toast.success("Item removed from cart");
  } catch (err) {
    console.error("Failed remove item:", err);
    toast.error(err?.response?.data?.message || "Failed to remove item");
  } finally {
    setUpdatingIds((s) => {
      const next = new Set(s);
      next.delete(id);
      return next;
    });
  }
};
const hasOutOfStockItem = cartItems.some(
  (item) => item.quantity > item.stock
);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  const total = +(subtotal ).toFixed(2);
  const totalItems = cartItems.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);
  const totalWeight=cartItems.reduce((sum,item)=>sum+item.quantity *(Number(item.weight)),0)

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="text-center">
          <p>Loading cart…</p>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
  <div className="text-center space-y-8 animate-fade-in">
    <h1 className="font-sans text-5xl md:text-6xl text-primary">Your cart is empty.</h1>
    
    <Button
      onClick={() => navigate("/shop")}
      className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-2xl px-8 py-6 text-lg font-sans transition-all hover:scale-105"
    >
      Continue Shopping
    </Button>
  </div>
</div>

    );
  }

  return (
    <>
    <HeaderLayout/>
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="mb-12 animate-fade-in">
          <h1 className="font-sans text-3xl md:text-4xl text-primary mb-3 text-balance">Your Cart</h1>
          <p className="text-muted-foreground text-lg">Review your selections before checkout.</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-6">
            {cartItems.map((item, index) => (
              <CartItem
                key={item.id}
                item={item}
                index={index}
                onIncrease={() => updateQuantity(item.id, 1)}
                onDecrease={() => updateQuantity(item.id, -1)}
                onRemove={() => removeItem(item.id)}
              />
            ))}
          </div>

          <div className="lg:col-span-4">
            <div className="bg-card rounded-2xl p-8 border border-border shadow-sm sticky top-8 animate-fade-in">
              <h2 className="font-sans text-3xl text-card-foreground mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span className="font-sans">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Total Quantity</span>
                  <span className="font-sans">{totalWeight}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span></span>
                  <span className="font-sans"></span>
                </div>
                <div className="h-px bg-border my-4" />
                <div className="flex justify-between text-foreground text-xl">
                  <span className="font-sans font-semibold">Total</span>
                  <span className="font-sans font-semibold">₹{total.toFixed(2)}</span>
                </div>
              </div>

              <Button
  disabled={hasOutOfStockItem}
  onClick={() => {
    if (hasOutOfStockItem) {
      toast.error("Some items exceed available stock");
      return;
    }
    navigate("/checkout");
  }}
  className={`w-full rounded-2xl py-6 text-lg font-sans transition-all
    ${hasOutOfStockItem
      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
      : "bg-primary hover:bg-primary/90 text-primary-foreground"
    }`}
>
  Proceed to Checkout
</Button>

            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
