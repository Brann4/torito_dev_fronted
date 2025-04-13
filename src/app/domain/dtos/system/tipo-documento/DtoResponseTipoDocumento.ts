
export interface DtoResponseTipoDocumento {
  id_tipo_documento: number;
  descripcion: string;
  estado: boolean;
  fecha_creacion: Date;
  fecha_modificacion: Date;
  usuario_creacion: number;
  usuario_modificacion: number;
}
