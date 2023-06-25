import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {CompletePharmacyDataSource} from '../datasources';
import {Farmacias, FarmaciasRelations, OrdenPedido, Orden, Lotes} from '../models';
import {OrdenRepository} from './orden.repository';
import {OrdenPedidoRepository} from './orden-pedido.repository';
import {LotesRepository} from './lotes.repository';

export class FarmaciasRepository extends DefaultCrudRepository<
  Farmacias,
  typeof Farmacias.prototype.id,
  FarmaciasRelations
> {

  public readonly ordenPedidos: HasManyThroughRepositoryFactory<OrdenPedido, typeof OrdenPedido.prototype.Id,
          Orden,
          typeof Farmacias.prototype.id
        >;

  public readonly lotesid: BelongsToAccessor<Lotes, typeof Farmacias.prototype.id>;

  constructor(
    @inject('datasources.complete_pharmacy') dataSource: CompletePharmacyDataSource, @repository.getter('OrdenRepository') protected ordenRepositoryGetter: Getter<OrdenRepository>, @repository.getter('OrdenPedidoRepository') protected ordenPedidoRepositoryGetter: Getter<OrdenPedidoRepository>, @repository.getter('LotesRepository') protected lotesRepositoryGetter: Getter<LotesRepository>,
  ) {
    super(Farmacias, dataSource);
    this.lotesid = this.createBelongsToAccessorFor('lotesid', lotesRepositoryGetter,);
    this.registerInclusionResolver('lotesid', this.lotesid.inclusionResolver);
    this.ordenPedidos = this.createHasManyThroughRepositoryFactoryFor('ordenPedidos', ordenPedidoRepositoryGetter, ordenRepositoryGetter,);
    this.registerInclusionResolver('ordenPedidos', this.ordenPedidos.inclusionResolver);
  }
}
