import {MySqlConnection} from "./MySqlConnection";
import {iDbConnection} from "../interfaces";

export type DbType = 'mysql' | 'postgres' | 'sqlite';

export class DbConnectionFactory {
  static async createConnection(type: DbType): Promise<iDbConnection> {
    switch (type) {
      case 'mysql': {
        const mysql = new MySqlConnection();
        await mysql.createConnection();
        return mysql;
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

