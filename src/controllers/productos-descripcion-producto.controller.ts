import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Productos,
  DescripcionProducto,
} from '../models';
import {ProductosRepository} from '../repositories';

export class ProductosDescripcionProductoController {
  constructor(
    @repository(ProductosRepository)
    public productosRepository: ProductosRepository,
  ) { }

  @get('/productos/{id}/descripcion-producto', {
    responses: {
      '200': {
        description: 'DescripcionProducto belonging to Productos',
        content: {
          'application/json': {
            schema: getModelSchemaRef(DescripcionProducto),
          },
        },
      },
    },
  })
  async getDescripcionProducto(
    @param.path.number('id') id: typeof Productos.prototype.Id,
  ): Promise<DescripcionProducto> {
    return this.productosRepository.descripcion(id);
  }
}
