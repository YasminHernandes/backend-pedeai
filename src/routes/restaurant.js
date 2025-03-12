
const { Router } = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const RestaurantController = require("../controllers/RestaurantController");

const routes = Router();

routes.post("/public/restaurants", RestaurantController.registerRestaurant);
routes.get("/public/restaurants", RestaurantController.listRestaurant);
routes.get("/public/restaurants/:id", RestaurantController.listRestaurantId);

routes.get("/public/login", RestaurantController.loginRestaurant);

routes.put("/restaurants/:id", authMiddleware, RestaurantController.updateRestaurantId);
routes.delete("/restaurants/:id", authMiddleware, RestaurantController.deleteRestaurant);

module.exports = routes;