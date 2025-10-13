
import {iOnListener, iReporitory, iUseCase,} from "../core/interfaces";
import TelegramBot from "node-telegram-bot-api";
import {onTextUseCase} from "../useCases/onTextUseCase";

export class onText implements iOnListener {
  private readonly _bot: TelegramBot;
  private readonly _onTextUseCase: iUseCase;

  constructor(bot: TelegramBot, userRepository: iReporitory) {
    this._bot = bot;
    // this.bot.sendMessage(407836459, 'I\'m ready to start');
    this._onTextUseCase = new onTextUseCase(this._bot, userRepository);
    this.setListener();
  }

  setListener() {
    this._bot.on('text', this._onTextUseCase.execute.bind(this._onTextUseCase));
  }

}