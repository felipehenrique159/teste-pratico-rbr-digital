import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
    nome: { type: String, required: true },
    cargo: { type: String, required: true },
    departamento: { type: String, required: true }
});

const Funcionario = mongoose.model('Funcionario', schema);

export default Funcionario;
