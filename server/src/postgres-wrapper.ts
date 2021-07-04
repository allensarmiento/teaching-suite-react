import knex, { Knex } from 'knex';

class PostgresWrapper {
  private _client: string;
  private _db?: Knex;

  constructor() {
    this._client = 'pg';
  }

  get db() {
    if (!this._db) {
      throw new Error('Cannot access Postgres client before connecting');
    }

    return this._db;
  }

  connect(connectionUri: string) {
    this._db = knex({
      client: this._client,
      connection: connectionUri,
    });
  }
}

export const postgresWrapper = new PostgresWrapper();
