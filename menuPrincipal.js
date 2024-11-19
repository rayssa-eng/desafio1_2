const prompt = require('prompt-sync')({ sigint: true });
import { MenuCadastro } from "./menuCadastro.js";
import { MenuAgenda } from "./menuAgenda.js";


export class MenuPrincipal {
    mostrarMenu() {
        console.log('Menu Principal');
        console.log('1-Cadastro de pacientes');
        console.log('2-Agenda');
        console.log('3-Fim');

        const opcao = parseInt(prompt(""), 10);

        return opcao;
    }

    handleOpcaoUsuario(opcao) {
        if (opcao === 1) {
            const menuCadastro = new MenuCadastro();
            menuCadastro.showMenu()
        } else if (opcao === 2) {
            const menuAgenda = new MenuAgenda();
            menuAgenda.showMenu();
        } else if (opcao === 3) {
            console.log("Encerrando programa...");
            process.exit(0);
        } else {
            console.log('Opção inválida.');
            this.start();
        }
    }

    start() {
        const opcao = this.showMenu();
        this.handleUserChoice(opcao);
    }
}

const menuPrincipal = new MenuPrincipal();
menuPrincipal.start();