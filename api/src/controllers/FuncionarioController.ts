import FuncionarioService from "../services/FuncionarioService";
import { Request, Response } from 'express';

export default class FuncionarioController {
    static async criarNovoFuncionario(req: Request, res: Response) {
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
    }

    static async listarTodos(req: Request, res: Response) {
        try {
            const funcionarios = await FuncionarioService.listarTodos()

            res.status(200).json({ funcionarios: funcionarios });
        } catch (error) {
            console.error('Erro ao listar funcionários:', error);
            res.status(500).json({ error: 'Erro ao listar funcionários' });
        }
    }

    static async listarFuncionario(req: Request, res: Response) {
        try {
            const funcionario = await FuncionarioService.listarFuncionario(req.params.id)

            res.status(200).json(funcionario);
        } catch (error) {
            console.error('Erro ao listar funcionário:', error);
            res.status(500).json({ error: 'Erro ao listar funcionário' });
        }
    }

    static async atualizarFuncionario(req: Request, res: Response) {
        try {
            const funcionario = await FuncionarioService.atualizarFuncionario(req.params.id, req.body)
            res.status(200).json(funcionario);
        } catch (error) {
            console.error('Erro ao atualizar funcionário:', error);
            res.status(500).json({ error: 'Erro ao atualizar funcionário' });
        }
    }

    static async excluirFuncionario(req: Request, res: Response) {
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
    }
}
