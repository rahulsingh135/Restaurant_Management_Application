const client = require("../config/db_connection");

const getAllCategory = async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM menu_category");
    return res.status(200).json({ data: result.rows });
  } catch (error) {
    console.error("Error when fetching all menu_category items:", error);
    return res.status(500).json({ error: "error" });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const query = "SELECT * FROM menu_category WHERE category_id = $1";
    const result = await client.query(query, [id]);
    if (result.rows.length === 0) {
      return res.status(200).json({ msg: "Menu_category item not found" });
    }
    return res.status(201).json({ data: result.rows[0] });
  } catch (error) {
    console.error("Error when fetching menu_category items by id:", error);
    return res.status(400).json({ error: "error" });
  }
};

const getMenuCategories = async (req, res) => {
  try {
    const result = await client.query(
      "SELECT category_id, category_name FROM menu_category"
    );
    return res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching menu categories name:", error);
    return res.status(400).json({ error: "Failed to fetch categories" });
  }
};

const createCategory = async (req, res) => {
  try {
    const { category_name, category_type, status } = req.body;
    const query =
      "INSERT INTO menu_category(category_name, category_type, status) VALUES($1, $2, $3) RETURNING *";
    const values = [category_name, category_type, status];
    const result = await client.query(query, values);
    return res.status(201).json({ data: result.rows[0] });
  } catch (error) {
    console.log("error when creating category", error);
    return res.status(400).json({ msg: "error" });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { category_name, category_type, status } = req.body;
    const query = `
        UPDATE menu_category 
        SET 
        category_name = COALESCE($1, category_name),
        category_type = COALESCE($2, category_type),
        status = COALESCE($3, status)
        WHERE category_id = $4
        RETURNING *
        `;
    const values = [category_name, category_type, status, id];
    const result = await client.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "category_item not found" });
    }
    res.status(200).json({ data: result.rows[0] });
  } catch (error) {
    console.log(`error occure when updating id:${id}`, error);
    return res.status(400).json({ msg: "error" });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const query = "DELETE FROM menu_category WHERE category_id = $1";
    const result = await client.query(query, [id]);

    return res.status(201).json({ msg: `Id: ${id} number is delete` });
  } catch (error) {
    console.log("error when deleting", error);
    return res.status(400).json({ msg: "error" });
  }
};

module.exports = {
  getAllCategory,

  getCategoryById,
  getMenuCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
