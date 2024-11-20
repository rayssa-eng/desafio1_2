const { DateTime, Duration } = require('luxon');

export class Consulta {
    data;
    horaInicio;
    horaFim;
    duracao;
    #paciente;

    constructor(data, horaFim, duracao, horaInicio, paciente) {
        if (!(paciente instanceof Paciente)) {
            throw new Error("deve-se adicionar um objeto do tipo Paciente.");
        }
        
        this.data = DateTime.fromISO(data);
        this.horaInicio = DateTime.fromISO(`${data}T${horaInicio}`);
        this.horaFim = DateTime.fromISO(`${data}T${horaFim}`);
        this.duracao = this.horaFim.diff(this.horaInicio, 'minutes');
        this.#paciente = paciente;

        if (this.duracao <= 0) {
            throw new Error("Hora de término deve ser posterior à hora de início.");
        }
    }
}