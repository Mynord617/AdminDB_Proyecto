import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {OrdenPedido} from './orden-pedido.model';
import {Orden} from './orden.model';
import {Lotes} from './lotes.model';

@model()
export class Farmacias extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  Id_empleado: number;
  @property({
    type: 'number',
    required: true,
  })
  Id_pedidos: number;

  @hasMany(() => OrdenPedido, {through: {model: () => Orden, keyFrom: 'Id_pedidos', keyTo: 'Id'}})
  ordenPedidos: OrdenPedido[];

  @belongsTo(() => Lotes, {name: 'lotesid'})
  Id_lote: number;

  constructor(data?: Partial<Farmacias>) {
    super(data);
  }
}

export interface FarmaciasRelations {
  // describe navigational properties here
}

export type FarmaciasWithRelations = Farmacias & FarmaciasRelations;
