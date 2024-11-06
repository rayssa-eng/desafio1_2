class Paciente {
    #nome;
    #cpf;
    #dataNascimento;


    constructor(nome, cpf, dataNascimento) {
        // if (cpf nao valido) throw new error 
        // if (nome.length > 0) throw new Error
        this.#nome           = nome;
        this.#cpf            = cpf;
        this.#dataNascimento = dataNascimento;
    }

    get nome()           { return this.#nome;          }
    get cpf()            { return this.#cpf;           }
    get dataNascimento() { return this.#dataNascimento }


}