import { Reserva, reservas } from "./hotel.model";
import { redondear } from "./hotel.helper";

class Reservas {
  private reservas: Reserva[];
  private readonly precioPaxExtra: number = 40;
  private readonly iva: number = 21;
  private _extra: number = 0;
  private readonly desayuno: number = 15;

  constructor(reservas: Reserva[]) {
    this.reservas = reservas;
  }

  numPaxExtra(pax: number): number {
    return pax > 1 ? pax - 1 : 0;
  }
  incluirDesayuno(desayuno:boolean):number{
      return desayuno ? this.desayuno : 0; 
  }

  subtotal(precios: { [x: string]: number }): number {
    return this.reservas.reduce((subtotal, reserva) => {
      const precioPorNoche =
        precios[reserva.tipoHabitacion]
         + this.numPaxExtra(reserva.pax) * this.precioPaxExtra;
        this._extra += this.incluirDesayuno(reserva.desayuno)*reserva.pax;            
         return subtotal + precioPorNoche * reserva.noches;
    }, 0);
  }

  total(subtotal: number, descuento: number): number {
    const conDescuento = subtotal * (1 - descuento / 100);
    console.log(this._extra);
    return conDescuento * (1 + this.iva / 100) + this._extra;
  }
}

export class ReservasCliente extends Reservas {
  private readonly descuento: number = 0;
  private readonly precios = {
    standard: 100,
    suite: 150,
  };

  constructor(reservas: Reserva[]) {
    super(reservas);
  }

  calcularPrecio(): { subtotal: number; total: number } {
    const subtotal = redondear(super.subtotal(this.precios));
    const total = redondear(super.total(subtotal, this.descuento));
    return { subtotal, total };
  }
}

export class ReservasTourOperador extends Reservas {
  private readonly descuento: number = 15;
  private readonly precios = {
    standard: 100,
    suite: 100,
  };

  constructor(reservas: Reserva[]) {
    super(reservas);
  }

  calcularPrecio(): { subtotal: number; total: number } {
    const subtotal = redondear(super.subtotal(this.precios));
    const total = redondear(super.total(subtotal, this.descuento));
    return { subtotal, total };
  }
}

const reservaCliente = new ReservasCliente(reservas);
const reservasTourOperador = new ReservasTourOperador(reservas);

const { subtotal, total } = reservaCliente.calcularPrecio();
const { subtotal: subtotalTour, total: totalTour } =
  reservasTourOperador.calcularPrecio();

console.log(`Reserva para Cliente: Subtotal: ${subtotal} €, Total: ${total} €`);
console.log(  `Reserva para Tour Operador: Subtotal: ${subtotalTour} €, Total: ${totalTour} €`);
