import type {LLMServiceClient} from "../grpc/warehouse.js";

const grpc = await import('@grpc/grpc-js');
const protoLoader = await import('@grpc/proto-loader');

export class LlmClientFactory {

  static async getLlmClient(): Promise<LLMServiceClient> {

    // Загружаем proto
    const packageDefinition = protoLoader.loadSync(process.env.LLM_PROTO_PATH as string, {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true,
    });


    const llmPackage = grpc.loadPackageDefinition(packageDefinition).llm as any;

    const llmClient: LLMServiceClient = new llmPackage.LLMService(
      process.env.LLM_PROTO_HOST,
      grpc.credentials.createInsecure()
    );

    return llmClient;

  }
}

// 👇 Пример запроса: задать вопрос
// llmClient.Ask({ question: 'У тебя есть шурупы?' }, (err: any, response: any) => {
//   if (err) return console.error('❌ Ошибка:', err.message);
//   console.log('✅ Ответ:', response.answer);
//   console.log('📦 Результаты:', response.json_results);
// });

