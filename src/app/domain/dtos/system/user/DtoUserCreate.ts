export interface DtoUserCreate {
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  id_tipo_documento: number;
  numero_documento: string;
  correo_electronico: string;
  password: string;
  id_rol: number;
  is_super: boolean;
  estado: boolean;
}
