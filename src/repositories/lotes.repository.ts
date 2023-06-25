import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {CompletePharmacyDataSource} from '../datasources';
import {Lotes, LotesRelations, Productos} from '../models';
import {ProductosRepository} from './productos.repository';

export class LotesRepository extends DefaultCrudRepository<
  Lotes,
  typeof Lotes.prototype.Id,
  LotesRelations
> {

  public readonly productos: HasManyRepositoryFactory<Productos, typeof Lotes.prototype.Id>;

  constructor(
    @inject('datasources.complete_pharmacy') dataSource: CompletePharmacyDataSource, @repository.getter('ProductosRepository') protected productosRepositoryGetter: Getter<ProductosRepository>,
  ) {
    super(Lotes, dataSource);
    this.productos = this.createHasManyRepositoryFactoryFor('productos', productosRepositoryGetter,);
    this.registerInclusionResolver('productos', this.productos.inclusionResolver);
  }
}
