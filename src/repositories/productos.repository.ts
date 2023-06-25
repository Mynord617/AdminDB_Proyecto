import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {CompletePharmacyDataSource} from '../datasources';
import {Productos, ProductosRelations, Orden, DescripcionProducto} from '../models';
import {OrdenRepository} from './orden.repository';
import {DescripcionProductoRepository} from './descripcion-producto.repository';

export class ProductosRepository extends DefaultCrudRepository<
  Productos,
  typeof Productos.prototype.Id,
  ProductosRelations
> {

  public readonly ordenid: BelongsToAccessor<Orden, typeof Productos.prototype.Id>;

  public readonly descripcion: BelongsToAccessor<DescripcionProducto, typeof Productos.prototype.Id>;

  constructor(
    @inject('datasources.complete_pharmacy') dataSource: CompletePharmacyDataSource, @repository.getter('OrdenRepository') protected ordenRepositoryGetter: Getter<OrdenRepository>, @repository.getter('DescripcionProductoRepository') protected descripcionProductoRepositoryGetter: Getter<DescripcionProductoRepository>,
  ) {
    super(Productos, dataSource);
    this.descripcion = this.createBelongsToAccessorFor('descripcion', descripcionProductoRepositoryGetter,);
    this.registerInclusionResolver('descripcion', this.descripcion.inclusionResolver);
    this.ordenid = this.createBelongsToAccessorFor('ordenid', ordenRepositoryGetter,);
    this.registerInclusionResolver('ordenid', this.ordenid.inclusionResolver);
  }
}
