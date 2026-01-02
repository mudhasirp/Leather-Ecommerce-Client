
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ImageGallery from "@/Components/Product/ImageGallery";
import { addToCart, clearCartApi } from "@/API/userAPI";
import EnquiryModal from "@/Components/Enquiry/EnquiryModal";

export default function ProductDetail({ product }) {
  const navigate = useNavigate();
  const p = product ?? {};

  
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [packs, setPacks] = useState(1); 
const [enquiryOpen, setEnquiryOpen] = useState(false);

  useEffect(() => {
    if (p?.unitVariants?.length) {
      setSelectedUnit(p.unitVariants[0]);
      setPacks(1);
    }
  }, [p]);

  const images = useMemo(() => {
    if (Array.isArray(p.images) && p.images.length) {
      return [p.mainImage, ...p.images];
    }
    return [p.mainImage].filter(Boolean);
  }, [p]);

  const unitWeight = selectedUnit?.weightInGrams || 0;
  const unitPrice = selectedUnit?.price || 0;
  const availableStock = selectedUnit?.stock || 0;

  const totalWeightGrams = unitWeight * packs;
  const totalWeightKg = totalWeightGrams / 1000;
  const totalPrice = unitPrice * packs;

 const handleAddToCart = async () => {
  if (!selectedUnit) {
    toast.error("Please select a pack size");
    return;
  }

  if (packs < 1) {
    toast.error("Invalid quantity");
    return;
  }

  try {
    await addToCart({
      productId: p._id,
      unitLabel: selectedUnit.label,
      qty: packs,
    });

    toast.success("Added to cart");
  } catch (err) {
    toast.error("Failed to add to cart");
  }
};

  const handleBuyNow = async () => {
  if (!selectedUnit) {
    toast.error("Please select a pack size");
    return;
  }

  if (packs < 1) {
    toast.error("Invalid quantity");
    return;
  }

  try {
    await clearCartApi();

    
    await addToCart({
      productId: p._id,
      unitLabel: selectedUnit.label,
      qty: packs,
    });

    navigate("/checkout");
  } catch (error) {
    toast.error("Failed to proceed to checkout");
  }
};



  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8">

        <div className="mb-6 text-sm text-muted-foreground">
          Home / Vegetables /{" "}
          <span className="text-foreground font-medium">{p.name}</span>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">

          <div className="max-w-[420px]">
            <ImageGallery images={images} />
          </div>

          <div className="space-y-4">

            <div>
              <h1 className="text-3xl font-semibold text-green-800">
                {p.name}
              </h1>
              <p className="mt-2 text-muted-foreground">
                {p.description}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-3">
                Choose Pack Size
              </h4>
              <div className="flex flex-wrap gap-3">
                {p.unitVariants?.map((unit) => (
                  <button
                    key={unit.label}
                    onClick={() => {
                      setSelectedUnit(unit);
                      setPacks(1);
                    }}
                    className={`px-5 py-2 rounded-xl border text-sm font-medium transition
                      ${
                        selectedUnit?.label === unit.label
                          ? "border-green-600 bg-green-50 text-green-700"
                          : "border-border hover:border-green-400"
                      }`}
                  >
                    {unit.label} <span className="ml-1">₹{unit.price}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center border rounded-xl overflow-hidden">
                <button
                  onClick={() => setPacks((p) => Math.max(1, p - 1))}
                  className="px-4 py-2 text-lg"
                >
                  −
                </button>

                <span className="px-6 py-2 font-medium min-w-[90px] text-center">
                  {totalWeightKg >= 1
                    ? `${totalWeightKg} kg`
                    : `${totalWeightGrams} g`}
                </span>

                <button
                  onClick={() =>
                    setPacks((p) => Math.min(p + 1, availableStock))
                  }
                  className="px-4 py-2 text-lg"
                >
                  +
                </button>
              </div>

           
            </div>

            <div>
              <div className="text-3xl font-semibold text-green-700">
                ₹{totalPrice}
              </div>
              <p className="text-sm text-muted-foreground">
                Total price
              </p>
              
            </div>
      <div className="space-y-1">
  <div
    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
      ${
        availableStock === 0 || packs >= availableStock
          ? "bg-red-100 text-red-700"
          : "bg-green-50 text-green-700"
      }`}
  >
    <span
      className={`w-2 h-2 rounded-full ${
        availableStock === 0 || packs >= availableStock
          ? "bg-red-600"
          : "bg-green-600"
      }`}
    />

    {availableStock === 0 ? (
      "Out of stock"
    ) : packs >= availableStock ? (
      "Only this stock available"
    ) : (
      `${availableStock * unitWeight >= 1000
        ? (availableStock * unitWeight) / 1000 + " kg"
        : availableStock * unitWeight + " g"} available`
    )}
  </div>
</div>




          
<div className="space-y-4 pt-4">

  <div className="flex gap-4">
    <button
      onClick={handleBuyNow}
      className="
        flex-1
        bg-green-600 hover:bg-green-700
        text-white font-semibold
        py-4 rounded-xl
        transition
      "
    >
      Buy Now
    </button>

    <button
      onClick={handleAddToCart}
      className="
        flex-1
        border-2 border-green-600
        text-green-700 font-semibold
        py-4 rounded-xl
        hover:bg-green-50
        transition
      "
    >
      Add to Cart
    </button>
  </div>

  <button
    onClick={() => setEnquiryOpen(true)}
    className="
      w-full
      py-3 rounded-xl
      border border-green-300
      text-green-700 font-medium
      bg-green-50
      hover:bg-green-100
      transition
    "
  >
    Send Enquiry
  </button>
  
<EnquiryModal
  open={enquiryOpen}
  onClose={() => setEnquiryOpen(false)}
  product={p}
/>
</div>



          </div>
        </div>
      </div>
    </div>
  );
}
