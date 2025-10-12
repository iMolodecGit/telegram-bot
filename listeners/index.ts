import {onText} from "./onText";
import {onError} from "./onError";
import {iBotListener, idbConnection} from "../core/interfaces";
import {onContact} from "./onContact";
import {onLocation} from "./onLocation";
import {onPhoto} from "./onPhoto";
export class BotListeners implements iBotListener {
    private readonly bot;
    constructor(botInstance: any) {
        this.bot = botInstance;
    }

    init( dbConnection: idbConnection ) {
        const onTextListener = new onText(this.bot);
        const onErrorListener = new onError(this.bot);
        const onContactListener = new onContact(this.bot, dbConnection);
        const onLocationListener = new onLocation(this.bot);
        const onPhotoListener = new onPhoto(this.bot);
    }

}


