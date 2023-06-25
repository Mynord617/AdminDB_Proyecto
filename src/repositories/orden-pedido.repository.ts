import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory, HasOneRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {CompletePharmacyDataSource} from '../datasources';
import {OrdenPedido, OrdenPedidoRelations, RegistroClientes, Clientes, RegistroEmpl, Empleados, Orden} from '../models';
import {ClientesRepository} from './clientes.repository';
import {RegistroClientesRepository} from './registro-clientes.repository';
import {EmpleadosRepository} from './empleados.repository';
import {RegistroEmplRepository} from './registro-empl.repository';
import {OrdenRepository} from './orden.repository';

export class OrdenPedidoRepository extends DefaultCrudRepository<
  OrdenPedido,
  typeof OrdenPedido.prototype.Id,
  OrdenPedidoRelations
> {

  public readonly registroClientes: HasManyThroughRepositoryFactory<RegistroClientes, typeof RegistroClientes.prototype.Id,
          Clientes,
          typeof OrdenPedido.prototype.Id
        >;

  public readonly registroEmpls: HasManyThroughRepositoryFactory<RegistroEmpl, typeof RegistroEmpl.prototype.Id,
          Empleados,
          typeof OrdenPedido.prototype.Id
        >;

  public readonly orden: HasOneRepositoryFactory<Orden, typeof OrdenPedido.prototype.Id>;

  public readonly empleadosID: BelongsToAccessor<RegistroEmpl, typeof OrdenPedido.prototype.Id>;

  constructor(
    @inject('datasources.complete_pharmacy') dataSource: CompletePharmacyDataSource, @repository.getter('ClientesRepository') protected clientesRepositoryGetter: Getter<ClientesRepository>, @repository.getter('RegistroClientesRepository') protected registroClientesRepositoryGetter: Getter<RegistroClientesRepository>, @repository.getter('EmpleadosRepository') protected empleadosRepositoryGetter: Getter<EmpleadosRepository>, @repository.getter('RegistroEmplRepository') protected registroEmplRepositoryGetter: Getter<RegistroEmplRepository>, @repository.getter('OrdenRepository') protected ordenRepositoryGetter: Getter<OrdenRepository>,
  ) {
    super(OrdenPedido, dataSource);
    this.empleadosID = this.createBelongsToAccessorFor('empleadosID', registroEmplRepositoryGetter,);
    this.registerInclusionResolver('empleadosID', this.empleadosID.inclusionResolver);
    this.orden = this.createHasOneRepositoryFactoryFor('orden', ordenRepositoryGetter);
    this.registerInclusionResolver('orden', this.orden.inclusionResolver);
    this.registroEmpls = this.createHasManyThroughRepositoryFactoryFor('registroEmpls', registroEmplRepositoryGetter, empleadosRepositoryGetter,);
    this.registerInclusionResolver('registroEmpls', this.registroEmpls.inclusionResolver);
    this.registroClientes = this.createHasManyThroughRepositoryFactoryFor('registroClientes', registroClientesRepositoryGetter, clientesRepositoryGetter,);
    this.registerInclusionResolver('registroClientes', this.registroClientes.inclusionResolver);
  }
}
