import 'dotenv/config';
import type {iDbConnection} from "./core/interfaces.ts";
import {DbConnectionFactory} from "./core/db/dbConnectionFactory.ts";
import {BotFactory} from "./bot/index.ts";
import {LlmClientFactory} from "./llmClient/LlmClientFactory.ts";
import type {LLMServiceClient} from "./grpc/warehouse.ts";
const grpc = await import('@grpc/grpc-js');

async function run() {
  const dbConnection: iDbConnection = await DbConnectionFactory.createConnection('mysql');

  await BotFactory.createBot(dbConnection, llmClient);
}

const llmPackage = await LlmClientFactory.getLlm();

const llmClient: LLMServiceClient = new llmPackage.LLMService(
  'localhost:50051',
  grpc.credentials.createInsecure()
);



run().then(() => console.log('Bot is ready to work', new Date()));