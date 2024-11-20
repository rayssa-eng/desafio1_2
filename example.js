const { DateTime, Duration } = require('luxon');

// Class to manage patient records
class Paciente {
    constructor(nome, cpf, dataNascimento) {
        this.nome = nome;
        this.cpf = cpf;
        this.dataNascimento = DateTime.fromISO(dataNascimento); // ISO format for date input
    }
}

class Cadastro {
    #pacientes;

    constructor() {
        this.#pacientes = [];
    }

    addPaciente(paciente) {
        if (!(paciente instanceof Paciente)) {
            throw new Error("Deve-se adicionar um objeto do tipo Paciente.");
        }
        
        const exists = this.#pacientes.some(p => p.cpf === paciente.cpf);
        if (!exists) {
            this.#pacientes.push(paciente);
        } else {
            console.log("Paciente com este CPF já cadastrado.");
        }
    }

    removePaciente(cpf) {
        this.#pacientes = this.#pacientes.filter(p => p.cpf !== cpf);
    }

    mostrarLista(ordenarPor = 'nome') {
        const sorted = [...this.#pacientes].sort((a, b) => {
            if (ordenarPor === 'nome') return a.nome.localeCompare(b.nome);
            if (ordenarPor === 'cpf') return a.cpf.localeCompare(b.cpf);
        });

        sorted.forEach(p => {
            console.log(`Nome: ${p.nome}, CPF: ${p.cpf}, Data de Nascimento: ${p.dataNascimento.toFormat("dd/MM/yyyy")}`);
        });
    }
}

class Consulta {
    constructor(data, horaInicio, horaFim, paciente) {
        this.data = DateTime.fromISO(data); 
        this.horaInicio = DateTime.fromISO(`${data}T${horaInicio}`);
        this.horaFim = DateTime.fromISO(`${data}T${horaFim}`);
        this.duracao = this.horaFim.diff(this.horaInicio, 'minutes').toObject().minutes;
        this.paciente = paciente;

        if (this.duracao <= 0) {
            throw new Error("Hora de término deve ser posterior à hora de início.");
        }
    }
}

class Agenda {
    #consultas;

    constructor() {
        this.#consultas = [];
    }

    agendarConsulta(consulta) {
        if (!(consulta instanceof Consulta)) {
            throw new Error("Deve-se agendar um objeto do tipo Consulta.");
        }

        const conflito = this.#consultas.some(c => 
            c.data.hasSame(consulta.data, 'day') &&
            ((consulta.horaInicio >= c.horaInicio && consulta.horaInicio < c.horaFim) || 
            (consulta.horaFim > c.horaInicio && consulta.horaFim <= c.horaFim))
        );

        if (!conflito) {
            this.#consultas.push(consulta);
            console.log(`Consulta agendada para ${consulta.paciente.nome} em ${consulta.horaInicio.toFormat("dd/MM/yyyy HH:mm")}.`);
        } else {
            console.log("Conflito de horário! Consulta não pode ser agendada.");
        }
    }

    mostrarAgenda() {
        this.#consultas.sort((a, b) => a.horaInicio - b.horaInicio).forEach(consulta => {
            console.log(`Paciente: ${consulta.paciente.nome}, Data: ${consulta.data.toFormat("dd/MM/yyyy")}, Início: ${consulta.horaInicio.toFormat("HH:mm")}, Fim: ${consulta.horaFim.toFormat("HH:mm")}`);
        });
    }
}

// Exemplo de uso
const cadastro = new Cadastro();
cadastro.addPaciente(new Paciente("Ana Silva", "12345678900", "1985-02-20"));
cadastro.addPaciente(new Paciente("Bruno Costa", "09876543211", "1990-06-15"));
cadastro.addPaciente(new Paciente("Carla Dias", "11122233344", "1992-08-30"));

console.log("\nLista de Pacientes Ordenada por Nome:");
cadastro.mostrarLista('nome');

console.log("\nLista de Pacientes Ordenada por CPF:");
cadastro.mostrarLista('cpf');

const agenda = new Agenda();

const consulta1 = new Consulta("2024-12-01", "10:00", "10:30", cadastro.#pacientes[0]);
const consulta2 = new Consulta("2024-12-01", "10:30", "11:00", cadastro.#pacientes[1]);
const consulta3 = new Consulta("2024-12-01", "11:00", "11:30", cadastro.#pacientes[2]);

agenda.agendarConsulta(consulta1);
agenda.agendarConsulta(consulta2);
agenda.agendarConsulta(consulta3);

console.log("\nAgenda de Consultas:");
agenda.mostrarAgenda();
