import 'dotenv/config';
import type { iDbConnection } from '../core/interfaces.ts';
import { BotListeners } from '../listeners/index.ts';
import TelegramBot from 'node-telegram-bot-api';
import {LLMServiceClient} from "../grpc/warehouse.ts";

const API_KEY_BOT = process.env.API_KEY_BOT!;

export class BotFactory {
  private llmClient
  static async createBot(dbConnection: iDbConnection, llmClient: LLMServiceClient): Promise<TelegramBot> {
    this.llmClient = llmClient;
    const telegramBot = new TelegramBot(API_KEY_BOT, {
      polling: {
        interval: 300,
        autoStart: true,
      },
    });

    // this.llmClient.Ask({ question: 'У тебя есть шурупы?' }, (err: any, response: any) => {
    //   if (err) return console.error('❌ Ошибка:', err.message);
    //
    //   console.log('✅ Ответ:', response.answer);
    //   console.log('📦 Результаты:', response.json_results);
    // });

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
    const botListeners = new BotListeners(bot, this.llmClient);

    botListeners.init(dbConnection);
  }
}
