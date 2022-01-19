export interface tareaCreacionDTO {
  idCabecera: number;
  filtro: string;
  nombre: string;
  descripcion: string;
  fecha: Date;
  hora: string;
  intervalo: number;
}

export interface tareaDTO {
  idTarea: number;
  idCabecera: number;
  nombreBAQ: string;
  filtro: string;
  nombre: string;
  descripcion: string;
  fecha: Date;
  hora: string;
  intervalo: number;
  ultima_ejecucion: Date;
  ejecucion: string;
  estado: boolean;
}

export interface tareaEditarDTO {
  idTarea: number;
  idCabecera: number;
  nombre: string;
  filtro: string;
  descripcion: string;
  fecha: Date;
  hora: string;
  intervalo: number;
}
