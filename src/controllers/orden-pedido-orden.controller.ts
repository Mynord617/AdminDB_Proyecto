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
  OrdenPedido,
  Orden,
} from '../models';
import {OrdenPedidoRepository} from '../repositories';

export class OrdenPedidoOrdenController {
  constructor(
    @repository(OrdenPedidoRepository) protected ordenPedidoRepository: OrdenPedidoRepository,
  ) { }

  @get('/orden-pedidos/{id}/orden', {
    responses: {
      '200': {
        description: 'OrdenPedido has one Orden',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Orden),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Orden>,
  ): Promise<Orden> {
    return this.ordenPedidoRepository.orden(id).get(filter);
  }

  @post('/orden-pedidos/{id}/orden', {
    responses: {
      '200': {
        description: 'OrdenPedido model instance',
        content: {'application/json': {schema: getModelSchemaRef(Orden)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof OrdenPedido.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Orden, {
            title: 'NewOrdenInOrdenPedido',
            exclude: ['Id'],
            optional: ['Id_orden']
          }),
        },
      },
    }) orden: Omit<Orden, 'Id'>,
  ): Promise<Orden> {
    return this.ordenPedidoRepository.orden(id).create(orden);
  }

  @patch('/orden-pedidos/{id}/orden', {
    responses: {
      '200': {
        description: 'OrdenPedido.Orden PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Orden, {partial: true}),
        },
      },
    })
    orden: Partial<Orden>,
    @param.query.object('where', getWhereSchemaFor(Orden)) where?: Where<Orden>,
  ): Promise<Count> {
    return this.ordenPedidoRepository.orden(id).patch(orden, where);
  }

  @del('/orden-pedidos/{id}/orden', {
    responses: {
      '200': {
        description: 'OrdenPedido.Orden DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Orden)) where?: Where<Orden>,
  ): Promise<Count> {
    return this.ordenPedidoRepository.orden(id).delete(where);
  }
}
