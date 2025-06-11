import React, { useState, useEffect } from "react";
import { editProductApi, getAllCategoryApi } from "../../services/allApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditProductModal = ({ isOpen, onClose, product }) => {
  const [productDetails, setProductDetails] = useState({
    name: "",
    price: "",
    category: "",
    // colors: [],
    sizes: [],
  });

  const [existingImages, setExistingImages] = useState([]); // Cloudinary images
  const [newImages, setNewImages] = useState([]); // Files
  const [removedImages, setRemovedImages] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (product) {
      setProductDetails({
        name: product.name || "",
        price: product.price || "",
        category: product.category || "",
        // colors: product.colors || [],
        sizes: product.sizes || [],
      });
      setExistingImages(product.image || []); // cloudinary image objects
      setNewImages([]);
      setRemovedImages([]);
    }
  }, [product]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getAllCategoryApi();
        if (res.status === 200) setCategories(res.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    if (isOpen) fetchCategories();
  }, [isOpen]);

  const handleInputChange = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e, type) => {
    const { value, checked } = e.target;
    let updated = [...productDetails[type]];
    updated = checked ? [...updated, value] : updated.filter((item) => item !== value);
    setProductDetails({ ...productDetails, [type]: updated });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setNewImages((prev) => [...prev, ...files]);
  };

  const handleRemoveExistingImage = (imgUrl) => {
    setExistingImages((prev) => prev.filter((img) => img !== imgUrl));
    setRemovedImages((prev) => [...prev, imgUrl]);
  };

  const handleRemoveNewImage = (index) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const validate = () => {
    const tempErrors = {};
    if (!productDetails.name.trim()) tempErrors.name = "Name is required";
    if (!productDetails.price) tempErrors.price = "Price is required";
    if (!productDetails.category.trim()) tempErrors.category = "Category is required";
    // if (!productDetails.colors.length) tempErrors.colors = "Select at least one color";
    if (!productDetails.sizes.length) tempErrors.sizes = "Select at least one size";
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
    // productDetails.colors.forEach((color) => formData.append("colors", color));
    productDetails.sizes.forEach((size) => formData.append("sizes", size));
    newImages.forEach((file) => formData.append("images", file));
    removedImages.forEach((img) => formData.append("removedImages", img));

    try {
      const token = localStorage.getItem("token");
    const reqHeader = {
      Authorization: `Bearer ${token}`,
    };
     const result = await editProductApi(product._id, formData,reqHeader);

      if(result.status >=200 && result.status <300){
        toast.success("Product updated successfully!");
      setTimeout(() => {
        setLoading(false);
        onClose();
      }, 2000);
      }else{
        onClose();
      }
    } catch (err) {
      console.error("Edit product error:", err);
      toast.error("Failed to update product.");
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 overflow-auto p-5">
      <ToastContainer position="top-center" autoClose={2000} />
      <div className="bg-[#121212] w-full max-w-4xl min-h-[600px] p-10 rounded-lg text-white relative max-h-[95vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl text-gray-400 hover:text-white"
        >
          ×
        </button>

        <h2 className="text-xl font-semibold mb-6">Edit Product</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block mb-1">Product Name <span className="text-red-500">*</span></label>
            <input
              name="name"
              type="text"
              value={productDetails.name}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 bg-[#1f1f1f] border ${errors.name ? "border-red-500" : "border-gray-700"} rounded`}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          {/* Price */}
          <div>
            <label className="block mb-1">Price <span className="text-red-500">*</span></label>
            <input
              name="price"
              type="number"
              value={productDetails.price}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 bg-[#1f1f1f] border ${errors.price ? "border-red-500" : "border-gray-700"} rounded`}
            />
            {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
          </div>

          {/* Category */}
          <div>
            <label className="block mb-1">Category <span className="text-red-500">*</span></label>
            <select
              name="category"
              value={productDetails.category}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 bg-[#1f1f1f] border ${errors.category ? "border-red-500" : "border-gray-700"} rounded`}
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat.name}>{cat.name}</option>
              ))}
            </select>
            {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
          </div>

          {/* Colors */}
          {/* <div>
            <label className="block mb-1">Colors <span className="text-red-500">*</span></label>
            <div className="flex flex-wrap gap-4">
              {["Black", "White", "Red", "Blue", "Green"].map((color) => (
                <label key={color} className="flex items-center gap-2">
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
            <label className="block mb-1">Sizes <span className="text-red-500">*</span></label>
            <div className="flex flex-wrap gap-4">
              {["S", "M", "L", "XL", "XXL", "3XL"].map((size) => (
                <label key={size} className="flex items-center gap-2">
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

          {/* Image Upload */}
          <div>
            <label className="block mb-1">Product Images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="text-sm text-gray-300 file:bg-[#1f1f1f] file:border file:border-[#F5DEB3] file:rounded file:px-3 file:py-1 file:text-[#F5DEB3] file:cursor-pointer"
            />
          </div>

          {/* Image Previews */}
          <div className="mt-2 flex flex-wrap gap-2">
            {/* Existing Images */}
            {existingImages.map((img, i) => (
              <div key={i} className="relative w-28 h-28">
                <img src={img} className="object-cover w-full h-full rounded border" alt="existing" />
                <button
                  type="button"
                  onClick={() => handleRemoveExistingImage(img)}
                  className="absolute top-0 right-0 bg-black bg-opacity-70 text-white text-sm px-1 rounded-full"
                >
                  ×
                </button>
              </div>
            ))}
            {/* New Images */}
            {newImages.map((img, i) => (
              <div key={i} className="relative w-28 h-28">
                <img src={URL.createObjectURL(img)} className="object-cover w-full h-full rounded border" alt="new" />
                <button
                  type="button"
                  onClick={() => handleRemoveNewImage(i)}
                  className="absolute top-0 right-0 bg-black bg-opacity-70 text-white text-sm px-1 rounded-full"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          {/* Submit */}
          <div className="flex justify-end pt-6 gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-500 rounded hover:bg-gray-700"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-[#F5DEB3] text-[#F5DEB3] rounded hover:bg-[#F5DEB3] hover:text-black"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;
