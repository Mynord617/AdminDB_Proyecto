import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  DescrPersonas,
  Personas,
} from '../models';
import {DescrPersonasRepository} from '../repositories';

export class DescrPersonasPersonasController {
  constructor(
    @repository(DescrPersonasRepository)
    public descrPersonasRepository: DescrPersonasRepository,
  ) { }

  @get('/descr-personas/{id}/personas', {
    responses: {
      '200': {
        description: 'Personas belonging to DescrPersonas',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Personas),
          },
        },
      },
    },
  })
  async getPersonas(
    @param.path.number('id') id: typeof DescrPersonas.prototype.Id,
  ): Promise<Personas> {
    return this.descrPersonasRepository.Id_persona(id);
  }
}
