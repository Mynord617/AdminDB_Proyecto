import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {CompletePharmacyDataSource} from '../datasources';
import {Clientes, ClientesRelations, DescrPersonas} from '../models';
import {DescrPersonasRepository} from './descr-personas.repository';

export class ClientesRepository extends DefaultCrudRepository<
  Clientes,
  typeof Clientes.prototype.Id,
  ClientesRelations
> {

  public readonly descr_personas: BelongsToAccessor<DescrPersonas, typeof Clientes.prototype.Id>;

  constructor(
    @inject('datasources.complete_pharmacy') dataSource: CompletePharmacyDataSource, @repository.getter('DescrPersonasRepository') protected descrPersonasRepositoryGetter: Getter<DescrPersonasRepository>,
  ) {
    super(Clientes, dataSource);
    this.descr_personas = this.createBelongsToAccessorFor('descr_personas', descrPersonasRepositoryGetter,);
    this.registerInclusionResolver('descr_personas', this.descr_personas.inclusionResolver);
  }
}
