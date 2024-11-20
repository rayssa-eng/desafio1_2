import promptSync from 'prompt-sync';
const prompt = promptSync({ sigint: true });

import menuPrincipal     from "./menuPrincipal.js";
import agendaConsultorio from "./agenda.js";
import Consulta          from "./consulta.js";


export class MenuAgenda {
    mostrarMenu() {
        console.log('Agenda');
        console.log('1-Agendar consulta');
        console.log('2-Cancelar agendamento');
        console.log('3-Listar agenda');
        console.log('4-Voltar p/ menu principal');

        const opcao = parseInt(prompt(""), 10);

        console.log('--------------------------------------------------------------');

        return opcao;
    }

    handleOpcaoUsuario(opcao) {
        switch (opcao) {
            case 1:
                this.novaConsulta();
                break;
            case 2:
                menuAgenda.mostrarMenu();
                break;
            case 3:
                console.log("Listando agenda");
                break;
            case 4:
                menuPrincipal.start();
                break;
            default:
                console.log('Opção inválida.');
                this.start();
        }
    }

    novaConsulta() {
        const pacienteCPF  = prompt("CPF: ");

        const paciente = cadastro.findPacienteByCPF(pacienteCPF);

        if (!paciente) {
            console.error("Erro: paciente não cadastrado");

            // reiniciar menu da agenda
            this.start();
        }

        const dataConsulta = prompt("Data da consulta: ");
        const horaInicio   = prompt("Hora inicial: ");
        const horaFim      = prompt("Hora final: ");
        
        const consulta = new Consulta(
            dataConsulta,
            horaInicio,
            horaFim,
            paciente
        );

        if (agendaConsultorio.agendarConsulta(consulta)) {
            console.log("Agendamento realizado com sucesso!");
        } else {
            console.error("Erro: já existe uma consulta agendada nesse horário");
            this.start();
        }
    }

    start() {
        const opcao = this.mostrarMenu();
        this.handleOpcaoUsuario(opcao);
    }
}

const menuAgenda = new MenuAgenda();
export default menuAgenda;
