import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {CompletePharmacyDataSource} from '../datasources';
import {DescrPersonas, DescrPersonasRelations, Personas} from '../models';
import {PersonasRepository} from './personas.repository';

export class DescrPersonasRepository extends DefaultCrudRepository<
  DescrPersonas,
  typeof DescrPersonas.prototype.Id,
  DescrPersonasRelations
> {

  public readonly Id_persona: BelongsToAccessor<Personas, typeof DescrPersonas.prototype.Id>;

  constructor(
    @inject('datasources.complete_pharmacy') dataSource: CompletePharmacyDataSource, @repository.getter('PersonasRepository') protected personasRepositoryGetter: Getter<PersonasRepository>,
  ) {
    super(DescrPersonas, dataSource);
    this.Id_persona = this.createBelongsToAccessorFor('Id_persona', personasRepositoryGetter,);
    this.registerInclusionResolver('Id_persona', this.Id_persona.inclusionResolver);
  }
}
