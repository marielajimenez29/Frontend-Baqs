export interface usuarioDTO {
  idUsuario: number;
  idRol: number;
  nombreRol: string;
  idCompania: number;
  nombreCompania: string;
  nombre: string;
  email: string;
  estado: boolean;
}

export interface usuarioCreacionDTO {
  idRol: number;
  idCompania: number;
  nombre: string;
  email: string;
  _Password: string;
  estado: boolean;
}

export interface usuarioActualizarDTO {
  idRol: number;
  idCompania: number;
  nombre: string;
  email: string;
  _Password: string;
}
