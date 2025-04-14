export type JuegoEntity = {
    id_juego : number
    id_Proveedor: number
    id_monto_acumulado: number
    categoria_id: number
    nombre: string
    descripcion: string
    apuesta_minima: number
    apuesta_maxima: number
    banner: string
    usuario_creacion?: number
    usuario_modificacion?: number
    fecha_creacion?: Date
    fecha_modificacion?: Date
  };
  