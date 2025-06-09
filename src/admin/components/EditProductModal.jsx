import React, { useState, useEffect } from "react";
import { editProductApi } from "../../services/allApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditProductModal = ({ isOpen, onClose, product }) => {
  const [productDetails, setProductDetails] = useState({
    name: "",
    price: "",
    category: "",
    colors: [],
    sizes: [],
  });

  const [imagePreviews, setImagePreviews] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product) {
      setProductDetails({
        name: product.name || "",
        price: product.price || "",
        category: product.category || "",
        colors: product.colors || [],
        sizes: product.sizes || [],
      });
      setImagePreviews(product.images || []);
    }
  }, [product]);

  const handleInputChange = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e, type) => {
    const { value, checked } = e.target;
    let updated = [...productDetails[type]];
    if (checked) {
      updated.push(value);
    } else {
      updated = updated.filter((item) => item !== value);
    }
    setProductDetails({ ...productDetails, [type]: updated });
  };

  const validate = () => {
    let tempErrors = {};
    if (!productDetails.name.trim()) tempErrors.name = "Name is required";
    if (!productDetails.price) tempErrors.price = "Price is required";
    if (!productDetails.category.trim()) tempErrors.category = "Category is required";
    if (productDetails.colors.length === 0) tempErrors.colors = "Select at least one color";
    if (productDetails.sizes.length === 0) tempErrors.sizes = "Select at least one size";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("name", productDetails.name);
    formData.append("price", productDetails.price);
    formData.append("category", productDetails.category);

    (productDetails.colors || []).forEach((color) =>
      formData.append("colors", color)
    );
    (productDetails.sizes || []).forEach((size) =>
      formData.append("sizes", size)
    );

    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      };

      await editProductApi(product._id, formData, headers);
      // Keep loader visible for a short time before hiding
      setTimeout(() => {
        setLoading(false);
        toast.success("Product updated successfully!");
        setTimeout(() => {
          onClose();
        }, 1800); // Show toast before closing modal
      }, 1200); // Loader stays visible for 1.2s after API response
    } catch (err) {
      setLoading(false);
      toast.error("Failed to update product. Please try again.");
      console.error("Edit product error:", err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 overflow-auto p-5">
      <ToastContainer position="top-center" autoClose={2000} />
      <div className="bg-[#121212] w-full max-w-4xl min-h-[600px] p-10 rounded-lg shadow-xl text-white relative max-h-[95vh] overflow-y-auto scrollbar-hide">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl font-semibold text-gray-400 hover:text-white"
          aria-label="Close modal"
        >
          ×
        </button>

        <h2 className="text-xl font-semibold mb-6">Edit Product</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Product Name <span className="text-red-500">*</span></label>
            <input
              name="name"
              type="text"
              value={productDetails.name}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 bg-[#1f1f1f] border rounded-md focus:ring-[#F5DEB3] ${errors.name ? "border-red-500" : "border-gray-700"}`}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm mb-1">Price <span className="text-red-500">*</span></label>
            <input
              name="price"
              type="number"
              value={productDetails.price}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 bg-[#1f1f1f] border rounded-md focus:ring-[#F5DEB3] ${errors.price ? "border-red-500" : "border-gray-700"}`}
            />
            {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
          </div>

          <div>
            <label className="block text-sm mb-1">Category <span className="text-red-500">*</span></label>
            <input
              name="category"
              type="text"
              value={productDetails.category}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 bg-[#1f1f1f] border rounded-md focus:ring-[#F5DEB3] ${errors.category ? "border-red-500" : "border-gray-700"}`}
            />
            {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
          </div>

          <div>
            <p className="block text-sm mb-1">Colors <span className="text-red-500">*</span></p>
            <div className="flex flex-wrap gap-4 text-white">
              {["Black", "White", "Red", "Blue", "Green"].map((color) => (
                <label key={color} className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    value={color}
                    checked={productDetails.colors.includes(color)}
                    onChange={(e) => handleCheckboxChange(e, "colors")}
                    className="accent-[#F5DEB3]"
                  />
                  {color}
                </label>
              ))}
            </div>
            {errors.colors && <p className="text-red-500 text-xs mt-1">{errors.colors}</p>}
          </div>

          <div>
            <p className="block text-sm mb-1">Sizes <span className="text-red-500">*</span></p>
            <div className="flex flex-wrap gap-4 text-white">
              {["S", "M", "L", "XL", "XXL", "3XL"].map((size) => (
                <label key={size} className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    value={size}
                    checked={productDetails.sizes.includes(size)}
                    onChange={(e) => handleCheckboxChange(e, "sizes")}
                    className="accent-[#F5DEB3]"
                  />
                  {size}
                </label>
              ))}
            </div>
            {errors.sizes && <p className="text-red-500 text-xs mt-1">{errors.sizes}</p>}
          </div>

          <div className="mt-2 flex gap-2 flex-wrap">
            {imagePreviews.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`preview-${index}`}
                className="w-28 h-28 object-cover rounded border cursor-not-allowed"
                title="Image can't be changed"
              />
            ))}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-500 rounded-md hover:bg-gray-700 transition"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-[#F5DEB3] text-[#F5DEB3] rounded-md hover:bg-[#F5DEB3] hover:text-black transition"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-[#F5DEB3]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                  </svg>
                  Saving...
                </span>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;