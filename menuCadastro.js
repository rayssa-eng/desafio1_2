import promptSync from 'prompt-sync';
const prompt = promptSync({ sigint: true });

import  menuPrincipal  from "./menuPrincipal.js";
import { Cadastro } from "./cadastro.js";
import { DateTime } from 'luxon';

const cadastroClinica = new Cadastro();


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
                break;
            case 2:
                this.excluirCadastro();
                break;
            case 3:
                cadastroClinica.listarPacientes(opcao);
                break;// Add as many cases as needed
            case 4:
                cadastroClinica.listarPacientes(opcao);
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
        const novoCPF         = prompt("CPF: ");
        const novoNome        = prompt("Nome: ");
        const dataNascimento  = prompt("Data de nascimento (formato: DD/MM/YYYY): ");

        const novaDataNascimento = DateTime.fromFormat(dataNascimento, 'dd/MM/yyyy');

        const hoje = DateTime.now();
        const idade = hoje.diff(novaDataNascimento, 'years').years;

        if (idade < 13) {
            console.error('Erro: paciente deve ter pelo menos 13 anos.')
        } else if (!novaDataNascimento.isValid) {
            console.log('Data de nascimento inválida!');
            return;
        } 

        novoPaciente   = new Paciente(novoNome, novoCPF, novaDataNascimento);

        const novoCadastro = cadastroClinica.adicionarPaciente(novoPaciente);

        if (!novoCadastro) {
            console.error('Erro: CPF já cadastrado');
        }

        console.log('Paciente cadastrado com sucesso!');
    }

    excluirCadastro() {
        const exCPF  = prompt("CPF: ");

        cadastroClinica.removerPaciente(exCPF);
    }

    start() {
        const opcao = this.mostrarMenu();
        this.handleOpcaoUsuario(opcao);
    }
}

const menuCadastro = new MenuCadastro();
export default menuCadastro;