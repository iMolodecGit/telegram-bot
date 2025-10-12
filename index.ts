import 'dotenv/config';
import {iBot, idbConnection} from "./core/interfaces";
import {dbConnection} from "./core/db/dbConnection";
import {Bot} from "./bot";

(new dbConnection()).init().then(async (dbConnection: idbConnection) => {
    const bot: iBot = new Bot(dbConnection);
    await bot.runBot();
});