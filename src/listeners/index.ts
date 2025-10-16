import {onText} from "./onText.ts";
import {onErrorEvent} from "./onErrorEvent.ts";
import type {iBotListener, iDbConnection, iRepository} from "../core/interfaces.ts";
import {onContactEvent} from "./onContactEvent.ts";
import {onLocationEvent} from "./onLocationEvent.ts";
import {onPhotoEvent} from "./onPhotoEvent.ts";
import {UserRepository} from "../repositories/userRepository.ts";
import TelegramBot from "node-telegram-bot-api";
import {LLMServiceClient} from "../grpc/warehouse.ts";
export class BotListeners implements iBotListener {
  private readonly telegramBot: TelegramBot;
  private readonly llmClient: LLMServiceClient;
  constructor(bot: TelegramBot, llmClient: LLMServiceClient) {
    this.telegramBot = bot;
    this.llmClient = llmClient;
  }

  init( dbConnection: iDbConnection ) {
    const _userRepository: iRepository = new UserRepository(dbConnection);
    new onText(this.telegramBot, _userRepository, this.llmClient);
    new onErrorEvent(this.telegramBot);
    new onContactEvent(this.telegramBot, _userRepository);
    new onLocationEvent(this.telegramBot);
    new onPhotoEvent(this.telegramBot, _userRepository);
  }

}


