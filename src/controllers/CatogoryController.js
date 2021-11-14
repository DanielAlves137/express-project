import Category from "../models/Category";
import Category from "../models/Category";

class CategoryController {
    // Listar todas as categorias
    async index(req, res){
        
        try{
            const categories = await Category.find({});

            return res.json(categories)
        } catch (err){
            res.status(500).json({error:'Erro'});
        }
    }
    
    // Criar uma nova categoria
    async store(req, res) {
        const {name} = req.body;

        try {
            const categoryExists = await Category.findOne({name});

            if(categoryExists) {
                return res.status(400).json({error:'Categoria ja existe!'});
            }

            const CategoryName = await Category.create({
                name
            });
            return res.json(CategoryName)
        } catch (err){
            res.status(500).json({error:'Erro'});
        }
    }

    //Atualizar uma categoria
    async update(req, res) {
        const {id} = req.params;
        const {name} = req.body;

        try{
            const categoryUp = await Category.findById(id);

            if(name && (name !== Category.name)){
                const categoryExists = await Category.findOne({name});

                if(categoryExists) {
                    return res.status(400).json({error:'Categoria ja existe!'});
                }
            }

            categoryUp.name = name;
            await categoryUp.save();

            return res.json(categoryUp)

        } catch (err){
            return res.status(400).json({error:'Categoria não encontrada'});
        }
    }

    //Deletar uma categoria
    async delete(req, res){
        const {id} = req.params;

        try{
            const categoryDel = await Category.findById(id);
            await categoryDel.remove();
            
            return res.status(204).send();
        } catch (err){
            return res.status(204).send();
        }
    }
}

export default new CategoryController();