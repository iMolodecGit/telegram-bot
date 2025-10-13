import {mysqlConnection} from "./mysqlConnection";
import {idbConnection} from "../interfaces";

export class dbConnectionFacade {

  initConnection(): Promise<idbConnection> {
    return this.initMySQLConnection();
  }

  private initMySQLConnection(): Promise<idbConnection> {
    const mysql = new mysqlConnection();
    return mysql.createConnection();
  }

}
