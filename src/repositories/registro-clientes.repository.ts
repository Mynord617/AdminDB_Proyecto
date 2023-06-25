import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {CompletePharmacyDataSource} from '../datasources';
import {RegistroClientes, RegistroClientesRelations, Clientes} from '../models';
import {ClientesRepository} from './clientes.repository';

export class RegistroClientesRepository extends DefaultCrudRepository<
  RegistroClientes,
  typeof RegistroClientes.prototype.Id,
  RegistroClientesRelations
> {

  public readonly Id_clientes: BelongsToAccessor<Clientes, typeof RegistroClientes.prototype.Id>;

  constructor(
    @inject('datasources.complete_pharmacy') dataSource: CompletePharmacyDataSource, @repository.getter('ClientesRepository') protected clientesRepositoryGetter: Getter<ClientesRepository>,
  ) {
    super(RegistroClientes, dataSource);
    this.Id_clientes = this.createBelongsToAccessorFor('Id_clientes', clientesRepositoryGetter,);
    this.registerInclusionResolver('Id_clientes', this.Id_clientes.inclusionResolver);
  }
}
