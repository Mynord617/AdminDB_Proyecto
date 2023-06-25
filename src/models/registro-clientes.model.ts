import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Clientes} from './clientes.model';

@model({settings: {strict: false}})
export class RegistroClientes extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  Id?: number;

  @belongsTo(() => Clientes, {name: 'Id_clientes'})
  Id_cliente: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<RegistroClientes>) {
    super(data);
  }
}

export interface RegistroClientesRelations {
  // describe navigational properties here
}

export type RegistroClientesWithRelations = RegistroClientes & RegistroClientesRelations;
