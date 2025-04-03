export interface DtoResponseTipoCuenta {
  id_tipo_cuenta: number;
  descripcion: string;
  estado: boolean;
  fecha_creacion: Date;
  fecha_modificacion: Date;
  usuario_creacion: number;
  usuario_modificacion: number;
}
