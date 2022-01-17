export interface baqCreacionDTO {
  idArea: number;
  nombre: string;
  _url: string;

  columnas: columnasDTO[];
}

export interface columnasDTO {
  nombreColumna: string;
  tipo: string;
  longitud: number;
  flotantes: number;
  nulos: boolean;
}

export interface baqDTO {
  idCabecera: number;
  idArea: number;
  nombreArea: string;
  nombre: string;
  _url: string;
  fecha: Date;
  estado: boolean;
}
