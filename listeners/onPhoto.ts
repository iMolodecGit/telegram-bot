
// var fs = require('fs');
import fs from 'fs'
import {iMessagePhoto, iOnListener,} from "../core/interfaces";

export class onPhoto implements iOnListener {
  private readonly bot;

  constructor(bot: any) {
    this.bot = bot;
    this.setListener();
  }

  setListener() {
    this.bot.on('photo', async (msg:iMessagePhoto) => {

      let chatId: number = msg.chat.id;
      const baseDir = `photo`;
      const dir = `${baseDir}/${chatId}`;

      if (!fs.existsSync(baseDir)){
        fs.mkdirSync(baseDir);
      }

      if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
      }


      let photo = msg.photo[msg.photo.length-1];
      let fileId = photo.file_id;

      await this.bot.downloadFile(fileId, dir);

      console.log(`File savedfrom ${msg.chat.first_name} saved. Chat Id ${msg.chat.id}`)

    });
  }

}