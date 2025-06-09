import React, { useContext, useEffect, useState } from "react";
import { getAllCategoryApi } from "../../services/allApi";
import { addCategoryResponseContext } from "../../context/ContextApi";

const CategoryTable = ({ onEdit, onDelete, onAdd,refreshCategory }) => {
  const [categories, setCategories] = useState([]);
  const {addCategoryResponse,setAddCategoryResponse} = useContext(addCategoryResponseContext)


  useEffect(() => {
    fetchCategories();
  }, [addCategoryResponse,refreshCategory]);

  const fetchCategories = async () => {
    try {
      const result = await getAllCategoryApi();
      if (result.status >= 200 && result.status < 300) {
        setCategories(result.data);
        console.log("Categories fetched successfully:", result.data); 
      }
    } catch (e) {
      console.log("Error fetching categories:", e);
    }
  };

  return (
    <div className="bg-[#1a1a1a] p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Categories Management</h2>
        <button
          onClick={onAdd}
          className="text-white text-2xl hover:text-yellow-400  px-3 rounded"
        >
          +
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="border-b border-gray-600">
              <th className="py-2 px-4 text-sm text-gray-300">COVER</th>
              <th className="py-2 px-4 text-sm text-gray-300">NAME</th>
              <th className="py-2 px-4 text-sm text-gray-300">DESCRIPTION</th>
              <th className="py-2 px-4 text-sm text-gray-300">SLUG</th>
              <th className="py-2 px-4 text-sm text-gray-300">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((items, i) => (
              <tr key={i} className="border-t border-gray-700">
                <td className="py-3 px-4">
                  <img
                    src={items.image}
                    alt="category"
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="py-3 px-4">{items.name}</td>
                <td className="py-3 px-4">{items.description}</td>
                <td className="py-3 px-4">{items.slug}</td>
                <td className="py-3 px-4 space-x-4">
                  <button
                    className="text-blue-400 hover:underline"
                    onClick={() => onEdit(items)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => onDelete(items._id)}
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
  );
};

export default CategoryTable;
