import React, { useState, useEffect } from "react";
import { addProductApi, getAllCategoryApi } from "../../services/allApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddProductModal = ({ isOpen, onClose }) => {
  const [productDetails, setProductDetails] = useState({
    name: "",
    price: "",
    category: "",
    // colors: [],
    sizes: [],
  });

  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (!isOpen) {
      setProductDetails({
        name: "",
        price: "",
        category: "",
        // colors: [],
        sizes: [],
      });
      setImages([]);
      setImagePreviews([]);
      setErrors({});
      setLoading(false);
      setSuccessMsg("");
    }
  }, [isOpen]);

  useEffect(() => {
    return () => {
      imagePreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imagePreviews]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    const updatedImages = [...images, ...files];
    const newPreviews = files.map((file) => URL.createObjectURL(file));

    setImages(updatedImages);
    setImagePreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

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
    if (!productDetails.category.trim())
      tempErrors.category = "Category is required";
    // if (productDetails.colors.length === 0) tempErrors.colors = "Select at least one color";
    if (productDetails.sizes.length === 0)
      tempErrors.sizes = "Select at least one size";
    if (images.length === 0) tempErrors.images = "Upload at least one image";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setSuccessMsg("");

    const formData = new FormData();
    formData.append("name", productDetails.name);
    formData.append("price", productDetails.price);
    formData.append("category", productDetails.category);
    // productDetails.colors.forEach((color) => formData.append("colors", color));
    productDetails.sizes.forEach((size) => formData.append("sizes", size));
    images.forEach((image) => formData.append("image", image));

    const token = localStorage.getItem("token");
    const reqHeader = {
      Authorization: `Bearer ${token}`,
    };

    try {
      await addProductApi(formData, reqHeader);
      setLoading(false);
      toast.success("Product added successfully!");
      setTimeout(() => {
        setSuccessMsg("");
        onClose();
      }, 1500);
    } catch (error) {
      setLoading(false);
      toast.error("Failed to add product. Please try again.");
      setTimeout(() => setSuccessMsg(""), 2000);
      console.error("Error adding product:", error);
    }
  };

 

  // for category dropdown
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getAllCategoryApi();
        if (res.status === 200) {
          setCategories(res.data); // assuming data is an array of category objects
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen]);

   if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 overflow-auto p-5">
      <ToastContainer position="top-center" autoClose={4000} />
      <div className="bg-[#121212] w-full max-w-4xl min-h-[600px] p-10 rounded-lg shadow-xl text-white relative max-h-[95vh] overflow-y-auto scrollbar-hide">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl font-semibold text-gray-400 hover:text-white"
          aria-label="Close modal"
        >
          ×
        </button>

        <h2 className="text-xl font-semibold mb-6">Add New Product</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Product Name */}
          <div>
            <label className="block text-sm mb-1">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              name="name"
              type="text"
              value={productDetails.name}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 bg-[#1f1f1f] border rounded-md focus:ring-[#F5DEB3] ${
                errors.name ? "border-red-500" : "border-gray-700"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm mb-1">
              Price <span className="text-red-500">*</span>
            </label>
            <input
              name="price"
              type="number"
              value={productDetails.price}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 bg-[#1f1f1f] border rounded-md focus:ring-[#F5DEB3] ${
                errors.price ? "border-red-500" : "border-gray-700"
              }`}
            />
            {errors.price && (
              <p className="text-red-500 text-xs mt-1">{errors.price}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm mb-1">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              value={productDetails.category}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 bg-[#1f1f1f] border rounded-md focus:ring-[#F5DEB3] ${
                errors.category ? "border-red-500" : "border-gray-700"
              }`}
            >
              <option value="">Select a Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>

            {errors.category && (
              <p className="text-red-500 text-xs mt-1">{errors.category}</p>
            )}
          </div>

          {/* Colors */}
          {/* <div>
            <p className="block text-sm mb-1">
              Colors <span className="text-red-500">*</span>
            </p>
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
          </div> */}

          {/* Sizes */}
          <div>
            <p className="block text-sm mb-1">
              Sizes <span className="text-red-500">*</span>
            </p>
            <div className="flex flex-wrap gap-4 text-white">
              {["S", "M", "L", "XL", "XXL", "3XL"].map((size) => (
                <label
                  key={size}
                  className="flex items-center gap-2 cursor-pointer select-none"
                >
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
            {errors.sizes && (
              <p className="text-red-500 text-xs mt-1">{errors.sizes}</p>
            )}
          </div>

          {/* Images */}
          <div>
            <label className="block text-sm mb-1">
              Upload Images <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className={`text-sm text-gray-300 file:bg-transparent file:border file:border-gray-700 file:rounded-md file:px-4 file:py-1 ${
                errors.images ? "border-red-500" : ""
              }`}
            />
            {errors.images && (
              <p className="text-red-500 text-xs mt-1">{errors.images}</p>
            )}

            <div className="mt-2 flex gap-2 flex-wrap">
              {imagePreviews.map((src, index) => (
                <div
                  key={index}
                  className="relative w-28 h-28 rounded border overflow-hidden"
                >
                  <img
                    src={src}
                    alt={`preview-${index}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-red-600 rounded-full w-6 h-6 flex items-center justify-center text-white text-sm font-bold hover:bg-red-700"
                    aria-label="Remove image"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
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
                  <svg
                    className="animate-spin h-5 w-5 text-[#F5DEB3]"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                  Adding...
                </span>
              ) : (
                "Add Product"
              )}
            </button>
          </div>
          {successMsg && (
            <div
              className={`text-center mt-4 text-base font-semibold ${
                successMsg.includes("success")
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {successMsg}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
