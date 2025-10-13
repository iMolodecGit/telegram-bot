import {iOnListener, iReporitory, iUseCase,} from "../core/interfaces";
import TelegramBot from "node-telegram-bot-api";
import {onPhotoUseCase} from "../useCases/onPhotoUseCase";

export class onPhoto implements iOnListener {
  private readonly _bot: TelegramBot;
  private readonly _onPhotoUseCase: iUseCase;

  constructor(bot: TelegramBot, userRepository: iReporitory) {
    this._bot = bot;
    this._onPhotoUseCase = new onPhotoUseCase(bot, userRepository)
    this.setListener();
  }

  setListener() {
    this._bot.on('photo', this._onPhotoUseCase.execute.bind(this._onPhotoUseCase));
  }

}