"use strict";
/** @format */
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
const anime_wallpapers_1 = require("anime-wallpapers");
const BaseCommand_1 = __importDefault(require("../../lib/BaseCommand"));
const baileys_1 = require("@adiwajshing/baileys");
class Command extends BaseCommand_1.default {
    constructor(client, handler) {
        super(client, handler, {
            command: "wallpaper",
            description: `Will send you random anime wallpaper of the given term.`,
            aliases: ["wpaper"],
            category: "weeb",
            usage: `${client.config.prefix}wallpaper [term]`,
            baseXp: 20,
        });
        this.run = (M, { joined }) => __awaiter(this, void 0, void 0, function* () {
            if (!joined)
                return void (yield M.reply(`Give me a wallpaper term to search, Baka!`));
            const chitoge = joined.trim().split("|");
            const term = chitoge[0];
            const amount = chitoge[1];
            if (!amount)
                return void M.reply(`Give me the number of wallpapers to send, Baka!\n\nExample: *${this.client.config.prefix}wallpaper chitoge|5*`);
            if (amount > 20)
                return void M.reply(`Do you want me to spam in this group?`);
            const wall = new anime_wallpapers_1.AnimeWallpaper();
            const wallpaper = yield wall.getAnimeWall2(term).catch(() => null);
            if (!wallpaper)
                return void (yield M.reply(`Couldn't find any matching term of wallpaper.`));
            for (let i = 0; i < amount; i++) {
                const res = `*🌟 Here you go.*`;
                this.client.sendMessage(M.from, { url: wallpaper[i].image }, baileys_1.MessageType.image, {
                    quoted: M.WAMessage,
                    caption: `${res}`,
                });
            }
        });
    }
}
exports.default = Command;
