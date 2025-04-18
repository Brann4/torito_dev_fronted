export interface DtoUbigeoCreate {
    id_pais:                string;
    id_departamento:        string;
    id_provincia:           string;
    id_distrito:            string;
    descripcion:            string;
    codigo_telefonico:      string;
    bandera:                string;
    estado:                 boolean;
    usuario_creacion:       number | null;
    fecha_creacion:         Date | null;
}

