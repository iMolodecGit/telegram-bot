import * as TelegramBot from 'node-telegram-bot-api';
import { UserRowDto } from '../dto/userRow.dto.ts';
import {UserEntity} from "../../domain/entities/user.entity.ts";

export class TelegramMessageUserMapper {
  static toDto(message: TelegramBot.Message): UserRowDto {
    const userRowDto = new UserRowDto();

    userRowDto.name = message.chat.username;
    userRowDto.first_name= message.contact?.first_name;
    userRowDto.phone_number= message.contact?.phone_number;
    userRowDto.chat_id= message.chat.id;
    userRowDto.photo_1= null;

    return userRowDto;
  }

  public static toEntity(message: TelegramBot.Message): UserEntity {
    const user: UserEntity = new UserEntity();

    user.name = message.chat.username;
    user.firstName= message.contact?.first_name;
    user.phoneNumber= message.contact?.phone_number;
    user.chatId= message.chat.id;
    user.photo_1= null;

    return user;
  }
}
