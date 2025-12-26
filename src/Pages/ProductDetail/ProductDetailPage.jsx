"use client";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductDetail from "@/Layout/Products/ProductDetail";
import { toast } from "sonner";
import { getUserProductBySlugApi } from "@/API/userAPI";
import HeaderLayout from "@/Layout/Header/HeaderLayout";

export default function ProductDetailPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    async function fetchProduct() {
      try {
        const data = await getUserProductBySlugApi(slug);

        if (!data.success) {
          toast.error("Product not found");
          setLoading(false);
          return;
        }

        setProduct(data.product);
      } catch (err) {
        toast.error("Failed to load product");
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [slug]);

  if (loading) return <p className="p-10 text-center">Loading...</p>;
  if (!product) return <p className="p-10 text-center">Product not found.</p>;

  return (
    <main className="min-h-screen bg-background">
            <HeaderLayout />
      
      <ProductDetail product={product} />
    </main>
  );
}
