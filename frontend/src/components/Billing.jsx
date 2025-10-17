import React, { useEffect, useState } from "react";
import Invoice from "./Invoice";
import Table from "./Table";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import titleCase from "../utils/titleCase";

function Billing() {
  const [data, setData] = useState([]);
  const [menuNamePrice, setMenuNamePrice] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isInvoiceVisible, setInvoiceVisible] = useState(false);
  const [discount, setDiscount] = useState(0);

  const updateQuantity = (itemIndex, newQuantity) => {
    const updatedItems = [...billingData.items];
    updatedItems[itemIndex].quantity = newQuantity;

    setSelectedOrder((prev) => ({
      ...prev,
      items: updatedItems,
    }));
  };

  const removeItem = (itemIndex) => {
    const updatedItems = [...billingData.items];
    updatedItems.splice(itemIndex, 1);

    if (updatedItems.length === 0) {
      setSelectedOrder(null);
    } else {
      setSelectedOrder((prev) => ({
        ...prev,
        items: updatedItems,
      }));
    }
  };

  const handleEdit = (rowData) => {
    setSelectedOrder({
      customer_name: rowData["Customer Name"],
      customer_number: rowData["Customer Number"],
      order_id: rowData["#"],
      created_at: rowData.Time,
      items: [
        {
          menu_name: rowData.Menu,
          price: parseFloat(rowData.Amount.replace("₹", "")),
          quantity: 1,
        },
      ],
    });
  };

  const handlePayment = (rowData) => {
    setSelectedOrder({
      customer_name: rowData["Customer Name"],
      customer_number: rowData["Customer Number"],
      order_id: rowData["#"],
      created_at: rowData.Time,
      items: [
        {
          menu_name: rowData.Menu,
          price: parseFloat(rowData.Amount.replace("₹", "")),
          quantity: 1,
        },
      ],
    });
  };

  const billingData = selectedOrder;

  //---fetch menu name and price---//
  useEffect(() => {
    const fetchMenuNameList = async () => {
      try {
        const res = await axios.get("http://localhost:3000/menu-name-price");
        setMenuNamePrice(res.data);
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
        Payment: "",
      }));

      setData(formattedData);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrderList();
  }, []);

  /// ---for delete---//
  const handleDelete = async (orderId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;
    try {
      const res = await axios.delete(
        `http://localhost:3000/order/delete/${orderId}`
      );
      if (res.status === 200) {
        alert("Order delete successfuly");
      }
      fetchOrderList();
    } catch (error) {
      console.error("error when delete order", error);
      alert("failed to delete order");
    }
  };

  const totalAmount = billingData
    ? billingData.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      )
    : 0;

  const discountAmount = (totalAmount * discount) / 100;

  const grandTotal = totalAmount - discountAmount;

  return (
    <div className="space-y-5">
      {billingData && (
        <div className="full-screen bg-gray-100 flex justify-center rounded-lg shadow-[2px_2px_3px_0_rgba(0,0,0,0.3)]">
          <div className="w-full  p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold bg-mainColor p-2 rounded-lg text-white">
              Billing Details
            </h2>

            <div className="space-y-6 pt-5 text-gray-800">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">Customer Name:</p>
                  <p>{titleCase(billingData.customer_name)}</p>
                </div>
                <div>
                  <p className="font-medium">Customer Number:</p>
                  <p>{billingData.customer_number || "N/A"}</p>
                </div>
                <div>
                  <p className="font-medium">Order ID:</p>
                  <p>{billingData.order_id}</p>
                </div>
                <div>
                  <p className="font-medium">Date & Time:</p>
                  <p>{new Date(billingData.created_at).toLocaleString()}</p>
                </div>
              </div>

              <div className="pt-2 flex space-x-10 items-center">
                <div className="flex items-center">
                  <label className="block pr-5 font-medium mb-1">
                    Add Menu Item:
                  </label>
                  <select
                    className="border border-gray-300 text-black rounded px-3 py-2"
                    defaultValue=""
                    onChange={(e) => {
                      const selectedId = e.target.value;
                      const selectedItem = menuNamePrice.find(
                        (item) => item.menu_id.toString() === selectedId
                      );

                      if (selectedItem) {
                        const alreadyExists = billingData.items.some(
                          (item) => item.menu_name === selectedItem.menu_name
                        );

                        if (!alreadyExists) {
                          setSelectedOrder((prev) => ({
                            ...prev,
                            items: [
                              ...prev.items,
                              {
                                menu_name: selectedItem.menu_name,
                                price: selectedItem.price,
                                quantity: 1,
                              },
                            ],
                          }));
                        } else {
                          alert("Item already added.");
                        }
                      }

                      e.target.value = "";
                    }}
                  >
                    <option
                      className="text-white bg-gray-600"
                      value=""
                      disabled
                    >
                      -- Select Menu Item --
                    </option>
                    {menuNamePrice.map((menu) => (
                      <option key={menu.menu_id} value={menu.menu_id}>
                        {menu.menu_name} (₹{menu.price})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-medium mr-2">Discount (%):</label>
                  <input
                    type="number"
                    className="border px-2 py-1 rounded w-24"
                    value={discount}
                    onChange={(e) => setDiscount(Number(e.target.value))}
                    min="0"
                    max="100"
                    // disabled={() => (discount < 100 ? "" : disabled)}
                  />
                </div>
              </div>

              <div className="mt-6 overflow-x-auto">
                <table className="min-w-full border border-gray-300 rounded-md">
                  <thead className="bg-mainColor text-white">
                    <tr>
                      <th className="py-2 px-4 text-left">Item</th>
                      <th className="py-2 px-4 text-left">Price</th>
                      <th className="py-2 px-4 text-left">Quantity</th>
                      <th className="py-2 px-4 text-left">Subtotal</th>
                      <th className="py-2 px-4 text-left">delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {billingData.items.map((item, index) => (
                      <tr key={index} className="border border-gray-400">
                        <td className="py-2 px-4">{item.menu_name}</td>
                        <td className="py-2 px-4">₹{item.price}</td>
                        <td className="py-2 px-4 flex items-center gap-2">
                          <button
                            className="px-2 py-0 text-2xl bg-gray-200 rounded hover:bg-gray-300"
                            onClick={() =>
                              updateQuantity(index, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                            onClick={() =>
                              updateQuantity(index, item.quantity + 1)
                            }
                          >
                            +
                          </button>
                        </td>

                        <td className="py-2 px-4">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </td>
                        <td className="py-2 px-4 text-center">
                          <button
                            className="text-red-500 hover:text-red-700 text-xl"
                            onClick={() => removeItem(index)}
                            title="Remove item"
                          >
                            <MdDelete />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="text-right mt-4 space-y-2">
                <div className="text-right mt-4 space-y-2">
                  <p className="text-xl font-semibold">
                    Total: ₹{totalAmount.toFixed(2)}
                  </p>
                  <p className="text-xl font-semibold">
                    Discount ({discount}%): ₹{discountAmount.toFixed(2)}
                  </p>
                  <p className="text-xl font-semibold">
                    Grand Total: ₹{grandTotal.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex  justify-center">
              <div className="space-x-3">
                <button
                  className="bg-red-500 hover:bg-red-700 text-white text-[20px] p-1 px-2 rounded-md cursor-pointer "
                  onClick={() => setSelectedOrder(null)}
                >
                  Close
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white text-[20px] p-1 px-2 rounded-md cursor-pointer "
                  onClick={() => setInvoiceVisible(true)}
                >
                  Print
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {isInvoiceVisible && (
        <div className="fixed inset-0 w-full bg-white/30 bg-opacity-0 flex justify-center items-center z-50">
          <div className="print-container bg-white p-6 rounded-lg border  flex flex-col   print:w-full w-full ">
            <Invoice
              order={selectedOrder}
              totalAmount={totalAmount}
              discountAmount={discountAmount}
              grandTotal={grandTotal}
              discount={discount}
            />
            <div className="flex justify-center items-center print:hidden">
              <button
                className="mt-4 px-4 py-2 rounded-md bg-red-500 text-white"
                onClick={() => setInvoiceVisible(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      <Table
        data={data}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        handlePayment={handlePayment}
        tableName="Billing List"
        searchId="order_search_box"
      />
    </div>
  );
}

export default Billing;
