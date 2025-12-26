"use client";

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

function mapServerItemToUI(it) {
 
  const raw = it;


  const directSize = raw.size || raw.selectedSize || raw.sizeSnapshot || null;
  const directColor = raw.color || raw.selectedColor || raw.colorSnapshot || null;

  // options array fallback
  let optSize = null, optColor = null;
  if (Array.isArray(raw.options)) {
    for (const o of raw.options) {
      const name = (o.name || "").toString().toLowerCase();
      if (!optColor && (name.includes("color") || name.includes("colour"))) optColor = o.value;
      if (!optSize && (name.includes("size"))) optSize = o.value;
    }
  }

  // variant object fallback
  const variant = raw.variant || raw.variantSnapshot || raw.variantData || null;
  const varSize = variant?.size || null;
  const varColor = variant?.color || variant?.colour || null;

  // attributes/object fallback
  const attrs = raw.attributes || raw.meta || raw.metadata || null;
  let attrSize = null, attrColor = null;
  if (attrs && typeof attrs === "object") {
    if (attrs.size) attrSize = attrs.size;
    if (attrs.color) attrColor = attrs.color;
    // sometimes attributes is array:
    if (Array.isArray(attrs)) {
      attrs.forEach(a => {
        const n = (a.name||"").toLowerCase();
        if (!attrColor && (n.includes("color")||n.includes("colour"))) attrColor = a.value;
        if (!attrSize && n.includes("size")) attrSize = a.value;
      });
    }
  }

  const size = directSize || varSize || optSize || attrSize || "";
  const color = directColor || varColor || optColor || attrColor || "";

  return {
    id: raw._id || raw.id,
    productId: raw.productId,
    name: raw.name || raw.title || (raw.product && raw.product.name) || "Product",
    image: raw.image || raw.thumbnail || raw.product?.image || raw.productSnapshot?.image || "/placeholder.svg",
    color,
    size,
    price: Number(raw.price || raw.unitPrice || raw.priceSnapshot || 0),
    quantity: Number(raw.qty || raw.quantity || raw.count || 1),
    raw,
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
        const data = await getCartApi(); // expects { success, cart }
        const cart = data.cart || data;
        const items = (cart.items || []).map(mapServerItemToUI);
        // temporarily
console.log("raw cart item:", items); 

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
    const item = cartItems.find((i) => i.id === id);
    if (!item) return;
    const newQty = Math.max(1, item.quantity + delta);

    // optimistic UI: mark updating, but wait for API before committing
    setUpdatingIds((s) => new Set(s).add(id));
    try {
      const res = await updateCartItemQtyApi(id, newQty); // returns { success, cart }
      // map server cart to UI items
      const serverItems = res.cart?.items || res.cart?.items || (res.cart ? res.cart.items : null);
      if (serverItems) {
        setCartItems(serverItems.map(mapServerItemToUI));
      } else {
        // fallback: patch locally with returned qty if any
        setCartItems((prev) => prev.map((it) => (it.id === id ? { ...it, quantity: newQty } : it)));
      }
    } catch (err) {
      console.error("Failed update qty:", err);
      toast.error(err?.response?.data?.message || "Failed to update quantity");
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


  // totals computed on client from items (you could use server totals if available)
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  const total = +(subtotal ).toFixed(2);
  const totalItems = cartItems.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);

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
        {/* Header */}
        <div className="mb-12 animate-fade-in">
          <h1 className="font-sans text-3xl md:text-4xl text-primary mb-3 text-balance">Your Cart</h1>
          <p className="text-muted-foreground text-lg">Review your selections before checkout.</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-8 space-y-6">
            {cartItems.map((item, index) => (
              <CartItem
                key={item.id}
                item={item}
                index={index}
                onIncrease={() => updateQuantity(item.id, 1)}
                onDecrease={() => updateQuantity(item.id, -1)}
                onRemove={() => removeItem(item.id)}
                // optionally pass a disabled prop while updating
              />
            ))}
          </div>

          {/* Order Summary */}
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
                  <span className="font-sans">{totalItems}</span>
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

              <Button onClick={() => navigate("/checkout")}
              
className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl py-6 text-lg font-sans shadow-md hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]">
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
