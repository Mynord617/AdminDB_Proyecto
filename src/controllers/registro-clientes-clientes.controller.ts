import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  RegistroClientes,
  Clientes,
} from '../models';
import {RegistroClientesRepository} from '../repositories';

export class RegistroClientesClientesController {
  constructor(
    @repository(RegistroClientesRepository)
    public registroClientesRepository: RegistroClientesRepository,
  ) { }

  @get('/registro-clientes/{id}/clientes', {
    responses: {
      '200': {
        description: 'Clientes belonging to RegistroClientes',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Clientes),
          },
        },
      },
    },
  })
  async getClientes(
    @param.path.number('id') id: typeof RegistroClientes.prototype.Id,
  ): Promise<Clientes> {
    return this.registroClientesRepository.Id_clientes(id);
  }
}
