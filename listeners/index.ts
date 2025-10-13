import {onText} from "./onText";
import {onError} from "./onError";
import {iBotListener, idbConnection, iRepository} from "../core/interfaces";
import {onContact} from "./onContact";
import {onLocation} from "./onLocation";
import {onPhoto} from "./onPhoto";
import {UserRepository} from "../repositories/userRepository";
import TelegramBot from "node-telegram-bot-api";
export class BotListeners implements iBotListener {
    private readonly telegramBot: TelegramBot;
    constructor(bot: TelegramBot) {
        this.telegramBot = bot;
    }

    init( dbConnection: idbConnection ) {

        let _userRepository: iRepository = new UserRepository(dbConnection);
        const onTextListener = new onText(this.telegramBot, _userRepository);
        const onErrorListener = new onError(this.telegramBot);
        const onContactListener = new onContact(this.telegramBot, _userRepository);
        const onLocationListener = new onLocation(this.telegramBot);
        const onPhotoListener = new onPhoto(this.telegramBot, _userRepository);
    }

}


