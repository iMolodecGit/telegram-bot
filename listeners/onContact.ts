
import {iOnListener, iRepository, iUseCase,} from "../core/interfaces";
import TelegramBot from "node-telegram-bot-api";
import {onContactUseCase} from "../useCases/onContactUseCase";

export class onContact implements iOnListener {
  private readonly telegramBot: TelegramBot;
  private readonly onContactUseCase : iUseCase;
  constructor(bot: TelegramBot, userRepository: iRepository) {
    this.telegramBot = bot;
    this.onContactUseCase = new onContactUseCase(bot, userRepository);

    this.setListener();
  }

  setListener() {
    this.telegramBot.on('contact', this.onContactUseCase.execute.bind(this.onContactUseCase));
  }

}