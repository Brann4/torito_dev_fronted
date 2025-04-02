
export interface DtoResponseUbigeo {
    id_ubigeo: number;
    id_pais: string;
    id_departamento: string;
    id_provincia: string;
    id_distrito: string;
    descripcion: string;
    estado: boolean;
    fecha_creacion: Date;
    fecha_modificacion: Date | null;
    usuario_creacion: number;
    usuario_modificacion: number | null;
  }
