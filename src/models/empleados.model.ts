import {Entity, model, property, belongsTo} from '@loopback/repository';
import {DescrPersonas} from './descr-personas.model';

@model()
export class Empleados extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  Id?: number;

  @belongsTo(() => DescrPersonas, {name: 'empleados_descr'})
  Id_descr: number;

  constructor(data?: Partial<Empleados>) {
    super(data);
  }
}

export interface EmpleadosRelations {
  // describe navigational properties here
}

export type EmpleadosWithRelations = Empleados & EmpleadosRelations;
