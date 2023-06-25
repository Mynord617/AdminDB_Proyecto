import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  DescripcionProducto,
  Categorias,
} from '../models';
import {DescripcionProductoRepository} from '../repositories';

export class DescripcionProductoCategoriasController {
  constructor(
    @repository(DescripcionProductoRepository)
    public descripcionProductoRepository: DescripcionProductoRepository,
  ) { }

  @get('/descripcion-productos/{id}/categorias', {
    responses: {
      '200': {
        description: 'Categorias belonging to DescripcionProducto',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Categorias),
          },
        },
      },
    },
  })
  async getCategorias(
    @param.path.number('id') id: typeof DescripcionProducto.prototype.Id,
  ): Promise<Categorias> {
    return this.descripcionProductoRepository.categoriasdescr(id);
  }
}
