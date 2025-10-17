import React from "react";

const Invoice = ({
  order,
  totalAmount,
  discountAmount,
  grandTotal,
  discount,
}) => {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full h-auto bg-white p-6 shadow-lg rounded-lg print:shadow-none print:w-full print:p-0 print:bg-transparent">
      <header className="flex justify-between items-center border-b pb-4 mb-4 ">
        <div>
          <h1 className="text-2xl font-semibold">Invoice</h1>
          {/* <p className="text-sm text-gray-500">
            Date: {new Date(order.created_at).toLocaleDateString()}
          </p> */}
          <p className="text-sm text-gray-500">
            Date: {new Date().toLocaleString()}
          </p>
        </div>
        <div className="text-right">
          <h2 className="text-xl font-medium">Chef Restaurant</h2>
          <p className="text-sm text-gray-500">BTM LAYOUT BANGALORE</p>
          <p className="text-sm text-gray-500">Email: restaurant@gmail.com</p>
        </div>
      </header>

      <section className="mb-6">
        <h3 className="text-lg font-medium mb-2">Bill To:</h3>
        <div className="text-sm text-gray-700">
          <p>Name : {order.customer_name}</p>
          <p>Number : {order.customer_number || "N/A"}</p>
        </div>
      </section>

      <section>
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-2 text-left">ITEMS</th>
              <th className="border px-4 py-2 text-left">QTY</th>
              <th className="border px-4 py-2 text-left">AMOUNT</th>
              <th className="border px-4 py-2 text-left">SUBTOTAL</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{item.menu_name}</td>
                <td className="border px-4 py-2 text-center">
                  {item.quantity}
                </td>
                <td className="border px-4 py-2 text-center">₹{item.price}</td>
                <td className="border px-4 py-2 text-center">
                  ₹{(item.quantity * item.price).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="flex justify-end ">
        <div className="w-auto ">
          <div className="flex justify-between py-1 text-sm md:text-base">
            <span className="text-gray-700 font-medium">Subtotal:</span>
            <span className="text-gray-900">₹{totalAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-1 text-sm md:text-base">
            <span className="text-gray-700 font-medium">
              Discount({discount}%):
            </span>
            <span>- ₹{discountAmount.toFixed(2)}</span>
          </div>
          <hr className="my-1 border-t border-gray-300" />
          <div className="flex justify-between py-2 text-base md:text-lg font-bold">
            <span className="text-gray-800 pr-2">Grand Total :</span>
            <span>₹{grandTotal.toFixed(2)}</span>
          </div>
        </div>
      </section>

      <section className="flex justify-end mt-4 print:hidden">
        <button
          onClick={handlePrint}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Print
        </button>
      </section>
    </div>
  );
};

export default Invoice;
