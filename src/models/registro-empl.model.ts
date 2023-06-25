import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Empleados} from './empleados.model';

@model()
export class RegistroEmpl extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  Id?: number;

  @belongsTo(() => Empleados, {name: 'Id_empls'})
  Id_empl: number;

  constructor(data?: Partial<RegistroEmpl>) {
    super(data);
  }
}

export interface RegistroEmplRelations {
  // describe navigational properties here
}

export type RegistroEmplWithRelations = RegistroEmpl & RegistroEmplRelations;
