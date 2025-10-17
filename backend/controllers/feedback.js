const client = require("../config/db_connection");

const getAllFeedback = async (req, res) => {
  try {
    const result = await client.query(`
      SELECT 
        f.feedback_id,
        o.customer_name,
        f.order_id,
        f.feedback_text,
        TO_CHAR(f.feedback_time, 'YYYY-MM-DD HH24:MI:SS') create_at,
        f.rating
      FROM feedback f
      JOIN "order" o ON f.order_id = o.order_id
      ORDER BY f.feedback_id ASC
    `);

    return res.status(200).json({ data: result.rows });
  } catch (error) {
    console.error("Error when fetching all feedback:", error);
    return res.status(400).json({ error: "Internal Server Error" });
  }
};

const getTotalFeedback = async (req, res) => {
  try {
    const result = await client.query("SELECT Count(*) FROM feedback");

    return res.status(200).json({ data: result.rows });
  } catch (error) {
    console.error("Error when fetching all feedback:", error);
    return res.status(400).json({ error: "Internal Server Error" });
  }
};

const getFeedbackById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await client.query(
      `
      SELECT 
        f.feedback_id,
        o.customer_name,
        f.order_id,
        f.feedback_text,
        f.rating,
        f.feedback_time
      FROM feedback f
      JOIN "order" o ON o.order_id = o.order_id
      WHERE f.feedback_id = $1
    `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ msg: "Feedback not found" });
    }

    return res.status(200).json({ data: result.rows[0] });
  } catch (error) {
    console.error(`Error when fetching feedback with ID ${id}:`, error);
    return res.status(400).json({ error: "Error" });
  }
};

const createFeedback = async (req, res) => {
  try {
    const { order_id, feedback_text, rating } = req.body;

    const query = `
      INSERT INTO feedback ( order_id, feedback_text, rating)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    const values = [order_id, feedback_text, rating];
    const result = await client.query(query, values);

    return res.status(201).json({ data: result.rows[0] });
  } catch (error) {
    console.error("Error creating feedback:", error);
    return res.status(400).json({ error: "Error" });
  }
};

const updateFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const { order_id, feedback_text, rating } = req.body;

    const query = `
      UPDATE feedback
      SET
        order_id = COALESCE($1, order_id),
        feedback_text = COALESCE($2, feedback_text),
        rating = COALESCE($3, rating)
      WHERE feedback_id = $4
      RETURNING *
    `;
    const values = [order_id, feedback_text, rating, id];
    const result = await client.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ msg: "Feedback not found" });
    }

    return res.status(200).json({ data: result.rows[0] });
  } catch (error) {
    console.error(`Error when updating feedback with ID ${id}:`, error);
    return res.status(400).json({ error: "Error" });
  }
};

const deleteFeedback = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await client.query(
      "DELETE FROM feedback WHERE feedback_id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ msg: "Feedback not found" });
    }

    return res.status(200).json({ msg: `Feedback with ID ${id} deleted` });
  } catch (error) {
    console.error("Error happen when deleting feedback:", error);
    return res.status(400).json({ error: "Error" });
  }
};

module.exports = {
  getAllFeedback,
  getTotalFeedback,
  getFeedbackById,
  createFeedback,
  updateFeedback,
  deleteFeedback,
};
