import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Orden} from './orden.model';
import {DescripcionProducto} from './descripcion-producto.model';

@model()
export class Productos extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  Id?: number;
  @property({
    type: 'number',
  })
  Id_producto?: number;

  @belongsTo(() => Orden, {name: 'ordenid'})
  Id_orden: number;

  @belongsTo(() => DescripcionProducto, {name: 'descripcion'})
  Id_descr: number;

  constructor(data?: Partial<Productos>) {
    super(data);
  }
}

export interface ProductosRelations {
  // describe navigational properties here
}

export type ProductosWithRelations = Productos & ProductosRelations;
