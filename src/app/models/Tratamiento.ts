export class Tratamiento {
    id: string;
    posologia:string
    fechaInicio: string;
    fechaFin:string
    horario:string
    enfermedad:string;
    medicamentos: any;
    ficha:string
    constructor(id, posologia, fechaInicio, fechaFin, horario, enfermedad, medicamentos, ficha){
      this.id = id;
      this.posologia = posologia;
      this.fechaInicio = fechaInicio;
      this.fechaFin = fechaFin;
      this.horario = horario;
      this.enfermedad = enfermedad;
      this.medicamentos = medicamentos;
      this.ficha = ficha;
    }
  }