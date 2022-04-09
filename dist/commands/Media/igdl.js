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
            command: 'igdl',
            aliases: ['igdl', 'igpr'],
            description: 'Download the post/video from ig ',
            category: 'media',
            dm: true,
            usage: `${client.config.prefix}igdl [link]`
        });
        // static count = 0
        this.run = (M, { joined }) => __awaiter(this, void 0, void 0, function* () {
            if (!joined)
                return void M.reply('Provide the keywords you wanna search, Baka!');
            const chitoge = joined.trim();
            console.log(chitoge);
            const { data } = yield axios_1.default.get(`https://hanzz-web.herokuapp.com/api/igdl?url=${chitoge}`);
            if (data.result.error)
                return void M.reply(`*Sorry, couldn\'t find or some errors occurred*`);
            switch (data.result.medias[0].type) {
                case 'image':
                    M.reply(yield request_1.default.buffer(data.result.medias[0].url), baileys_1.MessageType.image, undefined, undefined, `Here you go`, undefined);
                    break;
                case 'video':
                    M.reply(yield request_1.default.buffer(data.result.medias[0].url), baileys_1.MessageType.video, undefined, undefined, `Here you go`, undefined);
                    break;
                default:
                    M.reply("Invalid format");
            }
        });
    }
}
exports.default = Command;
