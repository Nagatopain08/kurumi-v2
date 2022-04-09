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
const request_1 = __importDefault(require("../../lib/request"));
const baileys_1 = require("@adiwajshing/baileys");
// import { MessageType, Mimetype } from '@adiwajshing/baileys'
class Command extends BaseCommand_1.default {
    constructor(client, handler) {
        super(client, handler, {
            command: 'mifi',
            description: `Will send you random mifi img.`,
            aliases: ['mifi'],
            category: 'nsfw',
            usage: `${client.config.prefix}mifi`,
            baseXp: 50
        });
        this.run = (M) => __awaiter(this, void 0, void 0, function* () {
            if (!(yield this.client.getGroupData(M.from)).nsfw)
                return void M.reply(`Don't be a pervert, Baka! This is not an NSFW group.`);
            // fetch result of https://velgrynd.herokuapp.com/api/randomimage/milf?apikey=Kuxw2RRu from the API using axios
            return void M.reply(yield request_1.default.buffer(`https://velgrynd.herokuapp.com/api/randomimage/milf?apikey=jxhcCGrCtIavLMAe6JY8xrwTX`), baileys_1.MessageType.image, undefined, undefined, `🌟 Here you go.\n`, undefined).catch((reason) => M.reply(`✖ An error occurred. Please try again later.`));
        });
    }
}
exports.default = Command;
