
import {iOnListener, iReporitory, iUseCase,} from "../core/interfaces";
import TelegramBot from "node-telegram-bot-api";
import {onContactUseCase} from "../useCases/onContactUseCase";

export class onContact implements iOnListener {
  private readonly bot: TelegramBot;
  private readonly onContactUseCase : iUseCase;
  constructor(bot: TelegramBot, userRepository: iReporitory) {
    this.bot = bot;
    this.onContactUseCase = new onContactUseCase(bot, userRepository);

    this.setListener();
  }

  setListener() {
    this.bot.on('contact', this.onContactUseCase.execute.bind(this.onContactUseCase));
  }

}