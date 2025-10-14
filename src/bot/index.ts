import 'dotenv/config';
import { iDbConnection } from '../core/interfaces';
import { BotListeners } from '../listeners';
import TelegramBot from 'node-telegram-bot-api';

const API_KEY_BOT = process.env.API_KEY_BOT!;

export class BotFactory {
  static async createBot(dbConnection: iDbConnection): Promise<TelegramBot> {
    const telegramBot = new TelegramBot(API_KEY_BOT, {
      polling: {
        interval: 300,
        autoStart: true,
      },
    });

    this.initBotListeners(telegramBot, dbConnection);
    await this.setMyCommands(telegramBot);

    return telegramBot;
  }

  private static async setMyCommands(bot: TelegramBot) {
    await bot.setMyCommands([
      { command: '/menu', description: 'Menu' },
      { command: '/help', description: 'Help' },
    ]);
  }

  private static initBotListeners(bot: TelegramBot, dbConnection: iDbConnection) {
    const botListeners = new BotListeners(bot);

    botListeners.init(dbConnection);
  }
}
