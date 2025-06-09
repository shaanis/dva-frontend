import React, { useState } from 'react';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeleteModal = ({ isOpen, onClose, onConfirm }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);

    // Call the delete function
    await onConfirm();

    // Wait 3 seconds before closing modal
    setTimeout(() => {
      setLoading(false);
      onClose();
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/60 transition-opacity duration-300">
      <ToastContainer position="top-center" autoClose={2000} />
      <div className="bg-[#1a1a1a] text-white p-6 rounded-2xl shadow-2xl w-[90%] max-w-md animate-fadeIn">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-2">Are you sure?</h2>
        <p className="text-gray-300 mb-6">
          This action cannot be undone. Do you really want to delete this product?
        </p>

        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-500 text-gray-300 hover:text-white hover:border-white transition"
            disabled={loading}
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition flex items-center justify-center min-w-[90px]"
            disabled={loading}
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
