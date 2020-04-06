export class Consulta {
    id: number;
    lugar: string;
    motivo: string;
    fecha: string;
    diagnostico: string;
    observaciones:string;
    medico:string;
    paciente:string;
    ficha:string;
    estado: string;
    constructor(id, lugar, motivo, fecha, diagnostico, observaciones, medico, paciente, ficha, estado){
      this.id = id;
      this.lugar = lugar;
      this.motivo = motivo;
      this.fecha = fecha;
      this.diagnostico = diagnostico;
      this.observaciones = observaciones;
      this.medico = medico;
      this.paciente = paciente;
      this.ficha = ficha;
      this.estado = estado
    } 
  }