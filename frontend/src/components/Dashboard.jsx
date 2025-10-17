import React, { useEffect, useState } from "react";
import "../styles/Dashboard.css";
import axios from "axios";
import { BiCart, BiGroup } from "react-icons/bi";
import { MdFeedback, MdOutlineCurrencyRupee } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Table from "./Table";

function Dashboard() {
  const [data, setData] = useState([]);
  const [totalNumberOfOrder, setTotalNumberOfOrder] = useState(0);
  const [totalNumberOfCustomer, setTotalNumberOfCustomer] = useState(0);
  const [totalNumberOfFeedback, setTotalNumberOfFeedback] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  // ---latestOrder---//
  useEffect(() => {
    const fetchLatestOrder = async () => {
      try {
        const response = await axios.get("http://localhost:3000/orders");
        console.log("Fetched data:", response.data);
        response.data.data.sort((a, b) => b.order_id - a.order_id);
        const rawData = response.data.data;
        // rawData.sort((a, b) => b - a);
        const formattedData = rawData.map((item) => ({
          "Order ID": item.order_id,
          "Customer Name": item.customer_name,
          "Customer Number": item.customer_number,
          Menu: item.menu_name,
          Type: item.food_type,
          Time: new Date(item.order_time).toLocaleString(),
          Amount: `₹${item.price}`,
          Status: item.order_status,
        }));
        
        setData(formattedData);
      } catch (err) {
        console.error("Error when fetching order:", err);
      }
    };

    fetchLatestOrder();
  }, []);

  // ---countTotalOrder---//
  useEffect(() => {
    const fetchTotalOrder = async () => {
      try {
        const response = await axios.get("http://localhost:3000/order/total");
        console.log(response.data);
        setTotalNumberOfOrder(response.data.data[0].count);
      } catch (err) {
        console.error("Error fetching total order:", err);
      }
    };
    fetchTotalOrder();
  }, []);

  // ---countTotalCustomer---
  useEffect(() => {
    const fetchTotalCustomer = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/customer/total"
        );
        console.log(response.data);
        setTotalNumberOfCustomer(response.data.data[0].count);
      } catch (err) {
        console.error("Error fetching total order:", err);
      }
    };
    fetchTotalCustomer();
  }, []);

  useEffect(() => {
    const fetchTotalRevenue = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/order/total-price"
        );
        setTotalRevenue(response.data.total_price);
        console.log(response.data);
      } catch (err) {
        console.error("Error fetching total revenue:", err);
      }
    };
    fetchTotalRevenue();
  }, []);

  // ---countTotalfeedback---
  useEffect(() => {
    const fetchTotalfeedback = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/feedback/total"
        );
        console.log(response.data);
        setTotalNumberOfFeedback(response.data.data[0].count);
      } catch (err) {
        console.error("Error fetching total Feedback:", err);
      }
    };
    fetchTotalfeedback();
  }, []);

  const navigate = useNavigate();
  const handleRedirect = (e, route) => {
    e.preventDefault();
    navigate(route);
  };

  const tableName = "Recent Order";
  const searchId = "latest_order_search_box";
  return (
    <div className="w-auto">
      <div className="flex flex-wrap md:flex lg:flex justify-between space-y-5 space-x-1">
        <div
          className="dash-box h-25 w-70 rounded-lg relative shadow cursor-pointer"
          onClick={(e) => handleRedirect(e, "/order")}
        >
          <span className="text-white start-3.5 rounded-2xl bg-mainColor p-3.5 absolute">
            <BiCart size={35} />
          </span>
          <div>
            <h3 className="font-normal text-gray-800">Total Order</h3>
            <h1 className="text-3xl font-medium">{totalNumberOfOrder}</h1>
          </div>
        </div>
        <div
          className="dash-box h-25 w-70 rounded-lg relative shadow cursor-pointer"
          onClick={(e) => handleRedirect(e, "/customers")}
        >
          <span className="text-white start-3.5 rounded-2xl bg-mainColor p-3.5 absolute">
            <BiGroup size={35} />
          </span>
          <div>
            <h3 className="fornt-normal text-gray-800">Total Customers</h3>
            <h1 className="text-3xl font-medium">{totalNumberOfCustomer}</h1>
          </div>
        </div>
        <div
          className="dash-box h-25 w-70 rounded-lg relative cursor-pointer"
          onClick={(e) => handleRedirect(e, "/billing")}
        >
          <span className="text-white start-3.5 rounded-2xl bg-mainColor p-3.5 absolute">
            <MdOutlineCurrencyRupee size={35} />
          </span>
          <div>
            <h3 className="fornt-normal text-gray-800">Total Revenue</h3>
            <h1 className="text-3xl font-medium">
              ₹
              <span className="ms-0 font-normal text-[28px]">
                {parseInt(totalRevenue)}
              </span>
            </h1>
          </div>
        </div>
        <div
          className="dash-box h-25 w-70 rounded-lg relative cursor-pointer"
          onClick={(e) => handleRedirect(e, "/feedback")}
        >
          <span className="text-white start-3.5 rounded-2xl bg-mainColor p-3.5 absolute">
            <MdFeedback size={35} />
          </span>
          <div>
            <h3 className="fornt-normal text-gray-800">Total Feedback</h3>
            <h1 className="text-3xl font-medium">{totalNumberOfFeedback}</h1>
          </div>
        </div>
      </div>

      {/* ---Recent Orders--- */}

      <Table data={data} tableName={tableName} searchId={searchId} />
    </div>
  );
}

export default Dashboard;
