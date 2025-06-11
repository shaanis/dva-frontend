import React, { useState, useEffect } from "react";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import CategoryTable from "../components/CategoryTable";
import EditCategoryModal from "../components/EditCategory";
import AddCategoryModal from "../components/AddCategoryModal";
import ProductTable from "../components/ProductTable";
import SummaryCard from "../components/SummaryCard";
import { getAllCategoryApi, editCategoryApi,deleteCategoryApi } from "../../services/allApi";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showEditCategoryModal, setShowEditCategoryModal] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState(null);
  const [categoryLength, setCategoryLength] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const navigate = useNavigate();

  // Check token on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setShowLoginModal(true);
      setTimeout(() => {
        setShowLoginModal(false);
        navigate("/login");
      }, 2000);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleEditCategory = (category) => {
    setCategoryToEdit(category);
    setShowEditCategoryModal(true);
  };

  const fetchCategory = async () => {
    try {
      const result = await getAllCategoryApi();
      if (result.status === 200) {
        setCategoryLength(result.data);
      }
    } catch (e) {
      console.error(e);
      toast.error("Failed to fetch categories.");
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);


  // edit category
  const handleUpdateCategory = async (updatedData) => {
    const { id, name, description, image } = updatedData;

    const reqBody = new FormData();
    reqBody.append("name", name);
    reqBody.append("description", description);
    if (image) reqBody.append("image", image);

    const token = localStorage.getItem("token");
    const reqHeader = {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    };

    try {
      const result = await editCategoryApi(id, reqBody, reqHeader);
      if (result.status === 200) {
        fetchCategory();
        setShowEditCategoryModal(false);
        setCategoryToEdit(null);
        toast.success("Category updated successfully!");
      } else {
        console.error("Update failed", result);
        toast.error("Update failed. Please try again.");
      }
    } catch (err) {
      console.error("Update error", err);
      toast.error("Update error. Please try again.");
    }
  };

// delete
  const handleDeleteCategory = async (categoryId) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this category?");
  if (!confirmDelete) return;

  try {
    // const token = localStorage.getItem("token");
    // const reqHeader = {
    //   Authorization: `Bearer ${token}`,
    // };

    const result = await deleteCategoryApi(categoryId);

    if (result.status === 200) {
      alert("Category deleted successfully");
      fetchCategory(); // refresh the category list
    } else {
      alert("Failed to delete category");
    }
  } catch (err) {
    console.error("Delete error:", err);
    alert("An error occurred while deleting the category");
  }
};

  return (
    <div className="min-h-screen bg-[#121212] text-white p-6 space-y-8">
      {/* Login failed modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-[#1a1a1a] p-8 rounded-lg shadow-xl text-white text-center">
            <h2 className="text-2xl font-bold mb-4 text-red-400">Login Failed</h2>
            <p className="mb-2">Please login again.</p>
          </div>
        </div>
      )}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button
          className="flex items-center gap-2 text-white hover:text-yellow-400 text-2xl font-bold pe-5"
          title="Logout"
          onClick={handleLogout}
        >
          <FiLogOut />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SummaryCard />
        <div className="bg-[#1a1a1a] p-6 rounded-lg shadow-md flex justify-between">
          <div>
            <h2 className="text-3xl font-semibold">Categories</h2>
            <p className="text-gray-400">Manage product categories</p>
            <h3 className="text-3xl font-bold mt-4">{categoryLength?.length}</h3>
            <p className="text-gray-400">Total Categories</p>
          </div>
        </div>
      </div>

      <CategoryTable
        onEdit={handleEditCategory}
        onAdd={() => setShowAddCategoryModal(true)}
        onDelete={handleDeleteCategory}
        refreshCategory={handleUpdateCategory}
      />

      <ProductTable />

      <AddCategoryModal
        isOpen={showAddCategoryModal}
        onClose={() => setShowAddCategoryModal(false)}
      />

      <EditCategoryModal
        isOpen={showEditCategoryModal}
        onClose={() => {
          setShowEditCategoryModal(false);
          setCategoryToEdit(null);
        }}
        category={categoryToEdit}
        onUpdate={handleUpdateCategory}
      />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Dashboard;
