import mysql, { Connection } from 'mysql2/promise';
import {iDbConnection} from "../interfaces";

export class MySqlConnection implements iDbConnection{
  private connection: Connection | null = null;
  private readonly config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  };

  constructor() {}

  async createConnection(): Promise<Connection> {
    if (!this.connection) {
      await this.connect();
    }

    return this.connection!;
  }

  private async connect(): Promise<void> {
    try {
      this.connection = await mysql.createConnection(this.config);
      console.log('✅ MySQL connected');

      // Обработчик потери соединения
      this.connection.on('error', async (err: any) => {
        console.error('⚠️ MySQL connection error:', err.code);

        if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.fatal) {
          console.log('🔁 Reconnecting to MySQL...');
          await this.reconnect();
        }
      });
    } catch (error) {
      console.error('❌ MySQL connection failed:', error);
      setTimeout(() => this.connect(), 5000); // Повтор через 5 секунд
    }
  }

  private async reconnect(): Promise<void> {
    this.connection = null;
    await this.connect();
  }

  async query(sql: string, params?: any[]): Promise<any> {
    const conn = await this.createConnection();

    try {
      return conn.query(sql, params);
    } catch (err: any) {
      if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.fatal) {
        console.log('🔄 Reconnecting and retrying query...');
        await this.reconnect();

        const newConn = await this.createConnection();

        return newConn.query(sql, params);
      }

      throw err;
    }
  }
}


// import mysql from 'mysql2/promise';
//
// // Create the connection to database
// export class mysqlConnection {
//   connection: any;
//   constructor() {
//     this.connection = null
//   }
//
//   async createConnection(): Promise<any> {
//     this.connection = await mysql.createConnection({
//       host: process.env.DB_HOST,
//       user: process.env.DB_USER,
//       password: process.env.DB_PASSWORD,
//       database: process.env.DB_DATABASE,
//     });
//     return this.connection;
//   }
// }
// //
// // // A simple SELECT query
// // try {
// //   const [results, fields] = await connection.query(
// //     'SELECT * FROM `users`'
// //   );
// //
// //   console.log(results); // results contains rows returned by server
// //   console.log(fields); // fields contains extra meta data about results, if available
// // } catch (err) {
// //   console.log(err);
// // }
// //
// // // Using placeholders
// // try {
// //   const [results] = await connection.query(
// //     'SELECT * FROM `table` WHERE `name` = ? AND `age` > ?',
// //     ['Page', 45]
// //   );
// //
// //   console.log(results);
// // } catch (err) {
// //   console.log(err);
// // }