const client = require("../config/db_connection");

const getAllUsers = async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM "user"');
    return res.status(200).json({ data: result.rows });
  } catch (error) {
    console.error("Error when fetching users:", error);
    return res.status(400).json({ error: "error" });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const query = 'SELECT * FROM "user" WHERE user_id = $1';
    const result = await client.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ data: result.rows[0] });
  } catch (error) {
    console.error("Error while fetching user by ID:", error);
    return res.status(400).json({ error: "error" });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, username, email, password, role } = req.body;
    const query = `INSERT INTO "user" (name, username, email, password, role) VALUES ($1, $2, $3, $4, $5) RETURNING * `;
    const values = [name, username, email, password, role];
    const result = await client.query(query, values);

    return res.status(201).json({ data: result.rows[0] });
  } catch (error) {
    console.error("Error when creating user:", error);
    return res.status(500).json({ error: "error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, username, email, password, role } = req.body;
    const query = `
      UPDATE "user"
      SET 
      name = COALESCE($1, name),
      username = COALESCE($2, username),
      email = COALESCE($3, email),
      password = COALESCE($4, password),
      role = COALESCE($5, role)
      WHERE user_id = $6
      RETURNING *
    `;
    const values = [name, username, email, password, role, id];
    const result = await client.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ data: result.rows[0] });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ error: "error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const query = 'DELETE FROM "user" WHERE user_id = $1';
    const result = await client.query(query, [id]);

    return res.status(200).json({ msg: `User with ID ${id} deleted` });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ error: "error" });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
