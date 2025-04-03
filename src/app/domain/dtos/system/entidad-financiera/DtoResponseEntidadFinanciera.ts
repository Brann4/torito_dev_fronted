export interface DtoResponseEntidadFinanciera {
  id_entidad_financiera: number;
  nombre: string;
  iniciales: string;
  logo: any;
  estado: boolean;
  usuario_creacion: number;
  usuario_modificacion: number;
  fecha_creacion: Date;
  fecha_modificacion: Date;
}
