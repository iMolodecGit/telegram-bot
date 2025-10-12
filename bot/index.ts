import 'dotenv/config';
import {iBot, iBotListener, idbConnection} from "../core/interfaces";
import {BotListeners} from "../listeners";
import TelegramBot from "node-telegram-bot-api";

const API_KEY_BOT: any = process.env.API_KEY_BOT;

export class Bot {

  private readonly _dbConnection: idbConnection;
  private readonly _bot: TelegramBot;

  constructor(dbConnection: idbConnection) {
    this._dbConnection = dbConnection;
    this._bot = new TelegramBot(API_KEY_BOT, {
      polling: {
        interval: 300,
        autoStart: true
      }
    });
  }

  async runBot() {
    await this.setMyCommands();
    this.initBotListeners()
    console.log('Bot is ready to work', new Date());
  }

  private initBotListeners() {
    const botListeners = new BotListeners(this._bot);
    botListeners.init(this._dbConnection);
    return this;
  }

  async setMyCommands() {
    await this._bot.setMyCommands([
      {command: '/menu', description: 'Menu'},
      {command: '/help', description: 'Help'},
    ]);
    return this;
  }
}