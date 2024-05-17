import express, { Request, Response } from 'express';
const routes = express.Router();
import FuncionarioService from './services/FuncionarioService'

routes.post('/employees', async (req: Request, res: Response) => {
  try {
    await FuncionarioService.criarNovoFuncionario({
      nome: req.body.nome,
      cargo: req.body.cargo,
      departamento: req.body.departamento
    })

    res.status(201).json({ message: 'Funcionário criado com sucesso!' });
  } catch (error) {
    console.error('Erro ao criar o funcionário:', error);
    res.status(500).json({ error: 'Erro ao criar o funcionário' });
  }
});

export default routes
