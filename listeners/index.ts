import {onText} from "./onText";
import {onError} from "./onError";
import {iBotListener, idbConnection, iReporitory} from "../core/interfaces";
import {onContact} from "./onContact";
import {onLocation} from "./onLocation";
import {onPhoto} from "./onPhoto";
import {UserRepository} from "../repositories/userRepository";
export class BotListeners implements iBotListener {
    private readonly bot;
    constructor(botInstance: any) {
        this.bot = botInstance;
    }

    init( dbConnection: idbConnection ) {

        let _userRepository: iReporitory = new UserRepository(dbConnection);
        const onTextListener = new onText(this.bot, _userRepository);
        const onErrorListener = new onError(this.bot);
        const onContactListener = new onContact(this.bot, _userRepository);
        const onLocationListener = new onLocation(this.bot);
        const onPhotoListener = new onPhoto(this.bot, _userRepository);
    }

}


