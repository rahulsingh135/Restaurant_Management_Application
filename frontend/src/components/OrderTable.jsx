import React from "react";

const Table = ({ data }) => {
  return (
    <div className="container mx-auto px-4 py-6 bg-white rounded-lg shadow-[2px_3px_3px_0_rgba(0,0,0,0.3)] ">
      <div className="flex justify-between pb-3">
        <h1 className="text-2xl font-[500] pb-1 text-mainColor">Orders List</h1>
        <input
          id="latest_order_search_box"
          className="px-2.5 py-1 outline-0 border-1 border-gray-500 rounded-md text-sm w-70"
          type="text"
          placeholder="Search here..."
        />
      </div>
      <hr />
      <div className="overflow-x-auto shadow-lg">
        <table className="min-w-full table-auto bg-white">
          <thead className=" rounded-lg ">
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

          <tbody>
            {data.map((rows, index) => (
              <tr
                key={index}
                className="border-b border-gray-400 hover:bg-gray-50"
              >
                {Object.values(rows).map((row,i)=>(
                  <td className={i===0 ?"font-medium": ""  `px-4 py-2 text-sm text-gray-700`}> {row}</td>
                ))}

              </tr>
            ))}
            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
