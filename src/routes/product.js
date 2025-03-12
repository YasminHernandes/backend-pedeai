const { Router } = require("express");
const authMiddleware = require("../middlewares/authMiddleware")
const ProductController = require("../Controllers/ProductController")
const routes = Router();

routes.post("/restaurant/products", authMiddleware, ProductController.registerProduct);
routes.get("/restaurant/products", ProductController.listProduct);

routes.get("/restaurant/products/:id", authMiddleware, ProductController.listProductIdRestaurant);
routes.put("/restaurant/products/:id", ProductController.updateProduct);
routes.delete("/restaurant/products/:id", ProductController.deleteProduct);

module.exports = routes;