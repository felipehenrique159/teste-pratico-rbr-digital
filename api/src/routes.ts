import express, { Request, Response } from 'express';
const routes = express.Router();
import FuncionarioService from './services/FuncionarioService'

routes.post('/employees', async (req: Request, res: Response) => {
  try {
    const funcionario = await FuncionarioService.criarNovoFuncionario({
      nome: req.body.nome,
      cargo: req.body.cargo,
      departamento: req.body.departamento
    })

    res.status(201).json({ message: 'Funcionário criado com sucesso!', funcionario: funcionario });
  } catch (error) {
    console.error('Erro ao criar o funcionário:', error);
    res.status(500).json({ error: 'Erro ao criar o funcionário' });
  }
});

routes.get('/employees', async (req: Request, res: Response) => {
  try {
    const funcionarios = await FuncionarioService.listarTodos()

    res.status(200).json({ funcionarios: funcionarios });
  } catch (error) {
    console.error('Erro ao listar funcionários:', error);
    res.status(500).json({ error: 'Erro ao listar funcionários' });
  }
});

export default routes
