import type {iOnListener, iRepository, iUseCase,} from "../core/interfaces.ts";
import TelegramBot from "node-telegram-bot-api";
import {onPhotoUseCase} from "../useCases/onPhotoUseCase.ts";

export class onPhotoEvent implements iOnListener {
  private readonly telegramBot: TelegramBot;
  private readonly onPhotoUseCase: iUseCase;

  constructor(bot: TelegramBot, userRepository: iRepository) {
    this.telegramBot = bot;
    this.onPhotoUseCase = new onPhotoUseCase(bot, userRepository)
    this.setListener();
  }

  setListener() {
    this.telegramBot.on('photo', this.onPhotoUseCase.execute.bind(this.onPhotoUseCase));
  }

}