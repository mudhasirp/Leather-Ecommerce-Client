
import api from "./axiosInstance";

export const adminLoginApi = async ({ email, password }) => {
  const res = await api.post("/admin/login", { email, password });
  return res.data; 
};

export const getCategoriesApi=async()=>{
   const res =await api.get("/admin/categories")
   return res.data
}
export const createCategoryApi = async (formData) => {
    const res = await api.post("/admin/categories", formData /*, { headers: { "Content-Type": "multipart/form-data" } }*/)

  return res.data;
};

export const toggleCategoryStatusApi= async(id)=>{
  const res=await api.patch(`/admin/categories/${id}/toggle`);
  return res.data
}

export const updateCategoryApi=async(id,formData)=>{
  const res=await api.put(`/admin/categories/${id}`,formData)
  return res.data
}

export const getProductsApi=async ()=>{
  const res=await api.get("/admin/products")
  return res.data
}
export const createProductApi = async (formData) => {
  const res = await api.post("/admin/products", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};
export const updateProductApi = async (id, formData) => {
  const res = await api.put(`/admin/products/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const toggleProductApi = async (id) => {
  const res = await api.patch(`/admin/products/${id}/toggle`);
  return res.data;
};
export const getAdminOrdersApi = async () => {
  const res = await api.get("/admin/orders");
  return res.data;
};

export const updateOrderStatusApi = async (id, status) => {
  const res = await api.patch(`/admin/orders/${id}/status`, { status });
  return res.data;
};
export const getAdminEnquiriesApi = async () => {
  const res = await api.get("/admin/enquiries");
  return res.data;
};

export const updateEnquiryStatusApi = async (id, status) => {
  const res = await api.patch(`/admin/enquiries/${id}/status`, { status });
  return res.data;
};
export const getAdminCustomersApi=async()=>{
  const res= await api.get("/admin/customers");
  return res.data
}
export const getAdminCustomerDetailsApi = async (id) => {
  const res = await api.get(`/admin/customers/${id}`);
  return res.data;
};

export const toggleCustomerBlockApi = async (id) => {
  const res = await api.patch(`/admin/customers/${id}/block`);
  return res.data;
};
export const getDashboardApi = async (range = "month") => {
  const res = await api.get(`/admin/dashboard?range=${range}`);
  return res.data;
};

