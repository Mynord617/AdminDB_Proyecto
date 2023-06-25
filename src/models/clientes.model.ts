import {Entity, model, property, belongsTo} from '@loopback/repository';
import {DescrPersonas} from './descr-personas.model';

@model()
export class Clientes extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  Id?: number;

  @belongsTo(() => DescrPersonas, {name: 'descr_personas'})
  Id_descr: number;

  constructor(data?: Partial<Clientes>) {
    super(data);
  }
}

export interface ClientesRelations {
  // describe navigational properties here
}

export type ClientesWithRelations = Clientes & ClientesRelations;
