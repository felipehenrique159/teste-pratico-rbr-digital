import Funcionario from '../models/Funcionario'

interface FuncionarioInterface {
    nome: string;
    cargo: string;
    departamento: string;
}

export default class FuncionarioService {
    static async criarNovoFuncionario(funcionario: FuncionarioInterface) {
        try {
            const novoFuncionario = new Funcionario({
                nome: funcionario.nome,
                cargo: funcionario.cargo,
                departamento: funcionario.departamento,
            });

            return await novoFuncionario.save();

        } catch (error) {
            console.error('Erro ao criar o funcionário:', error);
        }
    }

    static async listarTodos() {
        try {
            return await Funcionario.find();
        } catch (error) {
            console.error('Erro ao listar funcionários:', error);
        }
    }
}
