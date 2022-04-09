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
            command: 'anime',
            aliases: ['a', 'ani'],
            description: 'Searches the given anime. ',
            category: 'weeb',
            usage: `${client.config.prefix}anime [title]`
        });
        // static count = 0
        this.run = (M, { joined }) => __awaiter(this, void 0, void 0, function* () {
            if (!joined)
                return void M.reply('✖ Provide an anime to search, Baka!');
            const chitoge = joined.trim();
            console.log(chitoge);
            const { data } = yield axios_1.default.get(`https://api.jikan.moe/v3/search/anime?q=${chitoge}`);
            if (!data.results[0].title)
                return void M.reply(yield request_1.default.buffer(`https://www.linkpicture.com/q/IMG-20220118-WA0387.png`), baileys_1.MessageType.image, undefined, undefined, `404 Error can not find the anime *${chitoge}*`, undefined);
            const buffer = yield request_1.default.buffer(data.results[0].image_url).catch((e) => {
                return void M.reply(e.message);
            });
            while (true) {
                try {
                    M.reply(buffer || '✖ An error occurred. Please try again later', baileys_1.MessageType.image, undefined, undefined, `🎀 *Title: ${data.results[0].title}*\n🎋 *Ongoing: ${data.results[0].airing}*\n🎐 *Premiered on: ${data.results[0].start_date}*\n🎗 *Ended on: ${data.results[0].end_date}*\n💠 *Total Episodes: ${data.results[0].episodes}*\n🌟 *Score: ${data.results[0].score}*\n💎 *Rating: ${data.results[0].rated}*\n❄ *Description: ${data.results[0].synopsis}*\n\n🌐 *MyAnimeList URL: ${data.results[0].url}*\n`, undefined).catch((e) => {
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
