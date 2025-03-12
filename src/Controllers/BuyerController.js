const {Buyer} = require("../models")

class BuyerController {
    async registerBuyer(req, res) {
        try {
            const { name, phone } = req.body;
            const userAlreadyExists = await Buyer.findOne({ where: { name, phone } });

            if (userAlreadyExists) {
                return res.status(400).json({ message: "Esse usuário já existe!" });
            }

            if (!name || !phone ) {
                return res.status(400).json({ message: "Campo Name ou Telefone não podem estar vazios!" });
            }

            const createdBuyer = await Buyer.create({ name, phone });

            return res.status(200).json(createdBuyer)
        } catch (error) {
            console.error("Erro ao cadastrar produto:", error); 
            return res.status(500).send({message: "Não foi possível cadastrar usuário!"})
        }
    }

    async listBuyer(req,res){
        try {
            const Buyer = await Buyer.findAll();
            return res.status(200).json(Buyer)
        } catch (error) {
            return res.status(500).send({message: "Não foi possível listar usuários!"})
        }
    }

    async listBuyerId(req, res){
        try {
            const {id} = req.params;
            const BuyerId = await Buyer.findOne({where: {id}});
            return res.status(200).json(BuyerId)
        } catch (error) {
            return res.status(500).send({message: "Não foi possível listar usuário!"})
        }
    }

    async updateBuyer(req, res){
        const {id} = req.params;
        const {name, phone} = req.body;
        const BuyerBody = {
            name,
            phone
        };

        try {
            await Buyer.update(BuyerBody,{where: {id}});
            const BuyerUpdate = await Buyer.findOne({where: {id}});
            return res.status(200).json(BuyerUpdate);
        } catch (error) {
            return res.status(500).send({message: "Não foi possível atualizar usuário!"})
        }
    }

    async deleteBuyer(req,res){
        try {
            const {id} = req.params;
            const buyerDelete = await Buyer.destroy({where: {id}});
            return res.status(200).send({message: "Usuário deletado com sucesso"})
        } catch (error) {
            return res.status(500).send({message: "Não foi possível deletar usuário!"})
        }
    }
}   

module.exports = new BuyerController();