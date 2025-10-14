import {iOnListener, iRepository, iUseCase,} from "../core/interfaces";
import TelegramBot from "node-telegram-bot-api";
import {onTextUseCase} from "../useCases/onTextUseCase";

export class onText implements iOnListener {
  private readonly telegramBot: TelegramBot;
  private readonly onTextUseCase: iUseCase;

  constructor(bot: TelegramBot, userRepository: iRepository) {
    this.telegramBot = bot;
    this.onTextUseCase = new onTextUseCase(this.telegramBot, userRepository);
    this.setListener();
  }

  setListener() {
    this.telegramBot.on('text', this.onTextUseCase.execute.bind(this.onTextUseCase));
  }

}