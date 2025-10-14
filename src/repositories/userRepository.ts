import {iDbConnection, iRepository} from "../core/interfaces";
import {UserEntity} from "../domain/entities/user.entity";
import {UserMapper} from "../core/mappers/user.mapper";
import {UserRowDto} from "../core/dto/userRow.dto";

export class UserRepository implements iRepository{
  private _dbConnection: iDbConnection;
  constructor(dbConnection: iDbConnection) {
    this._dbConnection = dbConnection;
  }

  async findOneByChatId(chatId:number) {
    try {
      const [results] = await this._dbConnection.query(
        'SELECT * FROM `user` where chat_id = ? LIMIT 1',
        [chatId]
      );

      if (results.length == 0 ) {
        return null;
      }

      return UserMapper.toEntity(results[0]);
    } catch (err) {
      console.log(err);
    }

    return null;
  }

  async getAll():Promise<UserEntity[]> {
    try {
      const [results] = await this._dbConnection.query(
        'SELECT * FROM `user`'
      );

      return results.reduce((item: UserRowDto)=> UserMapper.toEntity(item), []);
    } catch (err) {
      console.log(err);
    }

    return [];
  }

  async save(user: UserEntity) {
    const userDto: UserRowDto = UserMapper.toDto(user);
    let results = false;
    try {
      [results] = await this._dbConnection.query(
        'INSERT IGNORE INTO `user` (`name`, `first_name`, `phone_number`, `chat_id`, `photo_1`)\n' +
        'VALUES (?, ?, ?, ?, ?);',
        [userDto.name, userDto.first_name, userDto.phone_number, userDto.chat_id, userDto.photo_1]
      );
      console.log('Save User result', results);
    } catch (err) {
      console.log(err);
    }

    return results;
  }

  async updatePhoto(chatId: number, value: string|null) {

    try {
      const [results] = await this._dbConnection.query(
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