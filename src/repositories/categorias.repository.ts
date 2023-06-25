import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {CompletePharmacyDataSource} from '../datasources';
import {Categorias, CategoriasRelations} from '../models';

export class CategoriasRepository extends DefaultCrudRepository<
  Categorias,
  typeof Categorias.prototype.Id,
  CategoriasRelations
> {
  constructor(
    @inject('datasources.complete_pharmacy') dataSource: CompletePharmacyDataSource,
  ) {
    super(Categorias, dataSource);
  }
}
