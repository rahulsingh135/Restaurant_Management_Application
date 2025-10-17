const client = require("../config/db_connection");

const customerTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS customer (
    customer_id SERIAL PRIMARY KEY,
    customer_name VARCHAR(50),
    customer_number VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
    );
  `;

  try {
    await client.query(query);
    console.log("customer table created successfully");
  } catch (err) {
    console.error("Error occure when created customer table:", err);
  }
};
module.exports = {
  customerTable,
};
