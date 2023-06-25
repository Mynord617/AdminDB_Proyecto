import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  OrdenPedido,
  RegistroEmpl,
} from '../models';
import {OrdenPedidoRepository} from '../repositories';

export class OrdenPedidoRegistroEmplController {
  constructor(
    @repository(OrdenPedidoRepository)
    public ordenPedidoRepository: OrdenPedidoRepository,
  ) { }

  @get('/orden-pedidos/{id}/registro-empl', {
    responses: {
      '200': {
        description: 'RegistroEmpl belonging to OrdenPedido',
        content: {
          'application/json': {
            schema: getModelSchemaRef(RegistroEmpl),
          },
        },
      },
    },
  })
  async getRegistroEmpl(
    @param.path.number('id') id: typeof OrdenPedido.prototype.Id,
  ): Promise<RegistroEmpl> {
    return this.ordenPedidoRepository.empleadosID(id);
  }
}
