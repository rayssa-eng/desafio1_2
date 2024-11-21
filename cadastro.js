import { Paciente } from './paciente.js';

export class Cadastro {
    #pacientes;

    constructor(pacientes = []) {
        this.#pacientes = pacientes;
    }

    adicionarPaciente(paciente) {
        if (!(paciente instanceof Paciente)) {
            throw new Error("deve-se adicionar um objeto do tipo Paciente.");
        }

        if (!(this.#pacientes.includes(paciente))) {
            this.#pacientes.push(paciente);
            return true;
        } else {
            return false;
        }
    }

    removerPaciente(paciente) {
        // if paciente has consulta agendada return false
        // if paciente not in this.pacientes return false
        // else return true
        if (!(paciente instanceof Paciente)) {
            throw new Error("Deve-se remover um objeto do tipo Paciente.");
        }

        if (!paciente.podeSerRemovido(agendaConsultorio)) {
            console.error("Erro: paciente está agendado.");
        }

        const index = this.#pacientes.indexOf(paciente);
        if (index !== -1) {
            this.#pacientes.splice(index, 1);
            return true;
        }

        return false;

    }

    listarPacientes(modoOrdenacao) {
        const sorted = [...this.#pacientes].sort((a, b) => {
            if (modoOrdenacao === 3) return a.cpf.localeCompare(b.cpf);
            if (modoOrdenacao === 4) return a.nome.localeCompare(b.nome);
        });

        return sorted;
    }

    getPacientePorCPF(cpf) {
        return this.#pacientes.find(p => p.cpf === cpf);
    }
}
const cadastroConsultorio = new Cadastro();
export default cadastroConsultorio;