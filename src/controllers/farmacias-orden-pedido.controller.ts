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
Farmacias,
Orden,
OrdenPedido,
} from '../models';
import {FarmaciasRepository} from '../repositories';

export class FarmaciasOrdenPedidoController {
  constructor(
    @repository(FarmaciasRepository) protected farmaciasRepository: FarmaciasRepository,
  ) { }

  @get('/farmacias/{id}/orden-pedidos', {
    responses: {
      '200': {
        description: 'Array of Farmacias has many OrdenPedido through Orden',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(OrdenPedido)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<OrdenPedido>,
  ): Promise<OrdenPedido[]> {
    return this.farmaciasRepository.ordenPedidos(id).find(filter);
  }

  @post('/farmacias/{id}/orden-pedidos', {
    responses: {
      '200': {
        description: 'create a OrdenPedido model instance',
        content: {'application/json': {schema: getModelSchemaRef(OrdenPedido)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Farmacias.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrdenPedido, {
            title: 'NewOrdenPedidoInFarmacias',
            exclude: ['Id'],
          }),
        },
      },
    }) ordenPedido: Omit<OrdenPedido, 'Id'>,
  ): Promise<OrdenPedido> {
    return this.farmaciasRepository.ordenPedidos(id).create(ordenPedido);
  }

  @patch('/farmacias/{id}/orden-pedidos', {
    responses: {
      '200': {
        description: 'Farmacias.OrdenPedido PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrdenPedido, {partial: true}),
        },
      },
    })
    ordenPedido: Partial<OrdenPedido>,
    @param.query.object('where', getWhereSchemaFor(OrdenPedido)) where?: Where<OrdenPedido>,
  ): Promise<Count> {
    return this.farmaciasRepository.ordenPedidos(id).patch(ordenPedido, where);
  }

  @del('/farmacias/{id}/orden-pedidos', {
    responses: {
      '200': {
        description: 'Farmacias.OrdenPedido DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(OrdenPedido)) where?: Where<OrdenPedido>,
  ): Promise<Count> {
    return this.farmaciasRepository.ordenPedidos(id).delete(where);
  }
}
