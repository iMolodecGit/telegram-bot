import * as grpc from "@grpc/grpc-js";

export interface iOnListener {
  setListener(): void
}

export interface iBotListener {
  init(dbConnection: iDbConnection): void
}

export interface iDbConnection {
  createConnection: any,
  query: any
}

export interface iUseCase{
  execute: any,
}

export interface iRepository {
  findOneByChatId: any;
  getAll: any,
  save: any,
  updatePhoto: any,
}

export interface iLLMService extends grpc.Client {
  Ask(
    request: { question: string },
    callback: (error: grpc.ServiceError | null, response: { answer: string }) => void
  ): grpc.ClientUnaryCall;
}

