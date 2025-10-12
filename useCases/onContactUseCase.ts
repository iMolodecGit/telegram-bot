import {iContact, iUseCase} from "../core/interfaces";
import TelegramBot from "node-telegram-bot-api";
import {UserMapper} from "../core/mappers/user.mapper";
import {UserEntity} from "../core/entities/user.entity";

export class onContactUseCase implements iUseCase {

  private readonly _bot: TelegramBot;
  private readonly _userRepository;
  constructor(bot: TelegramBot, userRepository: any) {
    this._bot = bot;
    this._userRepository = userRepository;
  }

  async execute(contact: iContact) {
    try {

      let userDto = {
        name: contact.chat.username,
        first_name: contact.contact.first_name,
        phone_number: contact.contact.phone_number,
        chat_id: contact.chat.id,
        photo_1: null,
      }

      let user: UserEntity = UserMapper.toEntity(userDto);
      this._userRepository.save(user);

      console.log('Contact:', contact);
      await this._bot.sendMessage(contact.chat.id, `Number : ${contact.contact.phone_number}\nName: ${contact.contact.first_name}`);
    }
    catch(error) {
      console.log(error);
    }
  }
}