import {iContact, iMessage, iUseCase} from "../core/interfaces";
import TelegramBot from "node-telegram-bot-api";

export class onTextUseCase implements iUseCase {

  private _bot: TelegramBot

  constructor(bot: TelegramBot) {
    this._bot = bot;
  }

  async execute(msg: iMessage) {

    try {
      if (msg.text.startsWith('/start')) {
        await this.startAction(msg);
      } else if (msg.text == '/ref') {
        await this.refAction(msg);
      } else if (msg.text == '/help') {
        await this.helpAction(msg);
      } else if (msg.text == '/menu') {
        await this.menuAction(msg);
      } else if (msg.text == '❌ Закрыть меню') {
        await this.closeMenuAction(msg);
      } else {
        await this.processDefaultText(msg)
      }
    } catch (error) {
      console.log('onText error:', error);
    }
  }

  private async processDefaultText(msg: iMessage) {
    console.log(msg);
    const msgWait = await this._bot.sendMessage(msg.chat.id, `Бот генерирует ответ...`);

    setTimeout(async () => {
      await this._bot.deleteMessage(msgWait.chat.id, msgWait.message_id);
      await this._bot.sendMessage(msg.chat.id, msg.text);
    }, 2500);
  }

  private async startAction(msg: iMessage) {
    await this._bot.sendMessage(msg.chat.id, `You start the iMolodec bot!`);

    if (msg.text.length > 6) {
      const refID = msg.text.slice(7);
      await this._bot.sendMessage(msg.chat.id, `You've opened the bot by ref from user ID ${refID}`);
    }
  }

  private async refAction(msg: iMessage) {
    await this._bot.sendMessage(msg.chat.id, `${process.env.URL_TO_BOT}?start=${msg.from.id}`);
  }

  private async helpAction(msg: iMessage) {
    await this._bot.sendMessage(msg.chat.id, `Раздел помощи HTML\n\n<b>Жирный Текст</b>\n<i>Текст Курсивом</i>\n<code>Текст с Копированием</code>\n<s>Перечеркнутый текст</s>\n<u>Подчеркнутый текст</u>\n<pre language='c++'>код на c++</pre>\n<a href='t.me'>Гиперссылка</a>`, {
      parse_mode: "HTML"
    });

    await this._bot.sendMessage(msg.chat.id, 'Раздел помощи Markdown\n\n*Жирный Текст*\n_Текст Курсивом_\n`Текст с Копированием`\n~Перечеркнутый текст~\n``` код ```\n||скрытый текст||\n[Гиперссылка](t.me)', {
      parse_mode: "MarkdownV2"
    });
  }

  private async menuAction(msg: iMessage) {
    await this._bot.sendMessage(msg.chat.id, `Меню бота`, {
      reply_markup: {
        keyboard: [
          // ['⭐️ Картинка', '⭐️ Видео'],
          // ['⭐️ Аудио', '⭐️ Голосовое сообщение'],
          [{text: '⭐️ Контакт', request_contact: true}, {text: '⭐️ Геолокация', request_location: true}],
          [{text: '❌ Закрыть меню'}]
        ],
        resize_keyboard: true
      }
    })
  }

  private async closeMenuAction(msg: iMessage) {
    await this._bot.sendMessage(msg.chat.id, 'Меню закрыто', {
      reply_markup: {
        remove_keyboard: true
      }
    })
  }
}