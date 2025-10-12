import {idbConnection, iReporitory} from "../core/interfaces";
import {UserEntity} from "../core/entities/user.entity";

export class userRepository implements iReporitory{
  private _dbConnection: idbConnection;
  constructor(dbConnection: idbConnection) {
    this._dbConnection = dbConnection;
  }

  async getAll() {
    try {
      const [results, fields] = await this._dbConnection.query(
        'SELECT * FROM `users`'
      );

      // console.log(results); // results contains rows returned by server
      // console.log(fields); // fields contains extra meta data about results, if available

      return results;
    } catch (err) {
      console.log(err);
    }

    return [];
  }

  async save(user: UserEntity) {
    let results = false;
    try {
       [results] = await this._dbConnection.query(
        'INSERT IGNORE INTO `user` (`name`, `first_name`, `phone_number`, `chat_id`, `photo_1`)\n' +
        'VALUES (?, ?, ?, ?, ?);',
        [user.name, user.first_name, user.phone_number, user.chat_id, user.photo_1]
      );

      console.log('Save User result', results);
    } catch (err) {
      console.log(err);
    }
    return results;
  }

}