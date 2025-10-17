const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const {
  getAllCategory,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,

  getMenuCategories,
} = require("../controllers/menuCategory");

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/user");
const {
  getAllMenu,
  getMenuById,
  createMenu,
  updateMenu,
  deleteMenu,
  getMenuName,
  getMenuNamePrice,
} = require("../controllers/menu");
const {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  getTotalOrders,
  getTotalOrderPrice,
} = require("../controllers/order");
const {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getTotalCustomer,
} = require("../controllers/customer");
const {
  getAllFeedback,
  getFeedbackById,
  createFeedback,
  updateFeedback,
  deleteFeedback,
  getTotalFeedback,
} = require("../controllers/feedback");

/* ---menu--- */
router.get("/menu/get-all-items", getAllMenu);
router.get("/menu/:id", getMenuById);
router.get("/menu-name", getMenuName);
router.get("/menu-name-price", getMenuNamePrice);
router.post("/menu/create", upload.single("menu_image"), createMenu);
router.put("/menu/update/:id", upload.single("menu_image"), updateMenu);
router.delete("/menu/delete/:id", deleteMenu);

/* ---menu category--- */
router.get("/menu-category/get-all-items", getAllCategory);
router.get("/menu-category/:id", getCategoryById);
router.get("/menu-category-name", getMenuCategories);
router.post("/menu-category/create", createCategory);
router.put("/menu-category/update/:id", updateCategory);
router.delete("/menu-category/delete/:id", deleteCategory);

/* ---customer--- */
router.get("/customers", getAllCustomers);
router.get("/customer/total", getTotalCustomer);
router.get("/customer/:id", getCustomerById);
router.post("/customer/create", createCustomer);
router.put("/customer/update/:id", updateCustomer);
router.delete("/customer/delete/:id", deleteCustomer);

/* ---order--- */
router.get("/orders", getAllOrders);
router.get("/order/total", getTotalOrders);
router.get("/order/total-price", getTotalOrderPrice);
router.get("/order/:id", getOrderById);
router.post("/order/create", createOrder);
router.put("/order/update/:id", updateOrder);
router.delete("/order/delete/:id", deleteOrder);

/* ---feedback--- */
router.get("/feedbacks", getAllFeedback);
router.get("/feedback/total", getTotalFeedback);
router.get("/feedback/:id", getFeedbackById);
router.post("/feedback/create", createFeedback);
router.put("/feedback/update/:id", updateFeedback);
router.delete("/feedback/delete/:id", deleteFeedback);

/* ---user--- */
router.get("/users", getAllUsers);
router.get("/user/:id", getUserById);
router.post("/user/create", createUser);
router.put("/user/update/:id", updateUser);
router.delete("/user/delete/:id", deleteUser);

module.exports = router;
