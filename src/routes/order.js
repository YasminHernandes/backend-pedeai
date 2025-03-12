const {Router} = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const OrderController = require("../Controllers/OrderController")

const routes = Router();

routes.post("/restaurant/orders", authMiddleware, OrderController.registerOrder);
routes.get("/restaurant/orders/:id", authMiddleware, OrderController.listOrderIdRestaurant);
routes.put("/restaurant/orders/:id", authMiddleware, OrderController.updateOrder);
routes.delete("/restaurant/orders/:id", OrderController.deleteOrder);

module.exports = routes;