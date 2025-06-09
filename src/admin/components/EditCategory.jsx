import React, { useEffect, useState } from "react";

const EditCategoryModal = ({ isOpen, onClose, category, onUpdate }) => {
  const [editedDetails, setEditedDetails] = useState({
    name: "",
    description: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (isOpen && category) {
      setEditedDetails({
        name: category.name,
        description: category.description,
        image: null,
      });
      setImagePreview(category.image);
    }
  }, [isOpen, category]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setEditedDetails((prev) => ({ ...prev, image: file }));
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(category.image);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      ...editedDetails,
      id: category._id,
    };
    onUpdate(updatedData);
    // Do NOT call onClose() here; close modal after update success in parent component
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-[#121212] w-full max-w-2xl min-h-[450px] p-10 rounded-lg shadow-xl text-white relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl font-semibold text-gray-400 hover:text-white"
        >
          ×
        </button>

        <h2 className="text-lg font-semibold mb-5">Edit Category</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-white mb-1">Category Name</label>
            <input
              type="text"
              value={editedDetails.name}
              onChange={(e) =>
                setEditedDetails({ ...editedDetails, name: e.target.value })
              }
              className="w-full px-3 py-2 bg-[#1f1f1f] border border-gray-700 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-white mb-1">Description</label>
            <textarea
              value={editedDetails.description}
              onChange={(e) =>
                setEditedDetails({ ...editedDetails, description: e.target.value })
              }
              rows="3"
              className="w-full px-3 py-2 bg-[#1f1f1f] border border-gray-700 rounded-md"
              required
            />
          </div>

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
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-500 rounded-md hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-yellow-300 text-yellow-300 rounded-md hover:bg-yellow-300 hover:text-black"
            >
              Update Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCategoryModal;
