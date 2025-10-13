import {idbConnection, iReporitory} from "../core/interfaces";
import {UserEntity} from "../core/entities/user.entity";
import {ResultSetHeader} from "mysql2";

export class UserRepository implements iReporitory{
  private _dbConnection: idbConnection;
  constructor(dbConnection: idbConnection) {
    this._dbConnection = dbConnection;
  }

  async findOneByChatId(chatId:number) {
    try {
      const [results, fields] = await this._dbConnection.query(
        'SELECT * FROM `user` where chat_id = ? LIMIT 1',
        [chatId]
      );

      // console.log(results); // results contains rows returned by server
      // console.log(fields); // fields contains extra meta data about results, if available

      return results;
    } catch (err) {
      console.log(err);
    }

    return [];
  }

  async getAll() {
    try {
      const [results, fields] = await this._dbConnection.query(
        'SELECT * FROM `user`'
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

  async updatePhoto(chatId: number, value: any) {

    try {
      let [results] = await this._dbConnection.query(
        'UPDATE `user` SET photo_1 = ? where chat_id = ?',
        [value, chatId]
      );

      console.log('Update User result', results);

      return results.affectedRows === 1;
    } catch (err) {
      console.log(err);
    }

    return false;

  }

}