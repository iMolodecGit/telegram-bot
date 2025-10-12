
import {idbConnection, iOnListener, iUseCase,} from "../core/interfaces";
import TelegramBot from "node-telegram-bot-api";
import {userRepository} from "../repositories/userRepository";
import {onContactUseCase} from "../useCases/onContactUseCase";

export class onContact implements iOnListener {
  private readonly bot: TelegramBot;
  private readonly useCase : iUseCase;
  constructor(bot: TelegramBot, dbConnection: idbConnection) {
    this.bot = bot;
    let _userRepository = new userRepository(dbConnection);
    this.useCase = new onContactUseCase(bot, _userRepository);

    this.setListener();
  }

  setListener() {
    this.bot.on('contact', this.useCase.execute.bind(this.useCase));
  }

}