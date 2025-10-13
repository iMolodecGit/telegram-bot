export interface iMessage {
  from: any;
  chat: { id: any; };
  text: any;
}

export interface iMessagePhoto {
  from: any;
  chat: { id: number; first_name: string };
  text: any;
  photo: [{
    file_id:string,
    file_unique_id: string,
    file_size: number,
    width: number,
    height: number
  }];
}

export interface iOnListener {
  setListener(): void
}

export interface iBotListener {
  init(dbConnection: any): void
}

export interface iError {
  data: {
    error: {
      message: any;
    };
  };
}

export interface iContact {
  chat: {
    id: number,
    username: string,
  },
  contact: {
    phone_number: any,
    first_name: any
  }
}

export interface iLocation {
  chat: {
    id: number
  },
  location: {
    latitude: number,
    longitude: number
  }
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

export interface iReporitory {
  findOneByChatId: any;
  getAll: any,
  save: any,
  updatePhoto: any,
}

