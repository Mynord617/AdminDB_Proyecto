import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Clientes,
  DescrPersonas,
} from '../models';
import {ClientesRepository} from '../repositories';

export class ClientesDescrPersonasController {
  constructor(
    @repository(ClientesRepository)
    public clientesRepository: ClientesRepository,
  ) { }

  @get('/clientes/{id}/descr-personas', {
    responses: {
      '200': {
        description: 'DescrPersonas belonging to Clientes',
        content: {
          'application/json': {
            schema: getModelSchemaRef(DescrPersonas),
          },
        },
      },
    },
  })
  async getDescrPersonas(
    @param.path.number('id') id: typeof Clientes.prototype.Id,
  ): Promise<DescrPersonas> {
    return this.clientesRepository.descr_personas(id);
  }
}
