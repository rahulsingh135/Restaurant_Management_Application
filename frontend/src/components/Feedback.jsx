import axios from "axios";
import React, { useState, useEffect } from "react";

import Table from "./Table";

function Feedback() {
  const [data, setData] = useState([]);

  const fetchFeedback = async () => {
    try {
      const response = await axios.get("http://localhost:3000/feedbacks");
      console.log("Fetched data:", response.data);
      const rawData = response.data.data;
      const formattedData = rawData.map((item) => ({
        "#": item.feedback_id,
        "Customer Name": item.customer_name,
        "Order Id": item.order_id,
        "Feedback Message": item.feedback_text,
        Time: new Date(item.create_at).toLocaleString(),
        Rating: item.rating,
        Action: "",
      }));
      setData(formattedData);
    } catch (err) {
      console.error("Error when fetching feedback:", err);
    }
  };
  useEffect(() => {
    fetchFeedback();
  }, []);

  const deleteFeedback = async (feedback_id) => {
    const deleteConfirm = window.confirm("Are you sure you want to delete?");
    if (!deleteConfirm) return;
    try {
      const res = await axios.delete(
        `http://localhost:3000/feedback/delete/${feedback_id}`
      );
      fetchFeedback();
      console.log("feedback deleted", res.data);
    } catch (error) {
      console.error("Error when deleting feedback", error);
    }
  };

  // const data = [
  //   {
  //     id: 1,
  //     "Customer Name": "Rahul",
  //     "Order id": "ORD001",
  //     Message: "Lorem Ipsum",
  //     Rating: 5,
  //   },
  //
  // ];

  return (
    <div>
      <Table
        data={data}
        handleDelete={deleteFeedback}
        tableName="Feedback"
        searchId="feedback_search_box"
      />
    </div>
  );
}

export default Feedback;
