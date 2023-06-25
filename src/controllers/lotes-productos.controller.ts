import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Lotes,
  Productos,
} from '../models';
import {LotesRepository} from '../repositories';

export class LotesProductosController {
  constructor(
    @repository(LotesRepository) protected lotesRepository: LotesRepository,
  ) { }

  @get('/lotes/{id}/productos', {
    responses: {
      '200': {
        description: 'Array of Lotes has many Productos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Productos)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Productos>,
  ): Promise<Productos[]> {
    return this.lotesRepository.productos(id).find(filter);
  }

  @post('/lotes/{id}/productos', {
    responses: {
      '200': {
        description: 'Lotes model instance',
        content: {'application/json': {schema: getModelSchemaRef(Productos)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Lotes.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Productos, {
            title: 'NewProductosInLotes',
            exclude: ['Id'],
            optional: ['Id_producto']
          }),
        },
      },
    }) productos: Omit<Productos, 'Id'>,
  ): Promise<Productos> {
    return this.lotesRepository.productos(id).create(productos);
  }

  @patch('/lotes/{id}/productos', {
    responses: {
      '200': {
        description: 'Lotes.Productos PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Productos, {partial: true}),
        },
      },
    })
    productos: Partial<Productos>,
    @param.query.object('where', getWhereSchemaFor(Productos)) where?: Where<Productos>,
  ): Promise<Count> {
    return this.lotesRepository.productos(id).patch(productos, where);
  }

  @del('/lotes/{id}/productos', {
    responses: {
      '200': {
        description: 'Lotes.Productos DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Productos)) where?: Where<Productos>,
  ): Promise<Count> {
    return this.lotesRepository.productos(id).delete(where);
  }
}
