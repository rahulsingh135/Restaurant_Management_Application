const client = require("../config/db_connection");

const getAllOrders = async (req, res) => {
  try {
    const query = `
      SELECT 
        o.order_id,
        o.customer_name,
        m.menu_name,
        m.food_type,
        m.price,
        o.customer_number,
        TO_CHAR(o.order_time, 'YYYY-MM-DD HH24:MI:SS') AS order_time,
        o.order_status
      FROM "order" o
      JOIN menu m ON o.menu_id = m.menu_id
      ORDER BY 
        o.order_time ASC; 
    `;
    const result = await client.query(query);
    return res.status(200).json({ data: result.rows });
  } catch (error) {
    console.error("Error fetching all orders:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getTotalOrderPrice = async (req, res) => {
  try {
    const query = `
      SELECT SUM(m.price) AS total_price
      FROM "order" o
      JOIN menu m ON o.menu_id = m.menu_id
    `;
    const result = await client.query(query);
    return res.status(200).json({ total_price: result.rows[0].total_price });
  } catch (error) {
    console.error("Error calculating total order price:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getTotalOrders = async (req, res) => {
  try {
    const query = `
      SELECT COUNT(*) FROM "order";
    `;
    const result = await client.query(query);
    return res.status(200).json({ data: result.rows });
  } catch (error) {
    console.error("Error fetching all orders:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const query = `
      SELECT 
        o.order_id,
        o.customer_name,
        o.customer_number,
        o.order_status,
        o.order_time,
        m.menu_name
      FROM "order" o
      JOIN menu m ON o.menu_id = m.menu_id
      WHERE o.order_id = $1
    `;
    const result = await client.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ msg: "Order not found" });
    }

    return res.status(200).json({ data: result.rows[0] });
  } catch (error) {
    console.error("Error fetching order by ID:", error);
    return res.status(400).json({ error: "Invalid request" });
  }
};

const createOrder = async (req, res) => {
  try {
    const { menu_id, customer_name, customer_number, order_status } = req.body;

    // ---for creating customer---//
    const insertCustomerQuery = `
      INSERT INTO customer (customer_name, customer_number)
      VALUES ($1, $2)
      RETURNING *
    `;
    const newCustomer = await client.query(insertCustomerQuery, [
      customer_name,
      customer_number,
    ]);
    newCustomer;

    //---create order---//
    const query = `
      INSERT INTO "order" (menu_id, customer_name, customer_number, order_status)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;

    const values = [menu_id, customer_name, customer_number, order_status];

    const result = await client.query(query, values);
    return res.status(201).json({ data: result.rows[0] });
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(400).json({ msg: "Failed to create order" });
  }
};

const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { menu_id, customer_name, customer_number, order_status } = req.body;

    const query = `
      UPDATE "order"
      SET 
        menu_id = COALESCE($1, menu_id),
        customer_name = COALESCE($2, customer_name),
        customer_number = COALESCE($3, customer_number),
        order_status = COALESCE($4, order_status)
      WHERE order_id = $5
      RETURNING *
    `;
    const values = [menu_id, customer_name, customer_number, order_status, id];

    const result = await client.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Order not found" });
    }

    return res.status(200).json({ data: result.rows[0] });
  } catch (error) {
    console.error(`Error when updating order with ID ${id}:`, error);
    return res.status(400).json({ msg: "Failed to update order" });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const query = 'DELETE FROM "order" WHERE order_id = $1';
    await client.query(query, [id]);

    return res.status(200).json({ msg: `Order with ID ${id} deleted` });
  } catch (error) {
    console.error("Error deleting order:", error);
    return res.status(400).json({ msg: "Failed to delete order" });
  }
};

module.exports = {
  getAllOrders,
  getTotalOrders,
  getTotalOrderPrice,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
};
