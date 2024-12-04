import { ReservasCliente, ReservasTourOperador } from "./hotel";
import { Reserva } from "./hotel.model";

describe("ReservasCliente", () => {
  it("Debería calcular bien el subtotal y el total", () => {
    // Arrange
    const reservas: Reserva[] = [
      { tipoHabitacion: "standard", pax: 1, noches: 1,desayuno:false },
      { tipoHabitacion: "suite", pax: 1, noches: 1,desayuno:true },
    ];

    const reservaCliente = new ReservasCliente(reservas);

    // Act
    const { subtotal, total } = reservaCliente.calcularPrecio();

    // Assert
    expect(subtotal).toBeCloseTo(250.0, 2);
    expect(total).toBeCloseTo(317.5, 2);
  });
});

describe("ReservasCliente", () => {
  it("Debería calcular bien el subtotal y el total", () => {
    // Arrange
    const reservas: Reserva[] = [
      { tipoHabitacion: "standard", pax: 1, noches: 1,desayuno:false },
      { tipoHabitacion: "suite", pax: 1, noches: 1,desayuno:true },
    ];

    const reservasTourOperador = new ReservasTourOperador(reservas);

    // Act
    const { subtotal, total } = reservasTourOperador.calcularPrecio();

    // Assert
    expect(subtotal).toBeCloseTo(200.0, 2);
    expect(total).toBeCloseTo(220.7, 2);
  });
});
