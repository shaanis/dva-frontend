import React, { useState, useEffect } from 'react';
import EditProductModal from './EditProductModal';
import AddProductModal from './AddProductModal';
import { toast } from 'react-toastify';
import { deleteProductApi, getAllProductsApi } from '../../services/allApi';
import DeleteModal from './DeleteModal';

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showEditProductModal, setShowEditProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // New states for delete confirmation
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getAllProductsApi();
      setProducts(response.data); // Adjust based on your API response
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  // Instead of deleting directly, open confirmation modal
  const handleDeleteClick = (id) => {
    setDeleteProductId(id);
    setShowDeleteModal(true);
  };

  // Actual delete after confirmation
  const confirmDelete = async () => {
    try {
      const result = await deleteProductApi(deleteProductId);
      if (result.status >= 200 && result.status < 300) {
        // toast.success('Product deleted successfully');
        fetchProducts(); // Refresh list
      }
    } catch (e) {
      console.error(e);
      toast.error('Failed to delete product');
    } 
  };

  return (
    <>
      <div className="bg-[#1a1a1a] p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Products Management</h2>
          <button
            onClick={() => setShowAddProductModal(true)}
            className="mt-6 inline-flex items-center text-white hover:text-yellow-400"
          >
            <span className="text-2xl mr-1">+</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="py-2 px-4 text-sm text-gray-300">IMAGE</th>
                <th className="py-2 px-4 text-sm text-gray-300">NAME</th>
                <th className="py-2 px-4 text-sm text-gray-300">PRICE</th>
                <th className="py-2 px-4 text-sm text-gray-300">CATEGORY</th>
                <th className="py-2 px-4 text-sm text-gray-300">SIZES</th>
                {/* <th className="py-2 px-4 text-sm text-gray-300">COLOURS</th> */}
                <th className="py-2 px-4 text-sm text-gray-300">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, i) => (
                <tr key={i} className="border-t border-gray-700">
                  <td className="py-3 px-4">
                    <img
                      src={product.image?.[0]}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="py-3 px-4">{product.name}</td>
                  <td className="py-3 px-4">{product.price}</td>
                  <td className="py-3 px-4">{product.category}</td>
                  <td className="py-3 px-4">{product.sizes?.join(', ')}</td>
                  {/* <td className="py-3 px-4">{product.colors?.join(', ')}</td> */}
                  <td className="py-3 px-4 space-x-4">
                    <button
                      className="text-blue-400 hover:underline"
                      onClick={() => {
                        setSelectedProduct(product);
                        setShowEditProductModal(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(product._id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <AddProductModal
        isOpen={showAddProductModal}
        onClose={() => {
          setShowAddProductModal(false);
          fetchProducts();
        }}
      />

      {showEditProductModal && selectedProduct && (
        <EditProductModal
          isOpen={showEditProductModal}
          onClose={() => {
            setShowEditProductModal(false);
            setSelectedProduct(null);
            fetchProducts();
          }}
          product={selectedProduct}
        />
      )}

      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
      />
    </>
  );
};

export default ProductTable;
