import mysql from 'mysql2/promise';

// Create the connection to database
export class mysqlConnection {
  connection: any;
  constructor() {
    this.connection = null
  }

  async createConnection(): Promise<any> {
    this.connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    });
    return this.connection;
  }
}
//
// // A simple SELECT query
// try {
//   const [results, fields] = await connection.query(
//     'SELECT * FROM `users`'
//   );
//
//   console.log(results); // results contains rows returned by server
//   console.log(fields); // fields contains extra meta data about results, if available
// } catch (err) {
//   console.log(err);
// }
//
// // Using placeholders
// try {
//   const [results] = await connection.query(
//     'SELECT * FROM `table` WHERE `name` = ? AND `age` > ?',
//     ['Page', 45]
//   );
//
//   console.log(results);
// } catch (err) {
//   console.log(err);
// }