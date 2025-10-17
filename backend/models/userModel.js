const client = require("../config/db_connection");

const userTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS "user" (
            user_id SERIAL PRIMARY KEY,
            name VARCHAR(50),
            username VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(50) UNIQUE NOT NULL,
            password TEXT NOT NULL,
            role VARCHAR(50) NOT NULL
        );
    `;
  try {
    await client.query(query);
    console.log("user table created successfully:");
  } catch (err) {
    console.error("Error occure when created user table", err);
  }
};

module.exports = {
  userTable,
};
