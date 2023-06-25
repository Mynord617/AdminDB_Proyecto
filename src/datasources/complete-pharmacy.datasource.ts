import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'complete_pharmacy',
  connector: 'mssql',
  url: 'mssql://sa:123456@localhost/Complete_pharmacy',
  host: 'localhost',
  port: 1433,
  user: 'sa',
  password: '123456',
  database: 'Complete_pharmacy',
  "options": {
    "encrypt": true,
    "enableArithAbort": true
    }
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class CompletePharmacyDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'complete_pharmacy';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.complete_pharmacy', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
