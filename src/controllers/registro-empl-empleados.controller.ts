import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  RegistroEmpl,
  Empleados,
} from '../models';
import {RegistroEmplRepository} from '../repositories';

export class RegistroEmplEmpleadosController {
  constructor(
    @repository(RegistroEmplRepository)
    public registroEmplRepository: RegistroEmplRepository,
  ) { }

  @get('/registro-empls/{id}/empleados', {
    responses: {
      '200': {
        description: 'Empleados belonging to RegistroEmpl',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Empleados),
          },
        },
      },
    },
  })
  async getEmpleados(
    @param.path.number('id') id: typeof RegistroEmpl.prototype.Id,
  ): Promise<Empleados> {
    return this.registroEmplRepository.Id_empls(id);
  }
}
