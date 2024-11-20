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

    removerPaciente(cpf) {
        // if paciente has consulta agendada return false
        // if paciente not in this.pacientes return false
        // else return true

        this.#pacientes = this.#pacientes.filter(paciente => paciente.cpf !== cpf);
    }

    listarPacientes(modoOrdenacao) {
        const sorted = [...this.#pacientes].sort((a, b) => {
            if (modoOrdenacao === 3) return a.nome.localeCompare(b.nome);
            if (modoOrdenacao === 4) return a.cpf.localeCompare(b.cpf);
        });

        return sorted;
    }

    encontrarPacientePorCPF(cpf) {
        return this.#pacientes.find(p => p.cpf === cpf);
    }
}