import {Router} from 'express';
import {uuid} from 'uuidv4';  
import CategoryController from './controllers/CatogoryController';
import ProductController from './controllers/ProductController';

const routes = new Router();

routes.post('/categories', CategoryController.store)
routes.get('/categories', CategoryController.index)
routes.put('/categories/:id', CategoryController.update)
routes.delete('/categories/:id', CategoryController.delete)

routes.post('/products', ProductController.store)
routes.get('/products', ProductController.index)
routes.put('/products/:id', ProductController.update)
routes.delete('/products/:id', ProductController.delete)

export default routes;