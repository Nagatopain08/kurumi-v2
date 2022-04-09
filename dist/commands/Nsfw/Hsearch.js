"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseCommand_1 = __importDefault(require("../../lib/BaseCommand"));
const axios_1 = __importDefault(require("axios"));
const request_1 = __importDefault(require("../../lib/request"));
const baileys_1 = require("@adiwajshing/baileys");
// import { MessageType, Mimetype } from '@adiwajshing/baileys'
class Command extends BaseCommand_1.default {
    constructor(client, handler) {
        super(client, handler, {
            command: 'hsearch',
            description: `Gives you the data of the given Hentai.`,
            aliases: ['hs'],
            category: 'nsfw',
            usage: `${client.config.prefix}hsearch [title]`,
            baseXp: 50
        });
        this.run = (M, { joined }) => __awaiter(this, void 0, void 0, function* () {
            if (!joined)
                return void (yield M.reply(`Give me a manga title, Baka!`));
            const chitoge = joined.trim();
            console.log(chitoge);
            const { data } = yield axios_1.default.get(`https://velgrynd.herokuapp.com/api/nhentai?code=${chitoge}`);
            if (!(yield this.client.getGroupData(M.from)).nsfw)
                return void M.reply(`Sorry NSFW is not enabled`);
            const buffer = yield request_1.default.buffer(data.result.hasil.cover).catch((e) => {
                return void M.reply(e.message);
            });
            while (true) {
                try {
                    M.reply(buffer || '✖ An error occurred. Please try again later.', baileys_1.MessageType.image, undefined, undefined, `🎀 *Title:* ${data.result.hasil.title.default}\n💮 *ID:* ${data.result.hasil.id}\n🌸 *Language:* ${data.result.hasil.language}\n🀄 *parodies* :  ${data.result.hasil.details.parodies[0].name}\n${data.result.hasil.details.parodies[0].count}\n${data.result.hasil.details.parodies[0].link}\n 📃 *Artist* : ${data.result.hasil.details.artists[0].name}\n🗻 Favourites : ${data.result.hasil.favorites}\n 🎛*Uploaded* : ${data.result.hasil.uploadedAt}\n*${data.result.hasil.link}*   `, undefined).catch((e) => {
                        console.log(`This error occurs when an image is sent via M.reply()\n Child Catch Block : \n${e}`);
                        // console.log('Failed')
                        M.reply(`✖ An error occurred. Please try again later.`);
                    });
                    break;
                }
                catch (e) {
                    // console.log('Failed2')
                    M.reply(`✖ An error occurred. Please try again later.`);
                    console.log(`This error occurs when an image is sent via M.reply()\n Parent Catch Block : \n${e}`);
                }
            }
            return void null;
        });
    }
}
exports.default = Command;
