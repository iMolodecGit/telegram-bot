
import {iLocation, iOnListener,} from "../core/interfaces";

export class onLocation implements iOnListener {
  private readonly bot;

  constructor(bot: any) {
    this.bot = bot;
    this.setListener();
  }

  setListener() {
    this.bot.on('location', async (location: iLocation) => {
      try {
        console.log(location);
        await this.bot.sendMessage(location.chat.id, `Lat: ${location.location.latitude}\nLong: ${location.location.longitude}`);
      }
      catch(error) {
        console.log(error);
      }
    })
  }

}