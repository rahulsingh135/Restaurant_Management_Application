const client = require("../config/db_connection");

const menuCategoryTable = async (req, res) => {
  const query = `
    CREATE TABLE IF NOT EXISTS menu_category (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(50) NOT NULL,
    category_type VARCHAR(50) NOT NULL CHECK (category_type IN ('Veg', 'Non-Veg', 'Both')),
    category_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) NOT NULL CHECK (status IN ('Enabled','Disabled'))
    )
  `;
  try {
    await client.query(query);
    console.log("menuCategory table created successfully: ");
  } catch (err) {
    console.error("Error occure when created menuCategory table:", err);
  }
};

module.exports = { menuCategoryTable };
