export interface DtoUbigeoEdit {
  id_ubigeo:            number;
  id_pais:                string;
  id_departamento:        string;
  id_provincia:           string;
  id_distrito:            string;
  descripcion:            string;
  codigo_telefonico:      string;
  bandera:                string;
  estado:                 boolean;
  fecha_modificacion:     Date | null;
  usuario_modificacion:   number;
};

