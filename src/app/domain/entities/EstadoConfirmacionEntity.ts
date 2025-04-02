export type EstadoConfirmacionEntity = {
  id_estado_confirmacion: number;
  descripcion: string;
  mensaje: string | null;
  estado: boolean;
  fecha_creacion: Date;
  fecha_modificacion: Date;
  usuario_creacion: number;
  usuario_modificacion: number;
};
