import { DateTime } from 'luxon';
import promptSync from 'prompt-sync';
const prompt = promptSync({ sigint: true });

import  menuPrincipal  from "./menuPrincipal.js";
import agendaConsultorio from "./agenda.js";
import cadastroConsultorio from "./cadastro.js";

import { Paciente } from "./paciente.js";





export class MenuCadastro {


    mostrarMenu() {
        console.log('Menu do Cadastro de Pacientes');
        console.log('1-Cadastrar novo paciente');
        console.log('2-Excluir paciente');
        console.log('3-Listar pacientes (ordenado por CPF)');
        console.log('4-Listar pacientes (ordenado por nome)');
        console.log('5-Voltar p/ menu principal');

        const opcao = parseInt(prompt(""), 10);

        console.log('--------------------------------------------------------------');

        return opcao;
    }

    handleOpcaoUsuario(opcao) {
        switch (opcao) {
            case 1:
                this.novoCadastro();
                this.start();
                break;
            case 2:
                this.excluirCadastro();
                this.start();
                break;
            case 3:
                this.mostrarListaPacientes(cadastroConsultorio, agendaConsultorio, opcao);
                this.start();
                break;
            case 4:
                this.mostrarListaPacientes(cadastroConsultorio, agendaConsultorio, opcao);
                this.start();
                break;
            case 5:
                menuPrincipal.start();
                break;
            default:
                console.log('Opção inválida.');
                menuPrincipal.start();
        }
    }

    novoCadastro() {
        const novoCPF = prompt("CPF: ");

        if (!(this.validaCPF(novoCPF))) {
            console.error("CPF inválido.");
            this.start();
        }
        
        if (cadastroConsultorio.getPacientePorCPF(novoCPF)) {
            console.error('Erro: CPF já cadastrado');
            console.log('--------------------------------------------------------------');
            this.start();
        }

        const novoNome        = prompt("Nome: ");

        if (!novoNome || novoNome.length < 5) {
            console.error("Nome deve ter pelo menos 5 caracteres.");
            this.start();
        }

        const dataNascimento  = prompt("Data de nascimento (formato: DD/MM/YYYY): ");

        const novaDataNascimento = DateTime.fromFormat(dataNascimento, 'dd/MM/yyyy');

        const hoje = DateTime.now();
        const idade = hoje.diff(novaDataNascimento, 'years').years;

        if (idade < 13) {
            console.error('Erro: paciente deve ter pelo menos 13 anos.');
            console.log('--------------------------------------------------------------');

            this.start();
        } else if (!novaDataNascimento.isValid) {
            console.error('Data de nascimento inválida!');
            console.log('--------------------------------------------------------------');

            this.start();
        } 

        try {
            const novoPaciente = new Paciente(novoNome, novoCPF, novaDataNascimento);
        } catch (e) {
            console.error(e.message);
            this.start();
        }

        const novoCadastro = cadastroConsultorio.adicionarPaciente(novoPaciente);

        if (!novoCadastro) {
            console.error('Erro ao cadastrar novo paciente');
            console.log('--------------------------------------------------------------');
            this.start();
        }
        console.log('Paciente cadastrado com sucesso!');
        console.log('--------------------------------------------------------------');
    }

    mostrarListaPacientes(cadastroConsultorio, agenda, ordenacao) {
        let listaOrdenada = cadastroConsultorio.listarPacientes(ordenacao);

        let stringLista = '';
        const linhaSeparadora = "----------------------------------------------------------------------";
    
        stringLista += `${linhaSeparadora}\n`;
        stringLista += `CPF                   Nome                           Dt.Nasc. Idade\n`;
        stringLista += `${linhaSeparadora}\n`;
    
        listaOrdenada.forEach((paciente) => {
            const idade = DateTime.now().diff(paciente.dataNascimento, 'years').years.toFixed(0);
    
            stringLista += `${paciente.cpf.padEnd(20)} ${paciente.nome.padEnd(30)} ${paciente.dataNascimento.toFormat('dd/MM/yyyy')} ${idade}\n`;
    
            const consultas = agenda.getConsultasPorPaciente(paciente);
            if (consultas.length > 0) {
                consultas.forEach(consulta => {
                    stringLista += `Agendado para: ${consulta.data.toFormat('dd/MM/yyyy')}\n`;
                    stringLista += `${consulta.horaInicio.toFormat('HH:mm')} às ${consulta.horaFim.toFormat('HH:mm')}\n`;
                });
            }
        });
    
        stringLista += `${linhaSeparadora}\n`;
        console.log(stringLista);
        return stringLista;
    }

    excluirCadastro() {
        const exCPF       = prompt("CPF: ");
        const exPaciente  = getPacientePorCPF(exCPF);

        remocao = cadastroConsultorio.removerPaciente(exPaciente);

        if (!remocao) {
            console.error('Erro: paciente não cadastrado');
            console.log('--------------------------------------------------------------');
            this.start();
        }
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

    start() {
        const opcao = this.mostrarMenu();
        this.handleOpcaoUsuario(opcao);
    }
}

const menuCadastro = new MenuCadastro();
export default menuCadastro;
