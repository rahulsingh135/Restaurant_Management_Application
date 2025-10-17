import { MdOutlineDelete } from "react-icons/md";
import { FaRegEdit, FaRegStar, FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function Table({
  data,
  tableName,
  searchId,
  handleDelete,
  handleEdit,
  handlePayment,
}) {
  const [searchItem, setSearchItem] = useState("");
  const [filterResult, setFilterResult] = useState(data);

  useEffect(() => {
    setFilterResult(data);
  }, [data]);

  const checkStatusData = (Status) => {
    switch (Status) {
      case "Cancelled":
        return "bg-red-600 text-white rounded-lg py-1 px-2";
      case "Pending":
        return "bg-yellow-300 text-black rounded-lg py-1 px-2";
      case "In-Process":
      case "On Process":
      case "Process":
      case "Available":
      case "Enabled":
        return "bg-green-600 text-white rounded-lg py-1 px-2";
      case "Unavailable":
      case "Disabled":
      case "Not Available":
        return "bg-black text-white px-2 py-1 rounded-lg";

      case "Complete":
      case "Completed":
        return "bg-black text-white rounded-lg py-1 px-2";
      default:
        return "";
    }
  };

  const printStar = (Rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < Rating) {
        stars.push(<FaStar key={`full-${i}`} className="text-mainColor" />);
      } else {
        stars.push(<FaRegStar key={`empty-${i}`} className="text-gray-400" />);
      }
    }
    return <div className="flex space-x-1">{stars}</div>;
  };

  const columnRendering = ({ headName, row, rowData }) => {
    if (headName === "Image") {
      return <img className="h-15 w-15" src={row} alt="FoodImage" />;
    }
    if (headName === "Status") {
      return <span className={checkStatusData(row)}>{row}</span>;
    }

    if (headName === "Rating") {
      return <span>{printStar(row)}</span>;
    }

    if (headName === "Action") {
      return (
        <div className="flex space-x-1">
          {tableName !== "Customers" && tableName !== "Feedback" ? (
            <div
              className="border border-gray-500 rounded-sm p-1 text-white bg-blue-500 cursor-pointer"
              onClick={() => handleEdit && handleEdit(rowData)}
            >
              <FaRegEdit size={20} />
            </div>
          ) : (
            ""
          )}

          <div
            className="border p-1 cursor-pointer rounded-sm text-white bg-red-500"
            onClick={() => handleDelete && handleDelete(rowData["#"])}
          >
            <MdOutlineDelete size={20} />
          </div>
        </div>
      );
    }

    if (headName === "Payment") {
      return (
        <div
          className="border w-13  text-lg  flex items-center justify-center cursor-pointer rounded-md text-white bg-blue-500 "
          onClick={() => handlePayment && handlePayment(rowData)}
        >
          Pay
        </div>
      );
    }

    return <span>{row}</span>;
  };

  const handleInputSearchChange = (e) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);

    const filterItems = data.filter((row) =>
      Object.values(row)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setFilterResult(filterItems);
  };

  return (
    <div className="container mx-auto px-4 py-6 bg-white rounded-lg shadow-[2px_3px_3px_0_rgba(0,0,0,0.3)] ">
      <div className="flex justify-between pb-3">
        <h1 className="text-2xl font-semibold rounded-md bg-mainColor p-1 px-3  text-white">
          {tableName}
        </h1>
        <input
          id={searchId}
          value={searchItem}
          onChange={handleInputSearchChange}
          className="px-2.5 py-1 outline-0 border border-gray-500 rounded-md text-sm w-32 sm:w-72"
          type="text"
          placeholder="Search here..."
        />
      </div>
      <div className="overflow-x-auto shadow-lg">
        <table className="min-w-full table-auto bg-white">
          {data.length > 0 && (
            <thead className="rounded-lg">
              <tr className="bg-gray-100 border-t border-gray-400">
                {Object.keys(data[0]).map((headName) => (
                  <th
                    key={headName}
                    className="px-4 py-2 text-left text-sm font-medium text-gray-600"
                  >
                    {headName}
                  </th>
                ))}
              </tr>
            </thead>
          )}

          <tbody>
            {filterResult.length > 0 ? (
              filterResult.map((rows, index) => (
                <tr
                  key={rows.id || index}
                  className="border-b border-gray-400  hover:bg-gray-50"
                >
                  {Object.entries(rows).map(([headName, row], i) => (
                    <td
                      className={`${
                        i === 0 ? "font-medium" : ""
                      } px-4 py-2.5 text-sm text-gray-700  `}
                      key={i}
                    >
                      {columnRendering({ headName, row, rowData: rows })}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr className="flex justify-center items-center">
                <td className="py-2 ">No records found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
