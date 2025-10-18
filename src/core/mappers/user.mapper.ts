import {UserEntity} from "../../domain/entities/user.entity.ts";
import {UserRowDto} from "../dto/userRow.dto.ts";

export class UserMapper {

  public static toDto(userEntity:UserEntity): UserRowDto {
    const userRowDto: UserRowDto = new UserRowDto();

    userRowDto.id = userEntity.id;
    userRowDto.name = userEntity.name;
    userRowDto.first_name = userEntity.firstName;
    userRowDto.chat_id = userEntity.chatId;
    userRowDto.phone_number = userEntity.phoneNumber;
    userRowDto.photo_1 = userEntity.photo_1;

    return userRowDto;
  }

  public static toEntity(userDto: UserRowDto): UserEntity {
    const user: UserEntity = new UserEntity();

    user.id = userDto.id;
    user.name = userDto.name;
    user.firstName = userDto.first_name;
    user.chatId = userDto.chat_id;
    user.phoneNumber = userDto.phone_number;
    user.photo_1 = userDto.photo_1;

    return user;
  }
}