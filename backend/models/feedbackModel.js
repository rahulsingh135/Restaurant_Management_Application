const client = require("../config/db_connection");

const feedbackTable = async (req, res) => {
  const query = `
        CREATE TABLE IF NOT EXISTS feedback (
        feedback_id SERIAL PRIMARY KEY,
        order_id INT NOT NULL,
        feedback_text TEXT,
        rating INT CHECK (rating BETWEEN 1 AND 5),
        feedback_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (order_id) REFERENCES "order" (order_id) ON DELETE CASCADE
    );
  `;
  try {
    await client.query(query);
    console.log("feedback table created successfully");
  } catch (err) {
    console.error("Error occure when created feedback table:", err);
  }
};

module.exports = { feedbackTable };
