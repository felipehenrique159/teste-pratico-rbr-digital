import Funcionario from '../models/Funcionario'

interface FuncionarioInterface {
    nome: string;
    cargo: string;
    departamento: string;
}
export default class FuncionarioService {
    static async criarNovoFuncionario(funcionario: FuncionarioInterface) {
        const novoFuncionario = new Funcionario({
            nome: funcionario.nome,
            cargo: funcionario.cargo,
            departamento: funcionario.departamento,
        });

        return await novoFuncionario.save();
    }

    static async listarTodos() {
        return await Funcionario.find();
    }

    static async listarFuncionario(id: string) {
        return await Funcionario.findById(id);
    }

    static async atualizarFuncionario(id: string, funcionario: FuncionarioInterface) {
        return await Funcionario.findByIdAndUpdate(id, funcionario, { new: true, runValidators: true });
    }

    static async excluirFuncionario(id: string) {
        return await Funcionario.findByIdAndDelete(id);
    }
}
