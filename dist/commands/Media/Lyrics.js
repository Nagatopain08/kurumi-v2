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
const BaseCommand_1 = __importDefault(require("../../lib/BaseCommand"));
const genius_lyrics_1 = __importDefault(require("genius-lyrics"));
const request_1 = __importDefault(require("../../lib/request"));
class Command extends BaseCommand_1.default {
    constructor(client, handler) {
        super(client, handler, {
            command: 'lyrics',
            description: 'Gives you the lyrics of the given song.',
            category: 'media',
            aliases: ['ly'],
            usage: `${client.config.prefix}lyrics [song_name]`,
            baseXp: 40
        });
        this.run = (M, { joined }) => __awaiter(this, void 0, void 0, function* () {
            if (!this.client.config.geniusKey)
                return void M.reply("No Genius Access Token set.");
            if (!joined)
                return void M.reply('Give me a song name to fetch the lyrics, Baka!');
            const chitoge = joined.trim();
            const Client = new genius_lyrics_1.default.Client(this.client.config.geniusKey);
            const search = yield Client.songs.search(chitoge);
            if (search.error)
                return void M.reply(`Couldn't find any matching song results.`);
            const lyrics = yield search[0].lyrics();
            let text = `🎀 *Title: ${search[0].title}*\n\n`;
            text += `🌐 *URL: ${search[0].url}*\n`;
            M.reply(yield request_1.default.buffer(search[0].image), baileys_1.MessageType.image, undefined, undefined, text, undefined
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ).catch((reason) => M.reply(`${text}`));
            yield M.reply(lyrics);
        });
    }
}
exports.default = Command;
