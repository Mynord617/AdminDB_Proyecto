import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {CompletePharmacyDataSource} from '../datasources';
import {Personas, PersonasRelations} from '../models';

export class PersonasRepository extends DefaultCrudRepository<
  Personas,
  typeof Personas.prototype.Id,
  PersonasRelations
> {
  constructor(
    @inject('datasources.complete_pharmacy') dataSource: CompletePharmacyDataSource,
  ) {
    super(Personas, dataSource);
  }
}
