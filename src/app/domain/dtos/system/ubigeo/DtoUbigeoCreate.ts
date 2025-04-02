export interface DtoUbigeoCreate {
    id_pais:              string;
    id_departamento:      string;
    id_provincia:         string;
    id_distrito:          string;
    descripcion:          string;
    estado:               boolean | null;
    fecha_creacion:       Date | null;
    usuario_creacion:     number | null;
}

