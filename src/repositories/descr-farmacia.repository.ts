import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {CompletePharmacyDataSource} from '../datasources';
import {DescrFarmacia, DescrFarmaciaRelations, Farmacias, Productos} from '../models';
import {ProductosRepository} from './productos.repository';
import {FarmaciasRepository} from './farmacias.repository';

export class DescrFarmaciaRepository extends DefaultCrudRepository<
  DescrFarmacia,
  typeof DescrFarmacia.prototype.Id_farmacia,
  DescrFarmaciaRelations
> {

  public readonly farmacias: HasManyThroughRepositoryFactory<Farmacias, typeof Farmacias.prototype.id,
          Productos,
          typeof DescrFarmacia.prototype.Id_farmacia
        >;

  constructor(
    @inject('datasources.complete_pharmacy') dataSource: CompletePharmacyDataSource, @repository.getter('ProductosRepository') protected productosRepositoryGetter: Getter<ProductosRepository>, @repository.getter('FarmaciasRepository') protected farmaciasRepositoryGetter: Getter<FarmaciasRepository>,
  ) {
    super(DescrFarmacia, dataSource);
    this.farmacias = this.createHasManyThroughRepositoryFactoryFor('farmacias', farmaciasRepositoryGetter, productosRepositoryGetter,);
    this.registerInclusionResolver('farmacias', this.farmacias.inclusionResolver);
  }
}
