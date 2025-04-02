export type UbigeoEntity = {
  id_ubigeo: number;
  id_pais: string;
  id_departamento: string;
  id_provincia: string;
  id_distrito: string;
  descripcion: string;
  estado: boolean;
  usuario_creacion: number;
  usuario_modificacion: number;
  fecha_creacion: Date;
  fecha_modificacion: Date | null;
};
