import {Entity, model, property} from '@loopback/repository';

@model()
export class Categorias extends Entity {
  @property({
    type: 'number',
    id:true,
    required: true,
  })
  Id: number;

  @property({
    type: 'string',
    required: true,
  })
  Nombre: string;


  constructor(data?: Partial<Categorias>) {
    super(data);
  }
}

export interface CategoriasRelations {
  // describe navigational properties here
}

export type CategoriasWithRelations = Categorias & CategoriasRelations;
