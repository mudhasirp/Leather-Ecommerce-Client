"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, Share2, BookOpen } from "lucide-react";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { Badge } from "../ui/badge";

/**
 * Map common color names (case-insensitive) to hex values.
 * Add more names you use in your admin UI.
 */
const COLOR_MAP = {
  black: "#000000",
  brown: "#8B4513",
  red: "#B22222",
};

function swatchColorFromVariant(variant) {
  // prefer explicit hex field
  if (variant?.colorHex && typeof variant.colorHex === "string" && variant.colorHex.trim()) {
    return variant.colorHex.trim();
  }
  const c = (variant?.color || "").toString().trim();
  if (!c) return "transparent";
  // try exact css color (like "#..." or "rgb(" etc.)
  if (c.startsWith("#") || c.startsWith("rgb") || c.startsWith("hsl")) return c;
  // otherwise lookup by lower-cased name
  const mapped = COLOR_MAP[c.toLowerCase()];
  return mapped || "transparent";
}

/** detect if color is very light (for showing border) */
function isLightColor(hex) {
  try {
    if (!hex || hex === "transparent") return false;
    // normalize short hex
    let h = hex.replace(/\s/g, "");
    if (h.startsWith("rgb")) {
      // basic parse rgb(r,g,b)
      const nums = h.match(/\d+/g)?.slice(0, 3).map(Number);
      if (!nums) return false;
      const [r, g, b] = nums;
      // luminance
      const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      return lum > 200;
    }
    if (h.startsWith("#")) {
      h = h.substring(1);
      if (h.length === 3) h = h.split("").map((c) => c + c).join("");
      const r = parseInt(h.substring(0, 2), 16);
      const g = parseInt(h.substring(2, 4), 16);
      const b = parseInt(h.substring(4, 6), 16);
      const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      return lum > 200;
    }
  } catch (e) {
    return false;
  }
  return false;
}

