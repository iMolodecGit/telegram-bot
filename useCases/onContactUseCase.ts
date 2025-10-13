import {iRepository, iUseCase} from "../core/interfaces";
import TelegramBot, {Message} from "node-telegram-bot-api";
import {UserMapper} from "../core/mappers/user.mapper";
import {UserEntity} from "../core/entities/user.entity";

export class onContactUseCase implements iUseCase {

  private readonly telegramBot: TelegramBot;
  private readonly userRepository: iRepository;
  constructor(bot: TelegramBot, userRepository: iRepository) {
    this.telegramBot = bot;
    this.userRepository = userRepository;
  }

  async execute(contact: Message) {
    try {

      let userDto = {
        name: contact.chat.username,
        first_name: contact?.contact?.first_name,
        phone_number: contact?.contact?.phone_number,
        chat_id: contact.chat.id,
        photo_1: null,
      }

      let user: UserEntity = UserMapper.toEntity(userDto);
      this.userRepository.save(user);

      console.log('Contact:', contact);
      await this.telegramBot.sendMessage(contact.chat.id, `Number : ${contact?.contact?.phone_number}\nName: ${contact?.contact?.first_name}`);
    }
    catch(error) {
      console.log(error);
    }
  }
}