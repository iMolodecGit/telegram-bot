import {iRepository, iUseCase} from "../core/interfaces";
import TelegramBot, {Message} from "node-telegram-bot-api";
import fs from "fs";
import {UserEntity} from "../domain/entities/user.entity";

export class onTextUseCase implements iUseCase {

  private telegramBot: TelegramBot;
  private readonly userRepository: iRepository;

  constructor(bot: TelegramBot, userRepository: iRepository) {
    this.telegramBot = bot;
    this.userRepository = userRepository;
  }

  async execute(msg: Message) {

    try {
      if (msg.text?.startsWith('/start')) {
        await this.startAction(msg);
      } else if (msg.text == '/ref') {
        await this.refAction(msg);
      } else if (msg.text == '/help') {
        await this.helpAction(msg);
      } else if (msg.text == '/menu') {
        await this.menuAction(msg);
      } else if (msg.text == '❌ Close menu') {
        await this.closeMenuAction(msg);
      } else if (msg.text == '⭐️ Image') {
        await this.sendImg(msg);
      } else {
        await this.processDefaultText(msg)
      }
    } catch (error) {
      console.log('onText error:', error);
    }
  }

  private async processDefaultText(msg: Message) {
    console.log(msg);

    const text: string = msg.text ?? '';
    const msgWait = await this.telegramBot.sendMessage(msg.chat.id, `Бот генерирует ответ...`);

    setTimeout(async () => {
      await this.telegramBot.deleteMessage(msgWait.chat.id, msgWait.message_id);
      await this.telegramBot.sendMessage(msg.chat.id, text);
    }, 2500);
  }

  private async startAction(msg: Message) {
    await this.telegramBot.sendMessage(msg.chat.id, `You start the iMolodec bot!`);

    const text: string = msg.text ?? '';

    if (text.length > 6) {
      const refID = text.slice(7);

      await this.telegramBot.sendMessage(msg.chat.id, `You've opened the bot by ref from user ID ${refID}`);
    }
  }

  private async refAction(msg: Message) {
    await this.telegramBot.sendMessage(msg.chat.id, `${process.env.URL_TO_BOT}?start=${msg.from?.id}`);
  }

  private async helpAction(msg: Message) {
    await this.telegramBot.sendMessage(msg.chat.id, `Раздел помощи HTML\n\n<b>Жирный Текст</b>\n<i>Текст Курсивом</i>\n<code>Текст с Копированием</code>\n<s>Перечеркнутый текст</s>\n<u>Подчеркнутый текст</u>\n<pre language='c++'>код на c++</pre>\n<a href='t.me'>Гиперссылка</a>`, {
      parse_mode: "HTML"
    });

    await this.telegramBot.sendMessage(msg.chat.id, 'Раздел помощи Markdown\n\n*Жирный Текст*\n_Текст Курсивом_\n`Текст с Копированием`\n~Перечеркнутый текст~\n``` код ```\n||скрытый текст||\n[Гиперссылка](t.me)', {
      parse_mode: "MarkdownV2"
    });
  }

  private async menuAction(msg: Message) {
    await this.telegramBot.sendMessage(msg.chat.id, `Меню бота`, {
      reply_markup: {
        keyboard: [
          [{text: '⭐️ Image'}],
          [{text: '⭐️ Contact', request_contact: true}, {text: '⭐️ Location', request_location: true}],
          [{text: '❌ Close menu'}]
        ],
        resize_keyboard: true
      }
    })
  }

  private async closeMenuAction(msg: Message) {
    await this.telegramBot.sendMessage(msg.chat.id, 'Меню закрыто', {
      reply_markup: {
        remove_keyboard: true
      }
    })
  }

  private async sendImg(msg: Message) {
    const user: UserEntity = await this.userRepository.findOneByChatId(msg.chat.id);

    if (!user) {
      await this.messageUserNotFound(msg.chat.id);

      return;
    }

    const baseDir = './photo';

    const fileName = user.photo_1;

    if (!fileName) {
      console.log('Photo is empty. Chat id: ', msg.chat.id, 'User name', msg.from?.username);
      await this.messageImageNotFound(msg.chat.id);
    }

    const filePath = `${baseDir}/${msg.chat.id}/${fileName}`;

    try {
      fs.accessSync(filePath);

      const imageBuffer = fs.readFileSync(filePath);

      await this.telegramBot.sendPhoto(msg.chat.id, imageBuffer, {
        caption: '<b>Your image is here</b>',
        parse_mode: 'HTML'
      }, {
        // Explicitly specify the file name.
        filename: 'image.jpg',
        // Explicitly specify the MIME type.
        contentType: 'image/jpg',
      });
    } catch {
      console.log('Photo is forbidden. Chat id: ', msg.chat.id, 'User name', msg.from?.username);
      await this.messageImageNotFound(msg.chat.id);
    }
  }

  messageImageNotFound(chatId: number) {
    return this.telegramBot.sendMessage(chatId, '<b>Oops! Your image is not found</b>', {
      parse_mode: 'HTML'
    });
  }

  messageUserNotFound(chatId: number) {
    console.log('Not found User by chatId', chatId);

    return this.telegramBot.sendMessage(chatId, '<b>Oops! Your user is not found. Please click button below</b>', {
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: [
          [{text: 'Проверить Подписку', callback_data: 'checkSubs'}],
          [{text: 'Закрыть Меню', callback_data: 'closeMenu'}]
        ]
      }
    });
  }

}