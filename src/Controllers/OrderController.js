const { Order } = require("../models");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class OrderController {
    async registerOrder(req, res) {
        try {
            const { product_id, amount, total_price, total_service_price, restaurant_id, buyer_id } = req.body;


            const authHeader = req.headers.authorization;

            const token = authHeader.split(" ")[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const restaurantIdFromToken = decoded.restaurantId;

            if (parseInt(restaurant_id) !== restaurantIdFromToken) {
                return res.status(403).json({ error: "Acesso negado!" });
            };

            const createdOrder = await Order.create({ product_id, amount, total_price, total_service_price, restaurant_id, buyer_id });

            return res.status(200).json(createdOrder);
        } catch (error) {
            console.log("Error:", error)
            return res.status(500).send({ message: "Não foi possível realizar pedido!" })
        }
    }

    async listOrderIdRestaurant(req, res) {
        const authHeader = req.headers.authorization;

        const { id } = req.params;

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const restaurantIdFromToken = decoded.restaurantId;

        if (parseInt(id) !== restaurantIdFromToken) {
            return res.status(403).json({ error: "Acesso negado!" });
        };

        try {
            const Order = await Order.findAll({ where: { restaurant_id: id } });
            return res.status(200).json(Order);
        } catch (error) {
            return res.status(500).send({ message: "Não foi possível listar pedidos!" })
        }
    }

    async updateOrder(req, res) {
        const authHeader = req.headers.authorization;

        const { id } = req.params;

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const restaurantIdFromToken = decoded.restaurantId;

        if (parseInt(id) !== restaurantIdFromToken) {
            return res.status(403).json({ error: "Acesso negado!" });
        };
        const { product_id, amount, total_price, total_service_price, restaurant_id, buyer_id } = req.body;
        const OrderBody = {
            product_id,
            amount,
            total_price,
            total_service_price,
            restaurant_id,
            buyer_id
        }
        try {
            await Order.update(OrderBody, { where: { id } });
            const orderUpdate = await Order.findOne({ where: { id } });
            return res.status(200).json(orderUpdate)
        } catch (error) {
            console.error("Erro ao atualizar produto:", error); // Log para entender o que aconteceu
            return res.status(500).send({ message: "Não foi possível atualizar pedido!" })
        }
    }

    async deleteOrder(req, res) {
        try {
            const { id } = req.params;
            const deleteOrder = await Order.destroy({ where: { id } });
            return res.status(200).send({ message: "Pedido deletado com sucesso!" })
        } catch (error) {
            return res.status(500).send({ message: "Não foi possível deletar pedido!" })
        }
    }

}

module.exports = new OrderController();