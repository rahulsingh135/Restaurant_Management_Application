const client = require("../config/db_connection");

// const getAllMenu = async (req, res) => {
//   try {
//     const result = await client.query("SELECT * FROM menu");
//     return res.status(200).json({ data: result.rows });
//   } catch (error) {
//     console.error("Error when fetching all menu items:", error);
//     return res.status(500).json({ error: "error" });
//   }
// };
const getAllMenu = async (req, res) => {
  try {
    const query = `
    SELECT 
      m.menu_id,
      m.menu_image,
      m.menu_name,
      m.food_type,
      m.price,
      c.category_name,
      m.menu_status
      FROM 
          menu m
      JOIN 
    menu_category c ON m.category_id = c.category_id
    Order by menu_id 
    `;
    const result = await client.query(query);
    return res.status(200).json({ data: result.rows });
  } catch (error) {
    console.error("Error when fetching all menu items:", error);
    return res.status(500).json({ error: "error" });
  }
};

const getMenuById = async (req, res) => {
  try {
    const { id } = req.params;
    const query = "SELECT * FROM menu WHERE menu_id = $1";
    const result = await client.query(query, [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Menu item not found" });
    }
    return res.status(200).json({ data: result.rows[0] });
  } catch (error) {
    console.error("Error when fetching menu by id:", error);
    return res.status(500).json({ error: "error" });
  }
};

const getMenuName = async (req, res) => {
  try {
    const result = await client.query("SELECT menu_id, menu_name FROM menu");
    return res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching menu  name:", error);
    return res.status(400).json({ error: "Failed to fetch menu name" });
  }
};
const getMenuNamePrice = async (req, res) => {
  try {
    const result = await client.query(
      "SELECT menu_id, menu_name ,price FROM menu"
    );
    return res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching menu  name:", error);
    return res.status(400).json({ error: "Failed to fetch menu name" });
  }
};

const createMenu = async (req, res) => {
  try {
    const { name, price, food_type, category_id, menu_status } = req.body;
    const menu_image = req.file ? req.file.filename : null;
    const query =
      "INSERT INTO menu(menu_name, price , menu_image, food_type, category_id ,menu_status) VALUES($1, $2, $3 ,$4 ,$5 ,$6) RETURNING *";
    const values = [
      name,
      price,
      menu_image,
      food_type,
      category_id,
      menu_status,
    ];
    const result = await client.query(query, values);
    return res.status(201).json({ data: result.rows[0] });
  } catch (error) {
    console.error("Error when creating menu items:", error);
    return res.status(500).json({ error: "error" });
  }
};

const updateMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    // console.log(updatedData);
    const { name, price, food_type, category_id, menu_status } = updatedData;
    const menu_image = req.file ? req.file.filename : null;
    const query = `
      UPDATE menu
      SET
        menu_name = COALESCE($1, menu_name),
        price = COALESCE($2, price),
        menu_image = COALESCE($3, menu_image),
        food_type = COALESCE($4, food_type),
        category_id = COALESCE($5, category_id),
        menu_status = COALESCE($6, menu_status)
      WHERE menu_id = $7
      RETURNING *`;

    const values = [
      name,
      price,
      menu_image,
      food_type,
      category_id,
      menu_status,
      id,
    ];
    const result = await client.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Menu not found" });
    }
    return res.status(200).json({ data: result.rows[0] });
  } catch (error) {
    console.error("Something went wrong while updating the menu", error);
    return res
      .status(500)
      .json({ error: "Something went wrong while updating the menu" });
  }
};

const deleteMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const query = "DELETE FROM menu WHERE menu_id = $1";
    const result = await client.query(query, [id]);
    return res.status(200).json({ msg: `${id} number is delete` });
  } catch (error) {
    console.error("Something went wrong while deleting the menu", error);
    return res.status(400).json({ error: "error" });
  }
};

module.exports = {
  getAllMenu,
  getMenuById,
  getMenuName,
  getMenuNamePrice,
  createMenu,
  updateMenu,
  deleteMenu,
};
