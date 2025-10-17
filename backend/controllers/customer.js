const client = require("../config/db_connection");

const getAllCustomers = async (req, res) => {
  try {
    const result = await client.query(
      "SELECT * FROM customer ORDER BY customer_id ASC"
    );
    return res.status(200).json({ data: result.rows });
  } catch (error) {
    console.error("Error when fetching all customers:", error);
    return res.status(400).json({ error: "Internal Server Error" });
  }
};

const getTotalCustomer = async (req, res) => {
  try {
    const result = await client.query("SELECT COUNT(*) FROM customer");
    return res.status(200).json({ data: result.rows });
  } catch (error) {
    console.error("Error when fetching all menu_category items:", error);
    return res.status(500).json({ error: "error" });
  }
};

const getCustomerById = async (req, res) => {
  try {
    const { id } = req.params;
    const query = "SELECT * FROM customer WHERE customer_id = $1";
    const result = await client.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ msg: "Customer not found" });
    }

    return res.status(200).json({ data: result.rows[0] });
  } catch (error) {
    console.error(`Error when fetching customer with ID ${id}:`, error);
    return res.status(400).json({ error: "Internal Server Error" });
  }
};

const createCustomer = async (req, res) => {
  try {
    const { customer_name, customer_number } = req.body;
    const query = `
      INSERT INTO customer (customer_name, customer_number) 
      VALUES ($1, $2) 
      RETURNING *
    `;
    const values = [customer_name, customer_number];
    const result = await client.query(query, values);

    return res.status(201).json({ data: result.rows[0] });
  } catch (error) {
    console.error("Error when creating customer:", error);
    return res.status(400).json({ error: "Internal Server Error" });
  }
};

const updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const { customer_name, customer_number } = req.body;

    const query = `
      UPDATE customer 
      SET 
        customer_name = COALESCE($1, customer_name),
        customer_number = COALESCE($2, customer_number)
      WHERE customer_id = $3
      RETURNING *
    `;
    const values = [customer_name, customer_number, id];
    const result = await client.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Customer not found" });
    }

    return res.status(200).json({ data: result.rows[0] });
  } catch (error) {
    console.error(`Error updating customer with ID ${id}:`, error);
    return res.status(400).json({ error: "Internal Server Error" });
  }
};

const deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;

    const query = "DELETE FROM customer WHERE customer_id = $1 RETURNING *";
    const result = await client.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Customer not found" });
    }

    return res.status(200).json({ msg: `Customer with ID ${id} deleted` });
  } catch (error) {
    console.error("Error deleting customer:", error);
    return res.status(400).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllCustomers,
  getCustomerById,
  getTotalCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
