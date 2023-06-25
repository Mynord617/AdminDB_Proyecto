import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {CompletePharmacyDataSource} from '../datasources';
import {RegistroEmpl, RegistroEmplRelations, Empleados} from '../models';
import {EmpleadosRepository} from './empleados.repository';

export class RegistroEmplRepository extends DefaultCrudRepository<
  RegistroEmpl,
  typeof RegistroEmpl.prototype.Id,
  RegistroEmplRelations
> {

  public readonly Id_empls: BelongsToAccessor<Empleados, typeof RegistroEmpl.prototype.Id>;

  constructor(
    @inject('datasources.complete_pharmacy') dataSource: CompletePharmacyDataSource, @repository.getter('EmpleadosRepository') protected empleadosRepositoryGetter: Getter<EmpleadosRepository>,
  ) {
    super(RegistroEmpl, dataSource);
    this.Id_empls = this.createBelongsToAccessorFor('Id_empls', empleadosRepositoryGetter,);
    this.registerInclusionResolver('Id_empls', this.Id_empls.inclusionResolver);
  }
}
