import React, { useState, useEffect, useContext } from "react";
import { addCategoryApi } from "../../services/allApi";
import { toast } from "react-toastify";
import { addCategoryResponseContext } from "../../context/ContextApi";

const AddCategoryModal = ({ isOpen, onClose }) => {
  const {addCategoryResponse,setAddCategoryResponse} = useContext(addCategoryResponseContext)
  const [categoryDetails, setCategoryDetails] = useState({
    categoryName: "",
    description: "",
    slug: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false); // Loader state

  useEffect(() => {
    if (!isOpen) {
      setCategoryDetails({
        categoryName: "",
        description: "",
        slug: "",
        image: null,
      });
      setImagePreview(null);
      setLoading(false);
    }
  }, [isOpen]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCategoryDetails((prev) => ({ ...prev, image: file }));
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loader
    const formData = new FormData();
    formData.append("name", categoryDetails.categoryName);
    formData.append("description", categoryDetails.description);
    formData.append("slug", categoryDetails.slug);
    if (categoryDetails.image) {
      formData.append("image", categoryDetails.image);
    }

    const reqHeader = {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    try {
      const result = await addCategoryApi(formData, reqHeader);
      if (result.status >= 200 && result.status < 300) {
        toast.success("Category added successfully!");
        setLoading(false); // Stop loader
        setAddCategoryResponse(result)        
        onClose();
      }
    } catch (e) {
      setLoading(false); // Stop loader
      console.log(e);
      toast.error("Failed to add category");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-[#121212] w-full max-w-2xl min-h-[500px] p-10 rounded-lg shadow-xl text-white relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl font-semibold text-gray-400 hover:text-white"
          disabled={loading}
        >
          ×
        </button>

        <h2 className="text-lg font-semibold mb-5">Add New Category</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Category Name */}
          <div>
            <label className="block text-sm text-white mb-1">Category Name</label>
            <input
              type="text"
              value={categoryDetails.categoryName}
              onChange={(e) =>
                setCategoryDetails({ ...categoryDetails, categoryName: e.target.value })
              }
              placeholder="Enter category name"
              className="w-full px-3 py-2 bg-[#1f1f1f] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F5DEB3]"
              required
              disabled={loading}
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm text-white mb-1">Slug</label>
            <input
              type="text"
              value={categoryDetails.slug}
              onChange={(e) =>
                setCategoryDetails({ ...categoryDetails, slug: e.target.value })
              }
              placeholder="Enter category slug"
              className="w-full px-3 py-2 bg-[#1f1f1f] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F5DEB3]"
              required
              disabled={loading}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm text-white mb-1">Description</label>
            <textarea
              value={categoryDetails.description}
              onChange={(e) =>
                setCategoryDetails({ ...categoryDetails, description: e.target.value })
              }
              placeholder="Enter category description"
              className="w-full px-3 py-2 bg-[#1f1f1f] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F5DEB3]"
              rows="3"
              required
              disabled={loading}
            />
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm text-white mb-1">Cover Image</label>
            <div className="bg-white flex items-center justify-center h-40 rounded-md mb-2 overflow-hidden">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="h-full object-cover" />
              ) : (
                <p className="text-gray-500">No Image Selected</p>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="text-sm text-gray-300 file:bg-transparent file:border file:border-gray-700 file:rounded-md file:px-4 file:py-1"
              disabled={loading}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
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
              className="px-4 py-2 border border-[#F5DEB3] text-[#F5DEB3] rounded-md hover:bg-[#F5DEB3] hover:text-black transition flex items-center justify-center min-w-[120px]"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-2 text-[#F5DEB3]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                  </svg>
                  Adding...
                </>
              ) : (
                "Add Category"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryModal;