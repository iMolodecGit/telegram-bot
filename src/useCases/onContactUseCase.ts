import type {iRepository, iUseCase} from "../core/interfaces.ts";
import * as TelegramBot from "node-telegram-bot-api";
import {TelegramMessageUserMapper} from "../core/mappers/telegramMessageUser.mapper.ts";

export class onContactUseCase implements iUseCase {

  private readonly telegramBot: TelegramBot;
  private readonly userRepository: iRepository;
  constructor(bot: TelegramBot, userRepository: iRepository) {
    this.telegramBot = bot;
    this.userRepository = userRepository;
  }

  async execute(msg: TelegramBot.Message) {
    try {

      const user = TelegramMessageUserMapper.toEntity(msg);

      this.userRepository.save(user);

      console.log('Contact:', msg);
      await this.telegramBot.sendMessage(msg.chat.id, `Number : ${msg?.contact?.phone_number}\nName: ${msg?.contact?.first_name}`);
    }
    catch(error) {
      console.log(error);
    }
  }
}