import {Entity, model, property, hasMany} from '@loopback/repository';
import {Productos} from './productos.model';

@model()
export class Lotes extends Entity {
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
  Id_producto: number;

  @property({
    type: 'number',
    required: true,
  })
  Cant_producto: number;

  @hasMany(() => Productos, {keyTo: 'Id_producto'})
  productos: Productos[];

  constructor(data?: Partial<Lotes>) {
    super(data);
  }
}

export interface LotesRelations {
  // describe navigational properties here
}

export type LotesWithRelations = Lotes & LotesRelations;
