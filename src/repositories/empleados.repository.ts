import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {CompletePharmacyDataSource} from '../datasources';
import {Empleados, EmpleadosRelations, DescrPersonas} from '../models';
import {DescrPersonasRepository} from './descr-personas.repository';

export class EmpleadosRepository extends DefaultCrudRepository<
  Empleados,
  typeof Empleados.prototype.Id,
  EmpleadosRelations
> {

  public readonly empleados_descr: BelongsToAccessor<DescrPersonas, typeof Empleados.prototype.Id>;

  constructor(
    @inject('datasources.complete_pharmacy') dataSource: CompletePharmacyDataSource, @repository.getter('DescrPersonasRepository') protected descrPersonasRepositoryGetter: Getter<DescrPersonasRepository>,
  ) {
    super(Empleados, dataSource);
    this.empleados_descr = this.createBelongsToAccessorFor('empleados_descr', descrPersonasRepositoryGetter,);
    this.registerInclusionResolver('empleados_descr', this.empleados_descr.inclusionResolver);
  }
}
