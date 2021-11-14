import Product from "../models/Product";

class ProductController {
    //Cria um novo produto
    async store(req, res) {
        const {name, description, price, category} = req.body;

        try {
            const categoryExists = await Category.findById(category);

            if(!categoryExists) {
                return res.status(400).json({error:'Categoria não encontrada'});
            }
            const ProductExists = await Product.findOne({name});

            if(ProductExists) {
                return res.status(400).json({error:'Produto ja existe!'});
            }

            const ProductObj = await Product.create({
                name, description, price, category
            });
            return res.json(ProductObj);
        } catch (err){
            res.status(500).json({error:'Erro'});
        }

    }
    //Listar todos os produtos
    async index(req, res) {
        try{
            const products = await Product.find({}).populate('category');

            return res.json(products)
        } catch (err){
            res.status(500).json({error:'Erro'});
        }
    }
    //Atualiza um produto
    async update(req, res) {
        const {id} = req.params;
        const {name, description, price, category} = req.body;

        try{
            const productUp = await Product.findById(id);

            productUp.name = name;
            productUp.description = description;
            productUp.price = price;
            productUp.category = category;

            await productUp.save();

            return res.json(productUp)

        } catch (err){
            return res.status(400).json({error:'Produto não encontrado'});
        }
    }
    //Deleta um produto
    async delete(req, res){
        const {id} = req.params;

        try{
            const productDel = await Product.findById(id);
            await productDel.remove();
            
            return res.status(204).send();
        } catch (err){
            return res.status(400).json({error:'Produto não encontrado'});
        }
    }
}

export default new ProductController();