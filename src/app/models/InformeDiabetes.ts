export class InformeDiabetes {
    id: number;
    fecha: String;
    numeroControles: number;
    nivelBajo: String;
    frecuenciaBajo: String;
    horarioBajo: String;
    perdidaConocimiento: String;
    nivelAlto: String;
    frecuenciaAlto: String;
    horarioAlto: String;
    actividadFisica: String;
    problemaDieta: String;
    estadoGeneral: String;
    momentos: any[];
    constructor(id, fecha, numeroControles, nivelBajo, frecuenciaBajo, horarioBajo, perdidaConocimiento, nivelAlto, frecuenciaAlto,
         horarioAlto, actividadFisica, problemaDieta, estadoGeneral, momentos){
      this.id = id;
      this.fecha = fecha;
      this.numeroControles = numeroControles;
      this.nivelBajo = nivelBajo;
      this.frecuenciaBajo = frecuenciaBajo;
      this.horarioBajo = frecuenciaBajo;
      this.perdidaConocimiento = perdidaConocimiento;
      this.nivelAlto = nivelAlto;
      this.frecuenciaAlto = frecuenciaAlto;
      this.horarioAlto = horarioAlto;
      this.actividadFisica = actividadFisica;
      this.problemaDieta = problemaDieta;
      this.estadoGeneral = estadoGeneral;
      this.momentos = momentos;
    }
  }