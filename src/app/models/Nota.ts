export class Nota {
    id: string;
    fecha:string;
    datos: string;
    ficha:string;
    constructor(id, fecha, datos, ficha){
      this.id = id;
      this.fecha = fecha;
      this.datos = datos;
      this.ficha = ficha;
    }
  }