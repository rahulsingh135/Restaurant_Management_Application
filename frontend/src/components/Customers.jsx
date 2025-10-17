import React, { useEffect, useState } from "react";
import Table from "./Table";
import axios from "axios";

function Customer() {
  const [data, setData] = useState([]);

  const getAllCustomer = async () => {
    try {
      const response = await axios.get("http://localhost:3000/customers");
      const rawData = response.data.data;
      console.log(response.data);
      const formattedData = rawData.map((item) => ({
        "#": item.customer_id,
        "Customer Name": item.customer_name,
        "Customer Number": item.customer_number,
        "Create At": new Date(item.created_at).toLocaleString(),
        Action: "",
      }));
      setData(formattedData);
    } catch (error) {
      console.error("error when fetching the all customer list", error);
    }
  };

  useEffect(() => {
    getAllCustomer();
  }, []);

  //---for deleting---//
  const handleDelete = async (customer_Id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(
        `http://localhost:3000/customer/delete/${customer_Id}`
      );

      // if (response.status === 200) {
      //   alert("customer deleted successfully");
      // }
      getAllCustomer();
    } catch (error) {
      console.error("Error deleting customer:", error);
      alert("Failed to delete customer.");
    }
  };

  // const data = [
  //   {
  //     "Customer Id": "CUS01",
  //     "Customer Name": "Rahul",
  //     "Phone Number": "524681525",
  //     Email: "rahul@gmail.com",
  //     Order_id: "ORD001",
  //     Status: "Complete",
  //   },
  //   {
  //     "Customer Id": "CUS02",
  //     "Customer Name": "Raj",
  //     "Phone Number": "254624876",
  //     Email: "raj@gmail.com",
  //     Order_id: "ORD002",
  //     Status: "Complete",
  //   },
  //   {
  //     "Customer Id": "CUS03",
  //     "Customer Name": "Riya",
  //     "Phone Number": "751682365",
  //     Email: "riya@gmail.com",
  //     Order_id: "ORD003",
  //     Status: "Pending",
  //   },
  //   {
  //     "Customer Id": "CUS04",
  //     "Customer Name": "Angad",
  //     "Phone Number": "524862335",
  //     Email: "angad@gmail.com",
  //     Order_id: "ORD004",
  //     Status: "Complete",
  //   },
  //   {
  //     "Customer Id": "CUS05",
  //     "Customer Name": "Jon",
  //     "Phone Number": "7516852365",
  //     Email: "jon@gmail.com",
  //     Order_id: "ORD005",
  //     Status: "Pending",
  //   },
  //   {
  //     "Customer Id": "CUS06",
  //     "Customer Name": "Ram",
  //     "Phone Number": "234551625",
  //     Email: "ram@gmail.com",
  //     Order_id: "ORD006",
  //     Status: "Complete",
  //   },
  //   {
  //     "Customer Id": "CUS07",
  //     "Customer Name": "Rohit",
  //     "Phone Number": "154512345",
  //     Email: "rohit@gmail.com",
  //     Order_id: "ORD007",
  //     Status: "Complete",
  //   },
  // ];

  return (
    <Table
      data={data}
      handleDelete={handleDelete}
      tableName="Customers"
      searchId="customers_search_box"
    />
  );
}

export default Customer;
