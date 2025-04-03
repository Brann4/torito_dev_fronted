export interface DtoResponseEstadoConfirmacion {
  id_estado_confirmacion: number;
  descripcion: string;
  mensaje: string;
  estado: boolean;
  fecha_creacion: Date;
  fecha_modificacion: Date;
  usuario_creacion: number;
  usuario_modificacion: number;
}
