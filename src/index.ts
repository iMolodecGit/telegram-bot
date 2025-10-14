import 'dotenv/config';
import {iDbConnection} from "./core/interfaces";
import {DbConnectionFactory} from "./core/db/dbConnectionFactory";
import {BotFactory} from "./bot";

async function run() {
  const dbConnection: iDbConnection = await DbConnectionFactory.createConnection('mysql');

  await BotFactory.createBot(dbConnection);
}


run().then(() => console.log('Bot is ready to work', new Date()));