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

routes.get('/employees/:id', async (req: Request, res: Response) => {
  try {
    const funcionario = await FuncionarioService.listarFuncionario(req.params.id)

    res.status(200).json(funcionario);
  } catch (error) {
    console.error('Erro ao listar funcionário:', error);
    res.status(500).json({ error: 'Erro ao listar funcionário' });
  }
});

routes.put('/employees/:id', async (req: Request, res: Response) => {
  try {
    const funcionario = await FuncionarioService.atualizarFuncionario(req.params.id, req.body)
    res.status(200).json(funcionario);
  } catch (error) {
    console.error('Erro ao atualizar funcionário:', error);
    res.status(500).json({ error: 'Erro ao atualizar funcionário' });
  }
});

routes.delete('/employees/:id', async (req: Request, res: Response) => {
  try {
    const funcionario = await FuncionarioService.excluirFuncionario(req.params.id)

    if (!funcionario) {
      res.status(200).json('Funcionário não encontrado');
      return
    }

    res.status(200).json('Funcionário foi excluido');
  } catch (error) {
    console.error('Erro ao atualizar funcionário:', error);
    res.status(500).json({ error: 'Erro ao excluir funcionário' });
  }
});

export default routes
