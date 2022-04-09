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
const baileys_1 = require("@adiwajshing/baileys");
const request_1 = __importDefault(require("../../lib/request"));
const BaseCommand_1 = __importDefault(require("../../lib/BaseCommand"));
const axios_1 = __importDefault(require("axios"));
class Command extends BaseCommand_1.default {
    constructor(client, handler) {
        super(client, handler, {
            command: 'trandingyt',
            aliases: ['ty', 'tyt'],
            description: 'Gives you the trending list of yt ',
            category: 'utils',
            usage: `${client.config.prefix}trandingyt [title]`
        });
        // static count = 0
        this.run = (M, { joined }) => __awaiter(this, void 0, void 0, function* () {
            if (!joined)
                return void M.reply('✖ Provide an item name to search, Baka!');
            const chitoge = joined.trim();
            console.log(chitoge);
            const { data } = yield axios_1.default.get(`https://api-xcoders.xyz/api/info/trend/youtube?country=${chitoge}&apikey=Zl0clXuAbx`);
            const buffer = yield request_1.default.buffer(data.result.data[0].thumbnail).catch((e) => {
                return void M.reply(e.message);
            });
            while (true) {
                try {
                    M.reply(buffer || '✖ An error occurred. Please try again later', baileys_1.MessageType.image, undefined, undefined, `${data.result.message}\n${data.result.updated_at}\n*(1)* ${data.result.data[0].title}\n ${data.result.data[0].url}\n ${data.result.data[0].channel}\n ${data.result.data[0].uploaded_at}\n ${data.result.data[0].viewers}\n ${data.result.data[0].likes}\n ${data.result.data[0].comments}\n${data.result.data[0].description}\n\n*(2)* ${data.result.data[1].title}\n ${data.result.data[1].url}\n ${data.result.data[1].channel}\n ${data.result.data[1].uploaded_at}\n ${data.result.data[1].viewers}\n ${data.result.data[1].likes}\n ${data.result.data[1].comments}\n${data.result.data[1].description}\n\n*(3)* ${data.result.data[2].title}\n ${data.result.data[2].url}\n ${data.result.data[2].channel}\n ${data.result.data[2].uploaded_at}\n ${data.result.data[2].viewers}\n ${data.result.data[2].likes}\n ${data.result.data[2].comments}\n${data.result.data[2].description} `, undefined).catch((e) => {
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
