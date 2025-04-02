export interface DtoUbigeoEdit {
  id_ubigeo:            number;
  id_pais:              string | null;
  id_departamento:      string | null;
  id_provincia:         string | null;
  id_distrito:          string | null;
  descripcion:          string | null;
  estado:               boolean | null;
  fecha_modificacion:   Date | null;
  usuario_modificacion: number | null;
};

