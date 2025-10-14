import {mysqlConnection} from "./mysqlConnection";
import {idbConnection} from "../interfaces";

export type DbType = 'mysql' | 'postgres' | 'sqlite';

export class DbConnectionFactory {
  static createConnection(type: DbType): Promise<idbConnection> {
    switch (type) {
      case 'mysql': {
        const mysql = new mysqlConnection();
        return mysql.createConnection();
      }
      // case 'postgres': {
      //   const pg = new postgresConnection();
      //   return pg.createConnection();
      // }
      default:
        throw new Error(`Unknown DB type: ${type}`);
    }
  }
}

