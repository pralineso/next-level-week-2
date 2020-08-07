import express, { response } from 'express'
import ClassesController from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsController';

const routes = express.Router();
const classesControllers = new ClassesController();
const connectionsController = new ConnectionsController();

routes.get('/classes', classesControllers.index);
routes.post('/classes', classesControllers.create);

routes.get('/connections', connectionsController.index);
routes.post('/connections', connectionsController.create);

export default routes;


//---------------------
// GET: Buscar ou listar uma informação
// POST: Criar uma nova informação
// PUT: Atualizar uma informação existente
// DELETE: Deletar uma informaçãp existente

// Corpo (Request Body): Dados para criação ou atualização de um registro
// Route Params: Identificar qual recurso eu quero atualizar ou deletar
// Query Params: Paginação, filtros, ordenação
/*
app.post('/users', (request, response) => {

    console.log(request.body)

    const users = [
        {name: 'Mariana', age: 25},
        {name: 'Juju', age: 15}
    ];

    return response.json(users);
})
*/
/** exemplo Route params com DELETE */
//http://localhost:3333/users/1
/*
app.delete('/users/:id', (request, response) => {

    console.log(request.params)

    const users = [
        {name: 'Mariana', age: 25},
        {name: 'Juju', age: 15}
    ];

    return response.json(users);
})
*/

/** exemplo Query params */
//http://localhost:3333/users?page=2&sort=name
/*
app.get('/users', (request, response) => {

    console.log(request.query)

    const users = [
        {name: 'Mariana', age: 25},
        {name: 'Juju', age: 15}
    ];

    return response.json(users);
})
*/