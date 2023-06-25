import {Entity, hasMany, hasOne, model, property} from '@loopback/repository';
import {Clientes} from './clientes.model';
import {Empleados} from './empleados.model';
import {Orden} from './orden.model';
import {RegistroClientes} from './registro-clientes.model';
import {RegistroEmpl} from './registro-empl.model';

@model()
export class OrdenPedido extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  Id?: number;

  @property({
    type: 'number',
    required: true,
  })
  Id_cliente: number;

  @property({
    type: 'number',
    required: true,
  })
  Id_orden: number;

  @property({
    type: 'date',
    required: true,
  })
  Fecha: string;

  @property({
    type: 'number',
    required: true,
  })
  Cantidad: number;

  @hasMany(() => RegistroClientes, {through: {model: () => Clientes, keyFrom: 'Id_Clientes', keyTo: 'Id'}})
  registroClientes: RegistroClientes[];

  @hasMany(() => RegistroEmpl, {through: {model: () => Empleados, keyFrom: 'Id_empleado', keyTo: 'Id'}})
  registroEmpls: RegistroEmpl[];

  @hasOne(() => Orden, {keyTo: 'Id_orden'})
  orden: Orden;

  @hasOne(() => RegistroEmpl, {name: 'empleadosID'})
  Id_empleado: number;

  constructor(data?: Partial<OrdenPedido>) {
    super(data);
  }
}

export interface OrdenPedidoRelations {
  // describe navigational properties here
}

export type OrdenPedidoWithRelations = OrdenPedido & OrdenPedidoRelations;
