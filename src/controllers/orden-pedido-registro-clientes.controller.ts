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
Clientes,
RegistroClientes,
} from '../models';
import {OrdenPedidoRepository} from '../repositories';

export class OrdenPedidoRegistroClientesController {
  constructor(
    @repository(OrdenPedidoRepository) protected ordenPedidoRepository: OrdenPedidoRepository,
  ) { }

  @get('/orden-pedidos/{id}/registro-clientes', {
    responses: {
      '200': {
        description: 'Array of OrdenPedido has many RegistroClientes through Clientes',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(RegistroClientes)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<RegistroClientes>,
  ): Promise<RegistroClientes[]> {
    return this.ordenPedidoRepository.registroClientes(id).find(filter);
  }

  @post('/orden-pedidos/{id}/registro-clientes', {
    responses: {
      '200': {
        description: 'create a RegistroClientes model instance',
        content: {'application/json': {schema: getModelSchemaRef(RegistroClientes)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof OrdenPedido.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RegistroClientes, {
            title: 'NewRegistroClientesInOrdenPedido',
            exclude: ['Id'],
          }),
        },
      },
    }) registroClientes: Omit<RegistroClientes, 'Id'>,
  ): Promise<RegistroClientes> {
    return this.ordenPedidoRepository.registroClientes(id).create(registroClientes);
  }

  @patch('/orden-pedidos/{id}/registro-clientes', {
    responses: {
      '200': {
        description: 'OrdenPedido.RegistroClientes PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RegistroClientes, {partial: true}),
        },
      },
    })
    registroClientes: Partial<RegistroClientes>,
    @param.query.object('where', getWhereSchemaFor(RegistroClientes)) where?: Where<RegistroClientes>,
  ): Promise<Count> {
    return this.ordenPedidoRepository.registroClientes(id).patch(registroClientes, where);
  }

  @del('/orden-pedidos/{id}/registro-clientes', {
    responses: {
      '200': {
        description: 'OrdenPedido.RegistroClientes DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(RegistroClientes)) where?: Where<RegistroClientes>,
  ): Promise<Count> {
    return this.ordenPedidoRepository.registroClientes(id).delete(where);
  }
}
