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
DescrFarmacia,
Productos,
Farmacias,
} from '../models';
import {DescrFarmaciaRepository} from '../repositories';

export class DescrFarmaciaFarmaciasController {
  constructor(
    @repository(DescrFarmaciaRepository) protected descrFarmaciaRepository: DescrFarmaciaRepository,
  ) { }

  @get('/descr-farmacias/{id}/farmacias', {
    responses: {
      '200': {
        description: 'Array of DescrFarmacia has many Farmacias through Productos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Farmacias)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Farmacias>,
  ): Promise<Farmacias[]> {
    return this.descrFarmaciaRepository.farmacias(id).find(filter);
  }

  @post('/descr-farmacias/{id}/farmacias', {
    responses: {
      '200': {
        description: 'create a Farmacias model instance',
        content: {'application/json': {schema: getModelSchemaRef(Farmacias)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof DescrFarmacia.prototype.Id_farmacia,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Farmacias, {
            title: 'NewFarmaciasInDescrFarmacia',
            exclude: ['id'],
          }),
        },
      },
    }) farmacias: Omit<Farmacias, 'id'>,
  ): Promise<Farmacias> {
    return this.descrFarmaciaRepository.farmacias(id).create(farmacias);
  }

  @patch('/descr-farmacias/{id}/farmacias', {
    responses: {
      '200': {
        description: 'DescrFarmacia.Farmacias PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Farmacias, {partial: true}),
        },
      },
    })
    farmacias: Partial<Farmacias>,
    @param.query.object('where', getWhereSchemaFor(Farmacias)) where?: Where<Farmacias>,
  ): Promise<Count> {
    return this.descrFarmaciaRepository.farmacias(id).patch(farmacias, where);
  }

  @del('/descr-farmacias/{id}/farmacias', {
    responses: {
      '200': {
        description: 'DescrFarmacia.Farmacias DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Farmacias)) where?: Where<Farmacias>,
  ): Promise<Count> {
    return this.descrFarmaciaRepository.farmacias(id).delete(where);
  }
}
