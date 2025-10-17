const client = require("../config/db_connection");
const { createAllTables } = require("./createAllTable");

const handleDBTableCreationsChecker = async () => {
  const tableNames = [
    "user",
    "billing",
    "menu",
    "menu_category",
    "order",
    "customer",
    "feedback",
  ];

  for (const table of tableNames) {
    const checkCreateQuery = `
        SELECT EXISTS (
            SELECT 1
            FROM information_schema.tables
            WHERE table_schema = 'public' AND table_name = $1
        );
    `;

    const response = await client.query(checkCreateQuery, [table]);
    const exist = response.rows[0].exists;

    if (!exist) {
      await createAllTables();
    }
  }
};

module.exports = {
  handleDBTableCreationsChecker,
};
