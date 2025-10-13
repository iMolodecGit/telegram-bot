import 'dotenv/config';
import {iBot, idbConnection} from "./core/interfaces";
import {dbConnectionFacade} from "./core/db/dbConnectionFacade";
import {BotFacade} from "./bot";

async function run() {

    let _dbConnectionFacade: any = new dbConnectionFacade();
    let dbConnection: idbConnection = await _dbConnectionFacade.initConnection();
    const bot: iBot = new BotFacade(dbConnection);
    await bot.runBot();
}


run().then(() => console.log('Bot is ready to work', new Date()));