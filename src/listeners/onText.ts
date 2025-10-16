import type {iOnListener, iRepository, iUseCase,} from "../core/interfaces.ts";
import TelegramBot from "node-telegram-bot-api";
import {onTextUseCase} from "../useCases/onTextUseCase.ts";
import {LLMServiceClient} from "../grpc/warehouse.ts";

export class onText implements iOnListener {
  private readonly telegramBot: TelegramBot;
  private readonly onTextUseCase: iUseCase;
  private readonly llmClient: LLMServiceClient;

  constructor(bot: TelegramBot, userRepository: iRepository, llmClient: LLMServiceClient) {
    this.telegramBot = bot;
    this.llmClient = llmClient;
    this.onTextUseCase = new onTextUseCase(this.telegramBot, userRepository, this.llmClient);
    this.setListener();
  }

  setListener() {
    this.telegramBot.on('text', this.onTextUseCase.execute.bind(this.onTextUseCase));
  }

}