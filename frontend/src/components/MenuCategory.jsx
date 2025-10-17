import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEdit, FaRegEdit } from "react-icons/fa";
import { MdDelete, MdOutlineDelete } from "react-icons/md";
import Table from "./Table";

function MenuCategory() {
  const [data, setData] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState(null);

  const [menuCatogoryData, setMenuCatogoryData] = useState({
    menuCategoryName: "",
    menuCategoryFoodType: "",
    menuCategoryStatus: "",
  });

  const handleEdit = (category) => {
    setMenuCatogoryData({
      menuCategoryName: category["Category Name"],
      menuCategoryFoodType: category["Category Type"],
      menuCategoryStatus: category["Status"],
    });
    setEditCategoryId(category["#"]);
    setEditMode(true);
  };

  //---Get menu list--//
  const fetchMenuCategoryList = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/menu-category/get-all-items"
      );
      const rawData = response.data.data;
      console.log(response.data);

      const formattedData = rawData.map((item) => ({
        "#": item.category_id,
        "Category Name": item.category_name,
        "Category Type": item.category_type,
        "Create At": new Date(item.category_time).toLocaleString(),
        Status: item.status,
        Action: "",
      }));
      
      setData(formattedData);
    } catch (error) {
      console.error("error when fetching the category list", error);
    }
  };

  useEffect(() => {
    fetchMenuCategoryList();
  }, []);

  const handleCategoryChange = (e) => {
    const { name, value } = e.target;
    setMenuCatogoryData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //---crete and update menu list--//
  const handleSubmit = async (e) => {
    e.preventDefault();

    const categoryLoad = {
      category_name: menuCatogoryData.menuCategoryName,
      category_type: menuCatogoryData.menuCategoryFoodType,
      status: menuCatogoryData.menuCategoryStatus,
    };

    try {
      if (editMode) {
        // ---UPDATE category--//
        const response = await axios.put(
          `http://localhost:3000/menu-category/update/${editCategoryId}`,
          categoryLoad
        );

        if (response.status === 200) {
          alert("Menu category updated successfully!");
        }
      } else {
        // CREATE new category
        const response = await axios.post(
          "http://localhost:3000/menu-category/create",
          categoryLoad
        );

        if (response.status === 200 || response.status === 201) {
          alert("Menu category added successfully!");
        }
      }

      fetchMenuCategoryList();

      setMenuCatogoryData({
        menuCategoryName: "",
        menuCategoryFoodType: "",
        menuCategoryStatus: "",
      });
      setEditMode(false);
      setEditCategoryId(null);
    } catch (error) {
      console.error("Error submitting category:", error);
      alert("Failed to submit category");
    }
  };

  //---delete menu---//
  const handleDelete = async (categoryId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(
        `http://localhost:3000/menu-category/delete/${categoryId}`
      );

      if (response.status === 200) {
        alert("Category deleted successfully");
      }
      fetchMenuCategoryList();
    } catch (error) {
      console.error("Error deleting category:", error);
      alert("Failed to delete category.");
    }
  };

  return (
    <div className="space-y-5">
      {/* ---Add Category--- */}
      <div className="w-auto bg-gray-100 flex rounded-lg shadow-[2px_2px_3px_0_rgba(0,0,0,0.3)] ">
        <div className="w-full p-6 bg-white rounded-lg ">
          <h2 className="text-2xl font-semibold p-2 px-3 bg-mainColor  rounded-lg text-white">
            Menu Category
          </h2>
          <div className=" space-x-5 pt-6">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Menu Name
                  </label>
                  <input
                    type="text"
                    name="menuCategoryName"
                    value={menuCatogoryData.menuCategoryName}
                    onChange={handleCategoryChange}
                    placeholder="i.e. Paneer Masala"
                    required
                    className="mt-2 w-full p-3 border border-gray-300 rounded-md  "
                  />
                </div>

                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Food Type
                  </label>
                  <select
                    name="menuCategoryFoodType"
                    value={menuCatogoryData.menuCategoryFoodType}
                    onChange={handleCategoryChange}
                    required
                    className="mt-2 w-full p-3 border cursor-pointer border-gray-300 rounded-md hover:bg-mainBg"
                  >
                    <option value="">--Select--</option>
                    <option value="Veg">Veg</option>
                    <option value="Non-Veg">Non-Veg</option>
                    <option value="Both">Both</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <select
                    name="menuCategoryStatus"
                    value={menuCatogoryData.menuCategoryStatus}
                    onChange={handleCategoryChange}
                    className="mt-2 w-full p-3 border cursor-pointer border-gray-300 rounded-md hover:bg-mainBg"
                  >
                    <option value="">--Select--</option>
                    <option value="Enabled">Enabled</option>
                    <option value="Disabled">Disabled</option>
                  </select>
                </div>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="px-6 py-3 mt-4 bg-mainBg text-black rounded-md border hover:border-mainColor cursor-pointer border-gray-500 hover:bg-secBg hover:text-mainColor "
                >
                  {editMode ? "Update Menu" : "Add Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* ---Category List-- */}
      <Table
        data={data}
        tableName="Menu Category List"
        searchId="category_search_box"
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    </div>
  );
}

export default MenuCategory;
