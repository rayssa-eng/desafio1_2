import { DateTime } from "luxon";

export class Agenda {
    #consultas;

    constructor() {
        this.#consultas = [];
    }

    adicionarConsulta(consulta) {
        if (!(consulta instanceof Consulta)) {
            throw new Error("Deve-se agendar um objeto do tipo Consulta.")
        }

        const conflito = this.#consultas.some(c => 
            c.data.hasSame(consulta.data, 'day') && 
            ((consulta.horaInicio >= c.horaInicio && consulta.horaInicio < c.horaFim) 
            || (consulta.horaFim > c.horaInicio && consulta.horaFim <= c.horaFim))
        );

        if (conflito) {
            return false;
        }

        this.#consultas.push(consulta);
    }

    mostrarAgenda(dataInicial = null, dataFinal = null) {
        const hoje = DateTime.now();

        const tipo = prompt("Apresentar a agenda T-Toda ou P-Periodo: ");

        let consultasFiltradas = this.#consultas;

        if (tipo === 'P') {
            const dataInicialParsed = DateTime.fromFormat(dataInicial, 'dd/MM/yyyy');
            const dataFinalParsed = DateTime.fromFormat(dataFinal, 'dd/MM/yyyy');

            consultasFiltradas = consultasFiltradas.filter(consulta => 
                consulta.data >= dataInicialParsed && consulta.data <= dataFinalParsed
            );
        }

        consultasFiltradas.sort((a, b) => a.horaInicio - b.horaInicio);

        console.log(`Data inicial: ${dataInicial}`);
        console.log(`Data final: ${dataFinal}`);
        console.log("-------------------------------------------------------------");
        console.log("Data        H.Ini  H.Fim  Tempo  Nome                          Dt.Nasc.");
        console.log("-------------------------------------------------------------");

        consultasFiltradas.forEach(consulta => {
            const tempo = DateTime.fromMillis(consulta.duracao * 60000).toFormat("hh:mm"); // Convert duration to hh:mm format
            console.log(`${consulta.data.toFormat("dd/MM/yyyy")}  ${consulta.horaInicio.toFormat("HH:mm")} ${consulta.horaFim.toFormat("HH:mm")} ${tempo} ${consulta.paciente.nome.padEnd(30)} ${consulta.paciente.dataNascimento.toFormat("dd/MM/yyyy")}`);
        });

        console.log("-------------------------------------------------------------");
    }
}