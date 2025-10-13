
import {iOnListener,} from "../core/interfaces";
import TelegramBot, {Message, Metadata} from "node-telegram-bot-api";

export class onLocation implements iOnListener {
  private readonly telegramBot: TelegramBot;

  constructor(bot: TelegramBot) {
    this.telegramBot = bot;
    this.setListener();
  }

  setListener() {
    this.telegramBot.on('location', async (location: Message, metadata: Metadata) => {
      try {
        console.log(location);
        await this.telegramBot.sendMessage(location.chat.id, `Lat: ${location.location?.latitude}\nLong: ${location.location?.longitude}`);
      }
      catch(error) {
        console.log(error);
      }
    })
  }

}