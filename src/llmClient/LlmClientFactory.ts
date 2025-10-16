const grpc = await import('@grpc/grpc-js');
const protoLoader = await import('@grpc/proto-loader');

export class LlmClientFactory {

  static async getLlm() {

    // Загружаем proto
    const PROTO_PATH = '/Users/serhiinarozhnyi/www/telegram-bot/grpc/warehouse.proto';
    console.log('PROTO_PATH', PROTO_PATH);
    const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true,
    });

    return grpc.loadPackageDefinition(packageDefinition).llm;

  }
}

// 👇 Пример запроса: задать вопрос
// llmClient.Ask({ question: 'У тебя есть шурупы?' }, (err: any, response: any) => {
//   if (err) return console.error('❌ Ошибка:', err.message);
//   console.log('✅ Ответ:', response.answer);
//   console.log('📦 Результаты:', response.json_results);
// });

