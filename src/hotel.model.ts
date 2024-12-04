export type TipoHabitacion = "standard" | "suite" | "tour";

export interface Reserva {
  tipoHabitacion: TipoHabitacion;
  pax: number;
  noches: number;
  desayuno:boolean
}

export interface PrecioReserva {
  precio: number;
}

export const reservas: Reserva[] = [
  {
    tipoHabitacion: "standard",
    pax: 1,
    noches: 3,
    desayuno:false
  },
  {
    tipoHabitacion: "standard",
    pax: 1,
    noches: 4,
    desayuno:false
  },
  {
    tipoHabitacion: "suite",
    pax: 2,
    noches: 1,
    desayuno:true
  },
];
