import { DateTime } from 'luxon';


export class Paciente {
    #nome;
    #cpf;
    #dataNascimento;

    constructor(nome, cpf, dataNascimento) {

        if (!(this.validaCPF)) {
            throw new Error("CPF inválido.");
        }

        this.#nome              = nome;
        this.#cpf               = cpf;
        this.#dataNascimento    = DateTime.fromISO(dataNascimento);
    }

    get nome()           { return this.#nome;           }
    get cpf()            { return this.#cpf;            }
    get dataNascimento() { return this.#dataNascimento; }

    podeSerRemovido(agenda) {
        const consultas = agenda.getConsultasPorPaciente(this);
        return consultas.length === 0;
    }

     
}