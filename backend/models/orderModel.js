const client = require("../config/db_connection");

const orderTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS "order" (
    order_id SERIAL PRIMARY KEY,
    menu_id INT NOT NULL,
    customer_name VARCHAR(50) NOT NULL,
    customer_number VARCHAR(50),
    order_status VARCHAR(50) NOT NULL,
    order_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (menu_id) REFERENCES menu(menu_id) ON DELETE CASCADE
);

  `;
  try {
    await client.query(query);
    console.log("order table created successfully");
  } catch (err) {
    console.error("Error occure when created order table:", err);
  }
};

module.exports = { orderTable };
