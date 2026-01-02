
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import HeaderLayout from "@/Layout/Header/HeaderLayout";
import {
  getAddressesApi,
  setDefaultAddressApi,
  deleteAddressApi
} from "@/API/userAPI";
import AddressCard from "@/Components/Address/AddressCard";
import AddressFormModal from "@/Components/Address/AddressFormModal";

export default function AddressPage() {
  const [addresses, setAddresses] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const navigate=useNavigate()
  const loadAddresses = async () => {
    try {
      const res = await getAddressesApi();
      setAddresses(res.addresses || []);
    } catch {
      toast.error("Failed to load addresses");
    }
  };

  useEffect(() => {
    loadAddresses();
  }, []);

  const handleDefault = async (id) => {
    try {
      await setDefaultAddressApi(id);
      toast.success("Default address updated");
      loadAddresses();
    } catch {
      toast.error("Failed to set default");
    }
  };
const handleDelete = async (id) => {

  try {
    await deleteAddressApi(id);
    setAddresses((prev) => prev.filter((a) => a._id !== id));
    toast.success("Address deleted");
  } catch {
    toast.error("Failed to delete address");
  }
};

  return (
    <>
    <HeaderLayout/>
    <div className="max-w-5xl mx-auto px-4 py-8">
      
    <div className="flex flex-wrap gap-3 justify-between items-center mb-6">
  <div className="flex items-center gap-4">
   <button
  onClick={() => navigate("/home")}
  className="
    inline-flex items-center gap-2
    px-4 py-2
    rounded-full
    border border-green-200
    bg-green-50
    text-green-700 text-sm font-medium
    shadow-sm
    hover:bg-green-100 hover:border-green-300
    hover:shadow-md
    active:scale-95
    transition-all duration-200
  "
>
  <span className="text-base">←</span>
  Back to Home
</button>

    <h1 className="text-2xl font-semibold text-green-800">
      My Addresses
    </h1>
  </div>

  <button
    onClick={() => {
      setEditing(null);
      setOpen(true);
    }}
    className="px-5 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
  >
    + Add Address
  </button>
</div>

      <div className="grid md:grid-cols-2 gap-5">
        {addresses.map((addr) => (
          <AddressCard
            key={addr._id}
            address={addr}
            onEdit={() => {
              setEditing(addr);
              setOpen(true);
            }}
            onDefault={() => handleDefault(addr._id)}
            onDelete={() => handleDelete(addr._id)}

          />
        ))}
      </div>

      <AddressFormModal
        open={open}
        onClose={() => setOpen(false)}
        initialData={editing}
        onSuccess={loadAddresses}
      />
    </div>
    </>
  );
}
