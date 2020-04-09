export class Tratamiento {
    id: string;
    posologia:string
    fechaInicio: string;
    fechaFin:string
    horario:string
    enfermedad:string;
    medicamentos: any
    constructor(id, posologia, fechaInicio, fechaFin, horario, enfermedad, medicamentos){
      this.id = id;
      this.posologia = posologia;
      this.fechaInicio = fechaInicio;
      this.fechaFin = fechaFin;
      this.horario = horario;
      this.enfermedad = enfermedad;
      this.medicamentos = medicamentos;
    }
  }