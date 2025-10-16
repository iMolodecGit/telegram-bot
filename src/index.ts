import 'dotenv/config';
import type {iDbConnection} from "./core/interfaces.ts";
import {DbConnectionFactory} from "./core/db/dbConnectionFactory.ts";
import {BotFactory} from "./bot/index.ts";
import {LlmClientFactory} from "./llmClient/LlmClientFactory.ts";

async function run() {
  const dbConnection: iDbConnection = await DbConnectionFactory.createConnection('mysql');
  const llmClient = await LlmClientFactory.getLlmClient();

  await BotFactory.createBot(dbConnection, llmClient);
}

run().then(() => console.log('Bot is ready to work', new Date()));