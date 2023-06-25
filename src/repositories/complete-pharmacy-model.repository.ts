import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {CompletePharmacyDataSource} from '../datasources';
import {CompletePharmacyModel, CompletePharmacyModelRelations} from '../models';

export class CompletePharmacyModelRepository extends DefaultCrudRepository<
  CompletePharmacyModel,
  typeof CompletePharmacyModel.prototype.id,
  CompletePharmacyModelRelations
> {
  constructor(
    @inject('datasources.complete_pharmacy') dataSource: CompletePharmacyDataSource,
  ) {
    super(CompletePharmacyModel, dataSource);
  }
}
