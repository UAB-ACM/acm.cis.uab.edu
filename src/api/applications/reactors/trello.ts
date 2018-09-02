import {Application} from "../Application";
import {Trello} from "../../core/trello/Trello";

export const pushApplicationToTrello =
    (trello: Trello) =>
        (list: string) =>
            (app: Application) =>
                trello.addCard(list)({
                    name: `Officer application from ${app.blazer_id}`,
                    desc: JSON.stringify(app, null, 3),
                    pos: 'top',
                    due: null
                })