
import { useState } from "react";
import { toast } from "sonner";
import { createEnquiryApi } from "@/API/userAPI";

export default function EnquiryModal({ open, onClose, product }) {
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState(
    `Hi, I want to enquire about ${product?.name}`
  );
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const submit = async () => {
    if (!phone || !message) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      await createEnquiryApi({
        productId: product._id,
        productName: product.name,
        productImage: product.mainImage,
        message,
        phone,
      });

      toast.success("Enquiry sent");
      onClose();
    } catch {
      toast.error("Failed to send enquiry");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 space-y-5">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Product Enquiry</h3>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="flex items-center gap-4">
          <img
            src={product.mainImage}
            className="w-16 h-16 rounded-lg object-cover border"
          />
          <p className="font-medium">{product.name}</p>
        </div>

        <textarea
          className="lux-input"
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <input
          className="lux-input"
          placeholder="Your phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <button
          onClick={submit}
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl py-3 font-semibold"
        >
          {loading ? "Sending..." : "Send Enquiry"}
        </button>
      </div>
    </div>
  );
}
