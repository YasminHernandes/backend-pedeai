const { Product, Restaurant } = require('../models'); // Importe corretamente os modelos
const jwt = require("jsonwebtoken");
require("dotenv").config();

class ProductController {
    async registerProduct(req, res) {
        try {
            const { name, description, value, restaurant_id } = req.body;

            const authHeader = req.headers.authorization;

            const token = authHeader.split(" ")[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const restaurantIdFromToken = decoded.restaurantId;
    
            if (parseInt(restaurant_id) !== restaurantIdFromToken) {
                return res.status(403).json({ error: "Acesso negado!" });
            }

            const userAlreadyExists = await Product.findOne({ where: { name } });

            if (userAlreadyExists) {
                return res.status(400).json({ message: "Falha no cadastro, produto já existente!" });
            }

            if (!name || !description || !value || !restaurant_id) {
                return res.status(400).json({ message: "Campo name, description, value ou restaurant_id não podem estar vazios!" });
            }

            const restaurantExists = await Restaurant.findByPk(restaurant_id);
            if (!restaurantExists) {
                return res.status(400).json({ message: "Restaurante não encontrado!" });
            }

            const parsedValue = parseFloat(value);
            if (isNaN(parsedValue) || parsedValue <= 0) {
                return res.status(400).json({ message: "O valor do produto deve ser um número válido e maior que zero!" });
            }

            const createdProduct = await Product.create({ name, description, value: parsedValue, restaurant_id });

            return res.status(200).json(createdProduct)
        } catch (error) {
            console.log("ERRO:", error)
            return res.status(500).send({ message: "Erro ao cadastrar o produto!", error: error.message });
        }
    }
    async updateProduct(req, res) {
        const { id } = req.params;
        const { name, description, value, restaurant_id } = req.body;
        const productBody = {
            name,
            description,
            value,
            restaurant_id
        };
        try {
            await Product.update(productBody, { where: { id } });
            const productUpdate = await Product.findOne({ where: { id } });
            return res.status(200).json(productUpdate)
        } catch (error) {
            return res.status(500).send({ message: "Erro ao atualizar o produto!" });
        }
    }
    async listProduct(req, res) {
        try {
            const getProduct = await Product.findAll();

            return res.status(200).json(getProduct)
        } catch (error) {
            console.log("erro:", error)
            return res.status(500).send({ message: "Erro ao listar produtos!" });
        }
    }
    async listProductIdRestaurant(req, res) {
        const authHeader = req.headers.authorization;
        const { id } = req.params;

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const restaurantIdFromToken = decoded.restaurantId;

        if (parseInt(id) !== restaurantIdFromToken) {
            return res.status(403).json({ error: "Acesso negado!" });
        }
        try {
            const getProduct = await Product.findAll({ where: { restaurant_id: id }});
            return res.status(200).json(getProduct);
        } catch (error) {
            return res.status(500).send({ message: "Erro ao listar produtos!" });
        }
    }
    async deleteProduct(req, res) {
        try {
            const { id } = req.params;
            const deleteProduct = await Product.destroy({ where: { id } });
            return res.status(200).send({ message: "Produto deletado com sucesso!" })
        } catch (error) {
            return res.status(500).send({ message: "Erro ao deletar produto!" });
        }
    }
}
module.exports = new ProductController();