import express, { Request, Response } from 'express';
const routes = express.Router();
import FuncionarioController from './controllers/FuncionarioController';

routes.post('/employees', async (req: Request, res: Response) => {
  return await FuncionarioController.criarNovoFuncionario(req, res);
});

routes.get('/employees', async (req: Request, res: Response) => {
  return await FuncionarioController.listarTodos(req, res);
});

routes.get('/employees/:id', async (req: Request, res: Response) => {
  return await FuncionarioController.listarFuncionario(req, res);
});

routes.put('/employees/:id', async (req: Request, res: Response) => {
  return await FuncionarioController.atualizarFuncionario(req, res);
});

routes.delete('/employees/:id', async (req: Request, res: Response) => {
  return await FuncionarioController.excluirFuncionario(req, res);
});

export default routes
