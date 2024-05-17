import express, { Request, Response } from 'express';
import { validationResult, body, param } from 'express-validator';
const routes = express.Router();
import FuncionarioController from './controllers/FuncionarioController';

routes.post('/employees', [
  body('nome').notEmpty().isString().withMessage('O campo "nome" é obrigatório e do tipo string'),
  body('cargo').notEmpty().isString().withMessage('O campo "cargo" é obrigatório e do tipo string'),
  body('departamento').notEmpty().isString().withMessage('O campo "departamento" é obrigatório e do tipo string')
], async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  return await FuncionarioController.criarNovoFuncionario(req, res);
});

routes.get('/employees', async (req: Request, res: Response) => {
  return await FuncionarioController.listarTodos(req, res);
});

routes.get('/employees/:id', [
  param('id').notEmpty().isString().withMessage('O parâmetro "id" é obrigatório e do tipo string')
], async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  return await FuncionarioController.listarFuncionario(req, res);
});

routes.put('/employees/:id', [
  param('id').notEmpty().isString().withMessage('O parâmetro "id" é obrigatório e do tipo string'),
  body('nome').notEmpty().isString().withMessage('O campo "nome" é obrigatório e do tipo string'),
  body('cargo').notEmpty().isString().withMessage('O campo "cargo" é obrigatório e do tipo string'),
  body('departamento').notEmpty().withMessage('O campo "departamento" é obrigatório e do tipo string')
], async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  return await FuncionarioController.atualizarFuncionario(req, res);
});

routes.delete('/employees/:id', [
  param('id').notEmpty().isString().withMessage('O parâmetro "id" é obrigatório e do tipo string'),
], async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  return await FuncionarioController.excluirFuncionario(req, res);
});

export default routes
