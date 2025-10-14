import 'dotenv/config';
import {idbConnection} from "./core/interfaces";
import {DbConnectionFactory} from "./core/db/DbConnectionFactory";
import {BotFactory} from "./bot";

async function run() {
    let dbConnection: idbConnection = await DbConnectionFactory.createConnection('mysql');
    await BotFactory.createBot(dbConnection);
}


run().then(() => console.log('Bot is ready to work', new Date()));