import React, { useEffect, useState } from "react";
import Table from "./Table";
import axios from "axios";

function Order() {
  const [data, setData] = useState([]);
  const [menuName, setMenuName] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editOrderId, setEditOrderId] = useState(null);

  const [addOrder, setAddOrder] = useState({
    menu_id: "",
    customer_name: "",
    customer_number: "",
    order_status: "In-Process",
  });

  const handleEdit = (order) => {
    const selectedMenu = menuName.find((menu) => menu.menu_name === order.Menu);

    setAddOrder({
      menu_id: selectedMenu?.menu_id || "",
      customer_name: order["Customer Name"],
      customer_number: order["Customer Number"],
      order_status: order.Status,
    });

    setEditOrderId(order["#"]);
    setEditMode(true);
  };

  //---fetch menu name---//
  useEffect(() => {
    const fetchMenuNameList = async () => {
      try {
        const res = await axios.get("http://localhost:3000/menu-name");
        setMenuName(res.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchMenuNameList();
  }, []);

  //---fetch all list---//
  const fetchOrderList = async () => {
    try {
      const res = await axios.get("http://localhost:3000/orders");
      const rawData = res.data.data;

      const formattedData = rawData.map((item) => ({
        "#": item.order_id,
        "Customer Name": item.customer_name,
        "Customer Number": item.customer_number,
        Menu: item.menu_name,
        Type: item.food_type,
        Time: new Date(item.order_time).toLocaleString(),
        Amount: `₹${item.price}`,
        Status: item.order_status,
        Action: "",
      }));

      setData(formattedData);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrderList();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddOrder((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //---create and update menu----//
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editMode) {
        // --- for update --- //
        const res = await axios.put(
          `http://localhost:3000/order/update/${editOrderId}`,
          addOrder
        );
        if (res.status === 200) {
          alert("Order updated successfully!");
        }
      } else {
        // --- for create --- //
        const res = await axios.post(
          "http://localhost:3000/order/create",
          addOrder
        );
        console.log(addOrder);
        if (res.status === 200 || res.status === 201) {
          alert("Order added successfully!");
        }
      }

      setAddOrder({
        menu_id: "",
        customer_name: "",
        customer_number: "",
        order_status: "In-Process",
      });

      setEditMode(false);
      setEditOrderId(null);

      fetchOrderList();
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("Failed to submit order.");
    }
  };

  /// ---for delete---//
  const handleDelete = async (orderId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;
    try {
      const res = await axios.delete(
        `http://localhost:3000/order/delete/${orderId}`
      );
      // if (res.status === 200) {
      //   alert("Order delete successfuly");
      // }
      fetchOrderList();
    } catch (error) {
      console.error("error when delete order", error);
      alert("failed to delete order");
    }
  };

  return (
    <div className="space-y-5">
      <div className=" bg-gray-100 flex justify-center rounded-lg shadow-[2px_2px_3px_0_rgba(0,0,0,0.3)]">
        <div className="w-full p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold bg-mainColor p-2 rounded-lg text-white">
            Order
          </h2>

          <form className="space-y-6 pt-5" onSubmit={handleSubmit}>
            <div className="flex space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">
                  Select Menu *
                </label>
                <select
                  name="menu_id"
                  value={addOrder.menu}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full p-3 cursor-pointer border hover:bg-mainBg border-gray-300 rounded-md"
                >
                  <option value="">-- Select food --</option>
                  {menuName.map((mName) => (
                    <option key={mName.menu_id} value={mName.menu_id}>
                      {mName.menu_name}
                    </option>
                  ))}
                  ;
                </select>
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">
                  Customer Name *
                </label>
                <input
                  type="text"
                  name="customer_name"
                  value={addOrder.customer_name}
                  onChange={handleChange}
                  placeholder="Name"
                  required
                  className="mt-2 w-full p-3 border border-gray-300 rounded-md"
                />
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">
                  Customer Number (Optional)
                </label>
                <input
                  type="number"
                  name="customer_number"
                  value={addOrder.customer_number}
                  onChange={handleChange}
                  placeholder="Mobile Number"
                  className="mt-2 w-full p-3 border border-gray-300 rounded-md"
                />
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  name="order_status"
                  value={addOrder.order_status}
                  onChange={handleChange}
                  className="mt-2 w-full p-3 border cursor-pointer border-gray-300 rounded-md hover:bg-mainBg"
                >
                  <option value="In-Process">In-Process</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="px-6 py-3 mt-4 bg-mainBg text-black rounded-md border hover:border-mainColor cursor-pointer border-gray-500 hover:bg-secBg hover:text-mainColor"
              >
                {editMode ? "Update Order" : "Add Order"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <Table
        data={data}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        tableName="Order List"
        searchId="order_search_box"
      />
    </div>
  );
}

export default Order;
