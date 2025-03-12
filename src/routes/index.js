const express = require("express");
const restaurantRoutes = require("./restaurant");
const productRoutes = require("./product");
const buyerRoutes = require("./buyer")
const orderRoutes = require("./order")

const router = express.Router();

router.use(restaurantRoutes);
router.use(productRoutes);
router.use(buyerRoutes);
router.use(orderRoutes);

module.exports = router;
