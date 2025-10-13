import 'dotenv/config';
import {idbConnection} from "../core/interfaces";
import {BotListeners} from "../listeners";
import TelegramBot from "node-telegram-bot-api";

const API_KEY_BOT: any = process.env.API_KEY_BOT;

export class BotFacade {

  private readonly dbConnection: idbConnection;
  private readonly telegramBot: TelegramBot;

  constructor(dbConnection: idbConnection) {
    this.dbConnection = dbConnection;
    this.telegramBot = new TelegramBot(API_KEY_BOT, {
      polling: {
        interval: 300,
        autoStart: true
      }
    });
  }

  async runBot() {
    await this.setMyCommands();
    this.initBotListeners()
  }

  private initBotListeners() {
    const botListeners = new BotListeners(this.telegramBot);
    botListeners.init(this.dbConnection);
    return this;
  }

  async setMyCommands() {
    await this.telegramBot.setMyCommands([
      {command: '/menu', description: 'Menu'},
      {command: '/help', description: 'Help'},
    ]);
    return this;
  }
}