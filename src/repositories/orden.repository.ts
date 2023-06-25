import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {CompletePharmacyDataSource} from '../datasources';
import {Orden, OrdenRelations} from '../models';

export class OrdenRepository extends DefaultCrudRepository<
  Orden,
  typeof Orden.prototype.Id,
  OrdenRelations
> {
  constructor(
    @inject('datasources.complete_pharmacy') dataSource: CompletePharmacyDataSource,
  ) {
    super(Orden, dataSource);
  }
}