export default function ProductInfo({
  product,
  selectedVariant,
  selectedSize,
  quantity,
  availableStock,
  isFavorite,
  onVariantChange,
  onSizeChange,
  onQuantityChange,
  onAddToCart,
  onToggleFavorite,
  onShare,
}) {
  const displayPrice = (selectedVariant && selectedVariant.price) ? selectedVariant.price : (product && product.basePrice) || 0;

  // ---------- derive sizes from product.variants ----------
  const allSizes = React.useMemo(() => {
    if (!product?.variants || !product.variants.length) return [];
    const set = new Set();
    for (const v of product.variants) {
      if (v.size) set.add(String(v.size).trim());
    }
    return Array.from(set);
  }, [product]);

  // If a color/variant is selected, prefer sizes for that color
  const sizesForSelected = React.useMemo(() => {
    if (!product?.variants || !product.variants.length) return [];
    if (selectedVariant?.color) {
      const sizes = product.variants
        .filter((v) => v.color && String(v.color).toLowerCase() === String(selectedVariant.color).toLowerCase())
        .map((v) => v.size)
        .filter(Boolean);
      const unique = Array.from(new Set(sizes));
      if (unique.length) return unique;
    }
    return allSizes;
  }, [product, selectedVariant, allSizes]);

  // helper to compute stock for a given size (prefer variant matching selected color & size)
  const stockForSize = React.useCallback((size) => {
    if (!product?.variants || !product.variants.length) return 0;

    // 1) if selectedVariant has color, try to find the exact variant by color+size
    if (selectedVariant?.color) {
      const found = product.variants.find(
        (v) =>
          v.size === size &&
          v.color &&
          String(v.color).toLowerCase() === String(selectedVariant.color).toLowerCase()
      );
      if (found) {
        return typeof found.stock === "number" ? found.stock : 0;
      }
    }

    // 2) otherwise find any variant matching the size
    const any = product.variants.find((v) => v.size === size);
    if (any) return typeof any.stock === "number" ? any.stock : 0;

    // 3) as a last resort sum stock across variants that match the size
    const sum = product.variants.reduce((acc, v) => {
      if (v.size === size && typeof v.stock === "number") return acc + v.stock;
      return acc;
    }, 0);
    return sum;
  }, [product, selectedVariant]);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="sticky top-8 space-y-6">
      <div>
        <p className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">Premium Leather</p>
        <h1 className="font-serif text-3xl md:text-4xl font-light text-foreground leading-tight">{product?.name}</h1>
        <p className="mt-3 text-sm md:text-base leading-relaxed text-muted-foreground">{product?.description}</p>
      </div>

      
      <div>
        <p className="text-3xl md:text-4xl font-light text-foreground">₹{Number(displayPrice).toFixed(2)}</p>
      </div>

      <div>
        <p className="mb-3 text-sm font-medium text-foreground">Color: {selectedVariant?.color ?? "Default"}</p>
        <div className="flex gap-3 flex-wrap">
          {(product?.variants ?? []).map((variant, idx) => {
            const swatch = swatchColorFromVariant(variant);
            const light = isLightColor(swatch);
            const isSelected = (selectedVariant?.color && variant.color && selectedVariant.color.toLowerCase() === variant.color.toLowerCase()) || (selectedVariant?._id && String(selectedVariant._id) === String(variant._id));
            const key = variant._id || `${variant.color || "v"}-${idx}`;

            return (
              <motion.button
                key={key}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => { onVariantChange(variant); onSizeChange(null); }}
                className={`group relative h-10 w-10 rounded-full transition-all duration-200 flex items-center justify-center ${isSelected ? "border-accent shadow-lg scale-110" : "border-border hover:border-muted-foreground"}`}
                style={{
                  backgroundColor: swatch === "transparent" ? "transparent" : swatch,
                  borderWidth: "2px",
                  // ensure visible border for very light swatches (white/offwhite)
                  borderColor: isSelected ? undefined : (light ? "#d1d5db" : undefined),
                }}
                aria-label={`Select ${variant.color}`}
                title={variant.color}
              >
                {/* selected ring */}
                {isSelected && (
                  <motion.div layoutId="selected-swatch" className="absolute inset-0 rounded-full ring-2 ring-accent ring-offset-2" />
                )}

                {/* Show small check or inner dot for contrast if swatch is light */}
                {light ? (
                  <div className="w-2 h-2 rounded-full bg-gray-700/70" />
                ) : null}
              </motion.button>
            );
          })}
        </div>
      </div>

      <div>
        <label htmlFor="size" className="mb-2 block text-sm font-medium text-foreground">Size</label>
        <Select value={selectedSize ?? ""} onValueChange={(val) => onSizeChange(val === "" ? null : val)}>
          <SelectTrigger id="size" className="border-border bg-card text-foreground">
            <SelectValue placeholder="Select a size" />
          </SelectTrigger>
          <SelectContent>
            {sizesForSelected.length === 0 ? (
              <SelectItem value="">One Size</SelectItem>
            ) : (
              sizesForSelected.map((size) => {
                const stock = stockForSize(size);
                return <SelectItem key={size} value={size}>{size} {stock === 0 && "(Out of Stock)"}</SelectItem>;
              })
            )}
          </SelectContent>
        </Select>
      </div>

      {selectedSize && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {availableStock === 0 ? (
            <Badge variant="destructive" className="w-full justify-center py-2">Out of Stock</Badge>
          ) : availableStock < 3 ? (
            <Badge variant="outline" className="w-full justify-center py-2 bg-yellow-50 text-yellow-800 border-yellow-200">Only {availableStock} left</Badge>
          ) : null}
        </motion.div>
      )}

      <div>
        <p className="mb-3 text-sm font-medium text-foreground">Quantity</p>
        <div className="flex items-center gap-2 border border-border rounded-lg w-fit">
          <button onClick={() => onQuantityChange(Math.max(1, quantity - 1))} className="px-3 py-2 hover:bg-muted transition-colors" aria-label="Decrease quantity">−</button>
          <span className="w-12 text-center font-medium">{quantity}</span>
          <button onClick={() => onQuantityChange(quantity + 1)} className="px-3 py-2 hover:bg-muted transition-colors" aria-label="Increase quantity">+</button>
        </div>
      </div>

      <Button onClick={onAddToCart} disabled={availableStock === 0} size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-3">
        {availableStock === 0 ? "Out of Stock" : "Add to Cart"}
      </Button>

      <div className="flex gap-3">
        <Button variant="outline" size="lg" onClick={onToggleFavorite} className="flex-1 border-border bg-transparent" aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}>
          <Heart className={`h-5 w-5 ${isFavorite ? "fill-accent text-accent" : "text-foreground"}`} />
        </Button>
        <Button variant="outline" size="lg" onClick={onShare} className="flex-1 border-border bg-transparent" aria-label="Share product">
          <Share2 className="h-5 w-5 text-foreground" />
        </Button>
        <Button variant="outline" size="lg" className="flex-1 border-border bg-transparent" aria-label="View size guide">
          <BookOpen className="h-5 w-5 text-foreground" />
        </Button>
      </div>

      <div className="space-y-2 border-t border-border pt-6 text-xs text-muted-foreground">
        <p>✓ Free shipping on orders over ₹5,000</p>
        <p>✓ 30-day return policy</p>
        <p>✓ Handcrafted premium leather</p>
      </div>
    </motion.div>
  );
}
