import { menuPrincipal } from "./menuPrincipal.js";
import { Cadastro } from "./cadastro.js";


export class MenuCadastro {
    mostrarMenu() {
        console.log('Menu do Cadastro de Pacientes');
        console.log('1-Cadastrar novo paciente');
        console.log('2-Excluir paciente');
        console.log('3-Listar pacientes (ordenado por CPF)');
        console.log('4-Listar pacientes (ordenado por nome)');
        console.log('5-Voltar p/ menu principal');

        const opcao = parseFloat(prompt(""));

        return opcao;
    }

    handleOpcaoUsuario(opcao) {
        if (opcao === 1) {
            this.novoCadastro();
        } else if (opcao === 2) {
            
        } else if (opcao === 3) {

        } else {
            console.log('Opção inválida.');
            menuPrincipal.showMenu();
        }
    }

    novoCadastro() {
        const novoCPF  = prompt("CPF: ");
        const novoNome = prompt("Nome: ");
        const novoDoB  = prompt("Data de nascimento: ");

        novoPaciente   = new Paciente(novoNome, novoCPF, novoDoB);

        Cadastro.adicionarPaciente(novoPaciente);
    }

    excluirCadastro() {
        const exCPF  = prompt("CPF: ");

        Cadastro.removerPaciente(exCPF);
    }
}