import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Empleados,
  DescrPersonas,
} from '../models';
import {EmpleadosRepository} from '../repositories';

export class EmpleadosDescrPersonasController {
  constructor(
    @repository(EmpleadosRepository)
    public empleadosRepository: EmpleadosRepository,
  ) { }

  @get('/empleados/{id}/descr-personas', {
    responses: {
      '200': {
        description: 'DescrPersonas belonging to Empleados',
        content: {
          'application/json': {
            schema: getModelSchemaRef(DescrPersonas),
          },
        },
      },
    },
  })
  async getDescrPersonas(
    @param.path.number('id') id: typeof Empleados.prototype.Id,
  ): Promise<DescrPersonas> {
    return this.empleadosRepository.empleados_descr(id);
  }
}
