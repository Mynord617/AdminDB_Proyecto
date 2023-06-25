import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Personas} from './personas.model';

@model()
export class DescrPersonas extends Entity {
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
  Id_persona: number;

  @belongsTo(() => Personas, {name: 'Id_persona'})
  Id_personas: number;

  constructor(data?: Partial<DescrPersonas>) {
    super(data);
  }
}

export interface DescrPersonasRelations {
  // describe navigational properties here
}

export type DescrPersonasWithRelations = DescrPersonas & DescrPersonasRelations;
