const { Restaurant } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")
require("dotenv").config();


class RestaurantController {
    async registerRestaurant(req, res) {
        try {
            const { username, email, password, phone, address, has_service_tax } = req.body;

            const hashedPassword = await bcrypt.hash(password, 10);

            const userAlreadyExists = await Restaurant.findOne({where: {username}});

            if(userAlreadyExists){
                return res.status(400).json({message: "Esse restaurante já existe!"});
            }

            if(!username || !email || !password || !phone || !address ){
                return res.status(400).json({message: "Campo Username ou Email não podem estar vazios!"});
            }

            const createdRestaurant = await Restaurant.create({ username, email, password: hashedPassword, phone, address, has_service_tax });

            const { password: _, ...restaurantWithoutPassword } = createdRestaurant.toJSON();

            return res.status(200).json(restaurantWithoutPassword);
           
        } catch (error) {
            console.log("erro: ", error)
            res.status(500).send({message: "Restaurante não cadastrado no sistema!"})
        }
    }

    async loginRestaurant(req, res){
        try {
            const {email, password} = req.body;

            const restaurant = await Restaurant.findOne({where: {email}});
            if(!restaurant) return res.status(400).send({message: "Restaurante não encontrado!"});

            const isPasswordValid = await bcrypt.compare(password, restaurant.password);
            if (!isPasswordValid) return res.status(401).json({ error: "Email ou senha incorretos" });

            const token = jwt.sign({ restaurantId: restaurant.id}, process.env.JWT_SECRET, {
                expiresIn: "2h"
            });

            const { password: _, ...restaurantWithoutPassword } = restaurant.toJSON();

            return res.status(200).json({
                token,
                restaurant: restaurantWithoutPassword
            });

        } catch (error) {
            console.error("Erro ao logar:", error);
            return res.status(500).send({message: "Não foi possível realizar o login"});
        }
    }

    async listRestaurant(req, res) {
        try {
            const restaurant = await Restaurant.findAll({
                attributes: {exclude: ["password"]}
            });

            return res.status(200).json(restaurant)
        } catch (error) {
            res.status(500).send({message: "Restaurante não listado!"})
        }
    }

    async listRestaurantId(req,res) {
        const {id} = req.params;
        
        try {
            const restaurantId = await Restaurant.findOne({where: {id}});
            return res.status(200).json(restaurantId)
        } catch (error) {
            return res.status(500).send({message: "Restaurante não encontrado!"})
        }
    }

    async updateRestaurantId(req, res){
        const authHeader = req.headers.authorization;
        const {id} = req.params;

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const restaurantIdFromToken = decoded.restaurantId;

        const { username, email, password, phone, address, has_service_tax } = req.body;

        if (parseInt(id) !== restaurantIdFromToken) {
            return res.status(403).json({ error: "Acesso negado!" });
        }

        try {

            let updatedData = { username, email, phone, address, has_service_tax };
            if (password) {
                updatedData.password = await bcrypt.hash(password, 10);
            }

            await Restaurant.update(updatedData, {where: {id}});
            const restaurantUpdate = await Restaurant.findOne({where: {id}});
            return res.status(200).json(restaurantUpdate)
        } catch (error) {
            return res.status(500).send({message: "Não foi possível atualizar informações do restaurante!"})
        }
    }

    async deleteRestaurant(req, res){
        const authHeader = req.headers.authorization;
        const {id} = req.params;

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const restaurantIdFromToken = decoded.restaurantId;

        if (parseInt(id) !== restaurantIdFromToken) {
            return res.status(403).json({ error: "Acesso negado!" });
        }
        try {
            const pessoaDeletada = await Restaurant.destroy({where: {id}});
            return res.status(200).send({message: "Restaurante deletado com sucesso!"})
        } catch (error) {
            return res.status(500).send({message: "Erro ao deletar restaurante!"})
        }
    }

}

module.exports = new RestaurantController();