export interface loginDTO {
  user: string;
  password: string;
}

export interface respuestaAutenticacionDTO {
  token: string;
  expiracion: Date;
}
