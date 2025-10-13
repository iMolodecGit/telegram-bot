import { iRepository, iUseCase} from "../core/interfaces";
import TelegramBot, {Message, Metadata, PhotoSize} from "node-telegram-bot-api";
import fs from "fs";

const baseDir = `photo`;
export class onPhotoUseCase implements iUseCase {

  private readonly telegramBot: TelegramBot;
  private readonly userRepository: iRepository;
  constructor(bot: TelegramBot, userRepository: iRepository) {
    this.telegramBot = bot;
    this.userRepository = userRepository;
  }

  async execute(msg: Message, metadata: Metadata) {
    try {
      if (!msg.photo) {
        console.log('Photo is empty', metadata);
        return;
      }

      let chatId: number = msg.chat.id;
      let dir = this.createDownloadFolder(chatId);
      let fileName: string = await this.downloadPhoto(msg, dir);

      if (!fileName) {
        console.log('Download file error');
        return;
      }

      let result = await this.userRepository.updatePhoto(msg.chat.id, fileName);

      if (result) {
        console.log(`File saved from ${msg.chat.first_name} saved. Chat Id ${msg.chat.id}`);
      } else {
        console.error(`Error during file save from ${msg.chat.first_name}. Chat Id ${msg.chat.id}`);
      }
      await this.telegramBot.sendMessage(msg.chat.id, `Your photo saved!`);
    }
    catch(error) {
      console.log(error);
    }
  }

  private async downloadPhoto(msg: Message, dir: string) {

    let fileName = '';
    try {
      if (!msg.photo) {
        console.log('Photo is empty');
        return fileName;
      }

      let photo: PhotoSize = msg.photo[msg.photo.length - 1];

      let fileId = photo.file_id;

      let filePath = await this.telegramBot.downloadFile(fileId, dir);

      let filePathStructure = filePath.split('/');
      fileName = filePathStructure[filePathStructure.length - 1];
      console.log('Download File', fileName);
      return fileName;
    } catch (error) {
      console.log('Download file error', error);
    }
    return fileName;
  }

  private createDownloadFolder(chatId: number) {
    const dir = `${baseDir}/${chatId}`;

    if (!fs.existsSync(baseDir)){
      fs.mkdirSync(baseDir);
    }

    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
    }

    return dir;
  }
}