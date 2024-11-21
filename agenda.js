import { DateTime } from "luxon";
import { Consulta } from './consulta.js';

export class Agenda {
    #consultas;

    constructor() {
        this.#consultas = [];
    }

    get consultas() { return this.#consultas; }

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

        return true;
    }

    removerConsulta(consulta) {
        if (!(consulta instanceof Consulta)) {
            throw new Error("Deve-se remover um objeto do tipo Consulta.");
        }
    
        const index = this.#consultas.findIndex(c => c === consulta);
    
        if (index === -1) {
            console.error("Erro: agendamento não encontrado.");
            return false;
        }
    
        this.#consultas.splice(index, 1);
        return true;
    }
    

    mostrarAgenda(dataInicial = null, dataFinal = null, filtro) {
        const hoje = DateTime.now();

        let consultasFiltradas = this.#consultas;

        if (filtro === 'P') {
            console.log(`Data inicial: ${dataInicial}`);
            console.log(`Data final: ${dataFinal}`);
            const dataInicialParsed = DateTime.fromFormat(dataInicial, 'dd/MM/yyyy');
            const dataFinalParsed = DateTime.fromFormat(dataFinal, 'dd/MM/yyyy');

            consultasFiltradas = consultasFiltradas.filter(consulta => 
                consulta.data >= dataInicialParsed && consulta.data <= dataFinalParsed
            );
        }

        consultasFiltradas.sort((a, b) => a.horaInicio - b.horaInicio);

        
        console.log("-------------------------------------------------------------------------");
        console.log("Data        H.Ini  H.Fim  Tempo  Nome                         Dt.Nasc.");
        console.log("-------------------------------------------------------------------------");

        consultasFiltradas.forEach(consulta => {
            if (!consulta.paciente) {
                console.error("Erro: Consulta sem paciente associado.", consulta);
                return; // Skip this iteration if paciente is undefined
            }
        
            // Assuming `duracao` is in milliseconds, convert to minutes first
            const duracaoEmMinutos = consulta.duracao / 60000;
        
            // Correct calculation for tempo (duration)
            const hours = Math.floor(duracaoEmMinutos / 60);
            const minutes = Math.round(duracaoEmMinutos % 60);
            const tempo = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        
            // Adjusted table alignment
            console.log(
                `${consulta.data.toFormat("dd/MM/yyyy")}  ` +
                `${consulta.horaInicio.toFormat("HH:mm")}  ` +
                `${consulta.horaFim.toFormat("HH:mm")}  ` +
                `${tempo}  ` +
                `${consulta.paciente.nome.padEnd(25)}  ` +
                `${consulta.paciente.dataNascimento.toFormat("dd/MM/yyyy")}`
            );
        });

        console.log("-------------------------------------------------------------------------");
    }

    getConsultasPorPaciente(paciente) {
        return this.#consultas.filter(consulta => consulta.paciente === paciente);
    }
}

const agendaConsultorio = new Agenda();
export default agendaConsultorio;