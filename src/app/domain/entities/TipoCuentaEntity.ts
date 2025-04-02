export type TipoCuentaEntity = {
  id_tipo_cuenta: number;
  descripcion: string | null;
  estado: boolean;
  usuario_creacion: number;
  usuario_modificacion: number;
  fecha_creacion: Date;
  fecha_modificacion: Date;
};
