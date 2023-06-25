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
  Orden,
} from '../models';
import {ProductosRepository} from '../repositories';

export class ProductosOrdenController {
  constructor(
    @repository(ProductosRepository)
    public productosRepository: ProductosRepository,
  ) { }

  @get('/productos/{id}/orden', {
    responses: {
      '200': {
        description: 'Orden belonging to Productos',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Orden),
          },
        },
      },
    },
  })
  async getOrden(
    @param.path.number('id') id: typeof Productos.prototype.Id,
  ): Promise<Orden> {
    return this.productosRepository.ordenid(id);
  }
}
