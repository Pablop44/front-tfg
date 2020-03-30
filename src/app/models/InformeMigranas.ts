export class InformeMigranas{
    id: number;
    fecha: String;
    frecuencia: number;
    duracion: String;
    horario: String;
    finalizacion: String;
    tipoEpisodio: String;
    intensidad: String;
    limitaciones: String;
    despiertoNoche: String;
    estadoGeneral: String;
    sintomas: any[];
    factores: any[];
    constructor(id, fecha, frecuencia, duracion, horario, finalizacion, tipoEpisodio, intensidad, limitaciones,
        despiertoNoche, estadoGeneral, sintomas, factores){
      this.id = id;
      this.fecha = fecha;
      this.frecuencia = frecuencia;
      this.duracion = duracion;
      this.horario = horario;
      this.finalizacion = finalizacion;
      this.tipoEpisodio = tipoEpisodio;
      this.intensidad = intensidad;
      this.limitaciones = limitaciones;
      this.despiertoNoche = despiertoNoche;
      this.estadoGeneral = estadoGeneral;
      this.sintomas = sintomas;
      this.factores = factores;
    }
  }