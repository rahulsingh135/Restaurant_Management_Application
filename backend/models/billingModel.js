const client = require("../config/db_connection");

const billingTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS billing (
    billing_id SERIAL PRIMARY KEY,
    order_id INT NOT NULL,
    billing_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    payment_status BOOLEAN,
    amount DECIMAL(10, 2) NOT NULL
    
  );
  `;

  try {
    await client.query(query);
    console.log("billing table created successfully");
    // return res.status(200).json({ msg: "Success" });
  } catch (err) {
    console.error("Error occure when created Billing table:", err);
    // return res.status(400).json({ msg: "Error" });
  }
};

module.exports = {
  billingTable,
};
