import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import burger from "/burger.jpg";
import { MdOutlineDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import Table from "./Table";

export default function Menu() {
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState([]);
  const imageInputRef = useRef(null);
  const [hasPreviewImage, setHasPreviewImage] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editMenuId, setEditMenuId] = useState(null);

  const [menuForm, setMenuForm] = useState({
    menuName: "",
    menuPrice: "",
    menuFoodType: "",
    foodCategory: "",
    menuStatus: "Available",
    image: null,
  });

  //--for saving row data coming from table--//
  const handleEdit = (menuData) => {
    setEditMode(true);
    setEditMenuId(menuData["#"]);

    setMenuForm({
      menuName: menuData["Menu Name"],
      menuPrice: menuData["Amount"],
      menuFoodType: menuData["Menu Type"],
      foodCategory:
        categories.find(
          (cat) => cat.category_name === menuData["Category Name"]
        )?.category_id || "",
      menuStatus: menuData["Status"],
      image: null,
    });

    setHasPreviewImage(menuData["Image"]);
  };

  const handleMenuInputChange = (e) => {
    const { name, value } = e.target;
    setMenuForm({ ...menuForm, [name]: value });
  };

  const handleMenuImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMenuForm({ ...menuForm, image: file });
      setHasPreviewImage(URL.createObjectURL(file));
    }
  };

  // ---get-menu-category-name--//
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:3000/menu-category-name");
        setCategories(res.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

  // ---create and updating  menu---//
  const handleMenuSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", menuForm.menuName);
      formData.append("price", menuForm.menuPrice);
      if (menuForm.image) {
        formData.append("menu_image", menuForm.image);
      } else {
        formData.append("menu_image", "");
      }
      formData.append("food_type", menuForm.menuFoodType);
      formData.append("category_id", menuForm.foodCategory);
      formData.append("menu_status", menuForm.menuStatus);

      if (editMode) {
        // -- updaing menu--//
        const response = await axios.put(
          `http://localhost:3000/menu/update/${editMenuId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("Form Data: ", formData);
        formData.forEach((key, value) => {
          console.log(key, value);
        });
        console.log("Menu updated:", response.data);
        alert("Menu updated successfully!");
      } else {
        // -- creating menu---//
        const response = await axios.post(
          "http://localhost:3000/menu/create",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("Menu added:", response.data);
        alert("Menu added successfully!");
      }

      setMenuForm({
        menuName: "",
        menuPrice: "",
        menuFoodType: "",
        foodCategory: "",
        menuStatus: "Available",
        image: "",
      });

      setHasPreviewImage(null);
      setEditMode(false);
      setEditMenuId(null);

      if (imageInputRef.current) {
        imageInputRef.current.value = null;
      }

      fetchMenu();
    } catch (error) {
      console.error(
        editMode ? "Error updating menu:" : "Error adding menu:",
        error.response
      );
      alert(`Failed to ${editMode ? "update" : "add"} menu`);
    }
  };

  // ---get menu list---//
  const fetchMenu = async () => {
    try {
      const res = await axios.get("http://localhost:3000/menu/get-all-items");
      const rawData = res.data.data;
      console.log(res.data);

      const formattedData = rawData.map((item) => ({
        "#": item.menu_id,
        "Menu Name": item.menu_name,
        Image: `http://localhost:3000/uploads/${item.menu_image}`,
        "Menu Type": item.food_type,
        Amount: item.price,
        "Category Name": item.category_name,
        Status: item.menu_status,
        Action: "",
      }));

      setData(formattedData);
    } catch (err) {
      console.error("Error fetching menu items:", err);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const handleDelete = async (menuId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this menu?"
    );
    if (!confirmDelete) return;
    try {
      const res = await axios.delete(
        `http://localhost:3000/menu/delete/${menuId}`
      );
      if (res.status === 200) {
        alert("Menu delete successfully");
        fetchMenu();
      }
    } catch (error) {
      console.error("error when deleting menu", error);
      alert("failed to delete menu");
    }
  };

  return (
    <div className="space-y-5">
      {/* ---add menu--- */}
      <div className="full-screen bg-gray-100 flex justify-center rounded-lg shadow-[2px_2px_3px_0_rgba(0,0,0,0.3)]">
        <div className="w-full p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold bg-mainColor p-2 rounded-lg px-3 text-white">
            Manage Menu
          </h2>
          <div className="flex space-x-5 pt-6">
            {hasPreviewImage ? (
              <img
                id="menu-image"
                className="block object-cover w-45 h-50 p-1 border border-gray-400 rounded bg-mainBg"
                src={hasPreviewImage}
                alt="preview"
              />
            ) : (
              <div className="flex object-cover w-45 h-50 p-1 border border-gray-400 rounded bg-mainBg justify-center items-center">
                <h5 className="text-center text-orange-700">
                  Upload Image to Preview
                </h5>
              </div>
            )}

            <form className="space-y-6" onSubmit={handleMenuSubmit}>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Menu Name *
                  </label>
                  <input
                    type="text"
                    name="menuName"
                    value={menuForm.menuName}
                    onChange={handleMenuInputChange}
                    placeholder="i.e. Paneer Masala"
                    required
                    className="mt-2 w-full p-3 border border-gray-300 rounded-md"
                  />
                </div>

                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Price(₹) *
                  </label>
                  <input
                    type="number"
                    name="menuPrice"
                    value={menuForm.menuPrice}
                    onChange={handleMenuInputChange}
                    placeholder="i.e. 200"
                    required
                    className="mt-2 w-full p-3 border border-gray-300 rounded-md"
                  />
                </div>

                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Image *
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      ref={imageInputRef}
                      type="file"
                      onChange={handleMenuImageChange}
                      className="mt-2 w-full p-3 border cursor-pointer border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Food type *
                  </label>
                  <select
                    name="menuFoodType"
                    value={menuForm.menuFoodType}
                    onChange={handleMenuInputChange}
                    required
                    className="mt-2 w-full p-3 hover:bg-mainBg cursor-pointer border border-gray-300 rounded-md"
                  >
                    <option value="">-- Select food type --</option>
                    <option value="Veg">Veg</option>
                    <option value="Non-Veg">Non-Veg</option>
                  </select>
                </div>

                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Food category
                  </label>
                  <select
                    name="foodCategory"
                    value={menuForm.foodCategory}
                    onChange={handleMenuInputChange}
                    required
                    className="mt-2 w-full p-3 cursor-pointer hover:bg-mainBg border border-gray-300 rounded-md"
                  >
                    <option value="">-- Select category --</option>
                    {categories.map((cat) => (
                      <option key={cat.category_id} value={cat.category_id}>
                        {cat.category_name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <select
                    name="menuStatus"
                    value={menuForm.menuStatus}
                    onChange={handleMenuInputChange}
                    className="mt-2 w-full p-3 border cursor-pointer border-gray-300 rounded-md hover:bg-mainBg"
                  >
                    <option value="Available">Available</option>
                    <option value="Not Available">Not Available</option>
                  </select>
                </div>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="px-6 py-3 mt-4 bg-mainBg text-black rounded-md border hover:border-mainColor cursor-pointer border-gray-500 hover:bg-secBg hover:text-mainColor"
                >
                  {editMode ? "Update" : "Add Menu"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* ---menu list--- */}
      <Table
        data={data}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        tableName="Menu List"
        searchId="menu_search_box"
      />
    </div>
  );
}
