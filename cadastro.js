class Cadastro {
    #pacientes;

    constructor(pacientes = []) {
        this.#pacientes = pacientes;
    }

    cadastrarPaciente(paciente) {
        // paciente = new Paciente(nome, cpf, dataNascimento);

        if (!(paciente instanceof Paciente)) {
            throw new Error("deve-se adicionar um objeto do tipo Paciente.");
        }

        this.#pacientes.push(paciente);

        // verificar essa condicao
        if (!(this.#pacientes.includes(paciente))) {
            this.#pacientes.push(paciente);
            return true;
        } else {
            return false;
        }
    }

    removerPaciente(cpf) {
        // if paciente has consulta agendada return false
        this.#pacientes = this.#pacientes.filter(paciente => paciente.cpf !== cpf);
    }

    listarPacientes(modoOrdenacao) {
        const sorted = [...this.#pacientes].sort((a, b) => {
            if (modoOrdenacao === 3) return a.nome.localeCompare(b.nome);
            if (modoOrdenacao === 4) return a.cpf.localeCompare(b.cpf);
        });

        return sorted;
    }











}