export class MenuAgenda {
    showMenu() {
        console.log('Agenda');
        console.log('1-Agendar consulta');
        console.log('2-Cancelar agendamento');
        console.log('3-Listar agenda');
        console.log('4-Voltar p/ menu principal');

        const opcao = parseInt(prompt(""), 10);

        return opcao;
    }

    handleOpcaoUsuario(opcao) {
        if (opcao === 1) {
            this.novaConsulta();
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

    novaConsulta() {

    }
}