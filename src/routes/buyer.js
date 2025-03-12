const {Router} = require("express");
const BuyerController = require("../Controllers/BuyerController")

const routes = Router();

routes.post("/public/buyers", BuyerController.registerBuyer);
routes.get("/public/buyers", BuyerController.listBuyer);
routes.get("/public/buyers/:id", BuyerController.listBuyerId);
routes.put("/public/buyers/:id", BuyerController.updateBuyer);
routes.delete("/public/buyers/:id", BuyerController.deleteBuyer);

module.exports = routes;