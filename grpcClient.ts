const grpc = await import('@grpc/grpc-js');
import protoLoader from '@grpc/proto-loader';
import path from 'path';
import { fileURLToPath } from 'url';

// 👇 Чтобы корректно работать с __dirname в ES-модулях
// @ts-ignore
 const __filename = fileURLToPath(import.meta.url);
 // const __dirname = path.dirname(__filename);
//
// // Загружаем proto
// const PROTO_PATH = path.join(__dirname, '/grpc/warehouse.proto');
const PROTO_PATH = '/Users/serhiinarozhnyi/www/telegram-bot/grpc/warehouse.proto';
console.log('PROTO_PATH', PROTO_PATH);
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const llm = grpc.loadPackageDefinition(packageDefinition).llm as any;

// Создаём клиент
const llmClient = new llm.LLMService(
  'localhost:50051',
  grpc.credentials.createInsecure()
);

// 👇 Пример запроса: задать вопрос
llmClient.Ask({ question: 'У тебя есть шурупы?' }, (err: any, response: any) => {
  if (err) return console.error('❌ Ошибка:', err.message);
  console.log('✅ Ответ:', response.answer);
  console.log('📦 Результаты:', response.json_results);
  console.log('📦 Response:', response);
});
