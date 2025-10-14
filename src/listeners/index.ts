import {onText} from "./onText";
import {onErrorEvent} from "./onErrorEvent";
import {iBotListener, iDbConnection, iRepository} from "../core/interfaces";
import {onContactEvent} from "./onContactEvent";
import {onLocationEvent} from "./onLocationEvent";
import {onPhotoEvent} from "./onPhotoEvent";
import {UserRepository} from "../repositories/userRepository";
import TelegramBot from "node-telegram-bot-api";
export class BotListeners implements iBotListener {
  private readonly telegramBot: TelegramBot;
  constructor(bot: TelegramBot) {
    this.telegramBot = bot;
  }

  init( dbConnection: iDbConnection ) {
    const _userRepository: iRepository = new UserRepository(dbConnection);
    new onText(this.telegramBot, _userRepository);
    new onErrorEvent(this.telegramBot);
    new onContactEvent(this.telegramBot, _userRepository);
    new onLocationEvent(this.telegramBot);
    new onPhotoEvent(this.telegramBot, _userRepository);
  }

}


