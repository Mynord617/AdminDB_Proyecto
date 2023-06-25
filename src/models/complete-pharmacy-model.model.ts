import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class CompletePharmacyModel extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  complete_pharmacy_property: string;

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  sa: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<CompletePharmacyModel>) {
    super(data);
  }
}

export interface CompletePharmacyModelRelations {
  // describe navigational properties here
}

export type CompletePharmacyModelWithRelations = CompletePharmacyModel & CompletePharmacyModelRelations;
