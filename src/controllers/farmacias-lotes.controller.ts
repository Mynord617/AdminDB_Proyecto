import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Farmacias,
  Lotes,
} from '../models';
import {FarmaciasRepository} from '../repositories';

export class FarmaciasLotesController {
  constructor(
    @repository(FarmaciasRepository)
    public farmaciasRepository: FarmaciasRepository,
  ) { }

  @get('/farmacias/{id}/lotes', {
    responses: {
      '200': {
        description: 'Lotes belonging to Farmacias',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Lotes),
          },
        },
      },
    },
  })
  async getLotes(
    @param.path.number('id') id: typeof Farmacias.prototype.id,
  ): Promise<Lotes> {
    return this.farmaciasRepository.lotesid(id);
  }
}
