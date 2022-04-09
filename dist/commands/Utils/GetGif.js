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
const BaseCommand_1 = __importDefault(require("../../lib/BaseCommand"));
const axios_1 = __importDefault(require("axios"));
const baileys_1 = require("@adiwajshing/baileys");
const request_1 = __importDefault(require("../../lib/request"));
class Command extends BaseCommand_1.default {
    constructor(client, handler) {
        super(client, handler, {
            command: "getgif",
            description: "Will give you random gif of the given search term.",
            category: "utils",
            usage: `${client.config.prefix}getgif [term]`,
            aliases: ["gif"],
            baseXp: 40,
        });
        this.run = (M, { joined }) => __awaiter(this, void 0, void 0, function* () {
            if (!this.client.config.gifApi)
                return void M.reply("No key set for searching gifs. ");
            if (!joined)
                return void (yield M.reply(`GIve me a search term, Baka!`));
            const search = joined.trim();
            const gif = yield axios_1.default
                .get(`https://g.tenor.com/v1/search?q=${search}&key=${this.client.config.gifApi}&limit=100`)
                .catch(() => null);
            if (!gif)
                return void (yield M.reply(`Couldn't find any matching gif term.`));
            const i = Math.floor(Math.random() * gif.data.results.length);
            const caption = "🌟 Here you go.";
            return void M.reply(yield request_1.default.buffer(gif.data.results[i].media[0].mp4.url), baileys_1.MessageType.video, baileys_1.Mimetype.gif, [caption], caption);
        });
    }
}
exports.default = Command;
