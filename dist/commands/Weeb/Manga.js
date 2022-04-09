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
const mailist_1 = require("mailist");
const request_1 = __importDefault(require("../../lib/request"));
const baileys_1 = require("@adiwajshing/baileys");
// import { MessageType, Mimetype } from '@adiwajshing/baileys'
class Command extends BaseCommand_1.default {
    constructor(client, handler) {
        super(client, handler, {
            command: "manga",
            description: `Gives you the data of the given manga from MyAnimeList.`,
            aliases: ["mnga"],
            category: "weeb",
            usage: `${client.config.prefix}manga [title]`,
            baseXp: 50,
        });
        this.run = (M, { joined }) => __awaiter(this, void 0, void 0, function* () {
            if (!joined)
                return void (yield M.reply(`Give me a manga title, Baka!`));
            const chitoge = joined.trim();
            const get = new mailist_1.Manga();
            const search = yield get
                .manga(chitoge)
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                .catch((err) => {
                return void M.reply(`Couldn't find any matching manga title.`);
            });
            let text = "";
            text += `🎀 *Title: ${search.data.anime.results[0].title.romaji}*\n`;
            text += `📈 *Status: ${search.data.anime.results[0].status}*\n`;
            text += `🎋 *Format: ${search.data.anime.results[0].format}*\n`;
            text += `💮 *Genres: ${search.data.anime.results[0].genres.join(", ")}*\n`;
            text += `🌸 *Total Volumes: ${search.data.anime.results[0].volumes}*\n`;
            text += `🎗 *Total Chapters: ${search.data.anime.results[0].chapters}*\n`;
            text += `✨ *Published on: ${search.data.anime.results[0].startDate.day}-${search.data.anime.results[0].startDate.month}-${search.data.anime.results[0].startDate.year}*\n`;
            text += `🚫 *Eechi: ${search.data.anime.results[0].isAdult}*\n`;
            text += `🌟 *Score: ${search.data.anime.results[0].meanScore}\n\n`;
            text += `🌐 *URL: ${search.data.anime.results[0].siteUrl}*\n\n`;
            text += `❄️ *Description:* ${search.data.anime.results[0].description}`;
            //	if (!search) return void M.reply(`Couldn't find any matching manga title.`);
            const buffer = yield request_1.default
                .buffer(search.data.anime.results[0].coverImage.large)
                .catch((e) => {
                return void M.reply(e.message);
            });
            while (true) {
                try {
                    M.reply(buffer || "✖ An error occurred. Please try again later.", baileys_1.MessageType.image, undefined, undefined, `${text}`, undefined).catch((e) => {
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
