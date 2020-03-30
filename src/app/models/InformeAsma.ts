export class InformeAsma {
    id: number;
    fecha: String;
    calidadSueno: String;
    dificultadRespirar: String;
    tos: String;
    horarioBajo: String;
    gravedadTos: String;
    limitaciones: String;
    silbidos: String;
    usoMedicacion: String;
    espirometria: String;
    factoresCrisis: String;
    estadoGeneral: String;
    constructor(id, fecha, calidadSueno, dificultadRespirar, tos, gravedadTos, limitaciones, silbidos,
        usoMedicacion, espirometria, factoresCrisis, estadoGeneral){
      this.id = id;
      this.fecha = fecha;
      this.calidadSueno = calidadSueno;
      this.dificultadRespirar = dificultadRespirar;
      this.tos = tos;
      this.gravedadTos = gravedadTos;
      this.limitaciones = limitaciones;
      this.silbidos = silbidos;
      this.usoMedicacion = usoMedicacion;
      this.espirometria = espirometria;
      this.factoresCrisis = factoresCrisis;
      this.estadoGeneral = estadoGeneral;
    }
  }