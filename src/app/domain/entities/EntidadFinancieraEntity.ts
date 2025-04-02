export type EntidadFinancieraEntity = {
  id_entidad_financiera: number;
  nombre: string;
  iniciales: string;
  logo: string;
  estado: boolean;
  fecha_creacion: Date;
  fecha_modificacion: Date;
  usuario_creacion: number;
  usuario_modificacion: number;
};
