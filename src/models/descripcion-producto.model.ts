import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Categorias} from './categorias.model';

@model()
export class DescripcionProducto extends Entity {
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
  Id_categoria: number;

  @property({
    type: 'string',
    required: true,
  })
  Nombre: string;

  @belongsTo(() => Categorias, {name: 'categoriasdescr'})
  Id_Categoria: number;

  constructor(data?: Partial<DescripcionProducto>) {
    super(data);
  }
}

export interface DescripcionProductoRelations {
  // describe navigational properties here
}

export type DescripcionProductoWithRelations = DescripcionProducto & DescripcionProductoRelations;
