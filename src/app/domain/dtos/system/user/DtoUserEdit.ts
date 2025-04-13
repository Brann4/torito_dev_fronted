export type DtoUserEdit = {
  id_usuario: number;
  id_tipo_documento: number;
  id_rol: number;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  numero_documento: string;
  correo_electronico: string;
  password: string;
  is_super: boolean;
  estado: boolean;
}
