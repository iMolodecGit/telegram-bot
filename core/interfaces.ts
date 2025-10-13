export interface iOnListener {
  setListener(): void
}

export interface iBotListener {
  init(dbConnection: any): void
}

export interface idbConnection {
  query: any
}

export interface iBot{
  runBot: any,
  setMyCommands: any
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

