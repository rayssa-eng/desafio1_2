import { DateTime } from 'luxon';


export class Paciente {
    #nome;
    #cpf;
    #dataNascimento;

    constructor(nome, cpf, dataNascimento) {
        // if (cpf nao valido) throw new error 
        // if (nome.length > 0) throw new Error
        if (!nome || nome.length < 5) {
            throw new Error("Nome deve ter pelo menos 5 caracteres.");
        }

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

    validaCPF(cpf) {
        // Remove non-numeric characters
        cpf = cpf.replace(/\D/g, "");
    
        // Ensure the CPF has 11 digits
        if (cpf.length !== 11) {
            return false;
        }
    
        // Check for invalid known CPFs (all digits are the same)
        if (/^(\d)\1{10}$/.test(cpf)) {
            return false;
        }
    
        // Extract individual digits
        const num = cpf.split("").map(Number);
    
        // Calculate the first check digit
        const soma1 = num[0] * 10 + num[1] * 9 + num[2] * 8 + num[3] * 7 + num[4] * 6 +
                      num[5] * 5 + num[6] * 4 + num[7] * 3 + num[8] * 2;
        let resto1 = (soma1 * 10) % 11;
        if (resto1 === 10) resto1 = 0;
    
        // Verify the first check digit
        if (resto1 !== num[9]) {
            return false;
        }
    
        // Calculate the second check digit
        const soma2 = num[0] * 11 + num[1] * 10 + num[2] * 9 + num[3] * 8 + num[4] * 7 +
                      num[5] * 6 + num[6] * 5 + num[7] * 4 + num[8] * 3 + num[9] * 2;
        let resto2 = (soma2 * 10) % 11;
        if (resto2 === 10) resto2 = 0;
    
        // Verify the second check digit
        if (resto2 !== num[10]) {
            return false;
        }
    
        return true;
    }    
}