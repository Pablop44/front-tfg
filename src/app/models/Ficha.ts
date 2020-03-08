export class Ficha {
    id: number;
    fechaCreacion: string;
    pacienteDni: string;
    nombrePaciente: string;
    dniMedico: string;
    nombreMedico: string;
    colegiado: string;
    enfermedad: string
    constructor(id, fechaCreacion,pacienteDni, nombrePaciente, dniMedico, nombreMedico, colegiado, enfermedad){
      this.id = id;
      this.fechaCreacion = fechaCreacion;
      this.pacienteDni = pacienteDni;
      this.nombrePaciente = nombrePaciente;
      this.dniMedico = dniMedico;
      this.nombreMedico = nombreMedico;
      this.colegiado = colegiado;
      this.enfermedad = enfermedad;
    } 
  }