import {mysqlConnection} from "./mysqlConnection";
import {idbConnection} from "../interfaces";

export class dbConnection {

  init(): Promise<idbConnection> {
    return this.initMySQLConnection();
  }

  private async initMySQLConnection(): Promise<any> {
    const mysql = new mysqlConnection();

    return await mysql.createConnection();
  }


}
