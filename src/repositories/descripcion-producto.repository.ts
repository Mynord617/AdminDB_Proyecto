import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {CompletePharmacyDataSource} from '../datasources';
import {DescripcionProducto, DescripcionProductoRelations, Categorias} from '../models';
import {CategoriasRepository} from './categorias.repository';

export class DescripcionProductoRepository extends DefaultCrudRepository<
  DescripcionProducto,
  typeof DescripcionProducto.prototype.Id,
  DescripcionProductoRelations
> {

  public readonly categoriasdescr: BelongsToAccessor<Categorias, typeof DescripcionProducto.prototype.Id>;

  constructor(
    @inject('datasources.complete_pharmacy') dataSource: CompletePharmacyDataSource, @repository.getter('CategoriasRepository') protected categoriasRepositoryGetter: Getter<CategoriasRepository>,
  ) {
    super(DescripcionProducto, dataSource);
    this.categoriasdescr = this.createBelongsToAccessorFor('categoriasdescr', categoriasRepositoryGetter,);
    this.registerInclusionResolver('categoriasdescr', this.categoriasdescr.inclusionResolver);
  }
}
