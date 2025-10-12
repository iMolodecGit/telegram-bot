
import {iError, iMessage, iOnListener,} from "../core/interfaces";

export class onError implements iOnListener {
  private readonly bot;

  constructor(bot: any) {
    this.bot = bot;
    this.setListener();
  }

  setListener() {
    this.setPollingErrorListener();
  }
  private setPollingErrorListener() {
    this.bot.on("polling_error", (err: iError) => console.log(err.data?.error.message));
  }
}