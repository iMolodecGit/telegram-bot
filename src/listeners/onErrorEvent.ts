import type {iOnListener,} from "../core/interfaces.ts";
import TelegramBot from "node-telegram-bot-api";

export class onErrorEvent implements iOnListener {
  private readonly telegramBot: TelegramBot;

  constructor(bot: TelegramBot) {
    this.telegramBot = bot;
    this.setListener();
  }

  setListener() {
    this.setPollingErrorListener();
  }
  private setPollingErrorListener() {
    this.telegramBot.on("polling_error", (err: Error) => console.log(err.message));
  }
}