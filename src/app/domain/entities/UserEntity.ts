export type UserEntity = {
  id_usuario: number;
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
  usuario_creacion?: number;
  usuario_modificacion?: number;
  fecha_creacion?: Date ;
  fecha_modificacion?: Date ;
};
