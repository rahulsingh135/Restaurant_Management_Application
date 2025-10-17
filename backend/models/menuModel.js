const client = require("../config/db_connection");

const menuTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS menu (
    menu_id SERIAL PRIMARY KEY,
    menu_name VARCHAR(50) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    menu_image VARCHAR(255),
    food_type VARCHAR(50) NOT NULL ,
    category_id INT NOT NULL,
    menu_status VARCHAR(20) NOT NULL ,
    FOREIGN KEY (category_id) REFERENCES menu_category (category_id) ON DELETE CASCADE
);
  `;
  try {
    await client.query(query);
    console.log("Menu table created successfully");
  } catch (err) {
    console.error("Error occure when created menu table:", err);
  }
};

module.exports = { menuTable };
