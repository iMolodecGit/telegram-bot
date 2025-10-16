import type {iOnListener,} from "../core/interfaces.ts";
import * as TelegramBot from "node-telegram-bot-api";

export class onLocationEvent implements iOnListener {
  private readonly telegramBot: TelegramBot;

  constructor(bot: TelegramBot) {
    this.telegramBot = bot;
    this.setListener();
  }

  setListener() {
    this.telegramBot.on('location', async (location: TelegramBot.Message, metadata: TelegramBot.Metadata) => {
      try {
        console.log(location, metadata);
        await this.telegramBot.sendMessage(location.chat.id, `Lat: ${location.location?.latitude}\nLong: ${location.location?.longitude}`);
      }
      catch(error) {
        console.log(error);
      }
    })
  }

}