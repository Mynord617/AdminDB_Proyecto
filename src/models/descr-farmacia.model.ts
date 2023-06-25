import {Entity, model, property, hasMany} from '@loopback/repository';
import {Farmacias} from './farmacias.model';
import {Productos} from './productos.model';

@model()
export class DescrFarmacia extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  Id_farmacia?: number;

  @property({
    type: 'string',
    required: true,
  })
  Nombre: string;

  @hasMany(() => Farmacias, {through: {model: () => Productos, keyFrom: 'Id_farmacia', keyTo: 'Id'}})
  farmacias: Farmacias[];

  constructor(data?: Partial<DescrFarmacia>) {
    super(data);
  }
}

export interface DescrFarmaciaRelations {
  // describe navigational properties here
}

export type DescrFarmaciaWithRelations = DescrFarmacia & DescrFarmaciaRelations;
