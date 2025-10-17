const { userTable } = require("../models/userModel");
const { menuCategoryTable } = require("../models/menuCategoryModel");
const { menuTable } = require("../models/menuModel");
const { customerTable } = require("../models/customerModel");
const { orderTable } = require("../models/orderModel");
const { billingTable } = require("../models/billingModel");
const { feedbackTable } = require("../models/feedbackModel");

const createAllTables = async () => {
  try {
    await userTable();
    await menuCategoryTable();
    await menuTable();
    await customerTable();
    await orderTable();
    await billingTable();
    await feedbackTable();
    console.log("All tables created successfully");
  } catch (error) {
    console.error("Error creating tables:", error);
  }
};

module.exports = {
  createAllTables,
};
