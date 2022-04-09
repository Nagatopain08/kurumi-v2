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
            command: 'pinterest',
            aliases: ['pi', 'pin'],
            description: 'Search wallpaper from pinterest.com. ',
            category: 'media',
            dm: true,
            usage: `${client.config.prefix}pinterest [name]`
        });
        // static count = 0
        this.run = (M, { joined }) => __awaiter(this, void 0, void 0, function* () {
            if (!joined)
                return void (yield M.reply(`Give me a term to search, Baka!`));
            const chitoge = joined.trim().split("|");
            const term = chitoge[0];
            const amount = chitoge[1];
            if (!amount)
                return void M.reply(`Give me the number , Baka!\n\nExample: *${this.client.config.prefix}pin tomioka|5*`);
            if (amount > 20)
                return void M.reply(`Do you want me to spam in this group?`);
            const { data } = yield axios_1.default.get(`https://hanzz-web.herokuapp.com/api/pinterest?query=${term}`);
            if (data.result[0] == undefined)
                return void M.reply("404 error");
            const buffer = yield request_1.default.buffer(data.result[Math.floor(Math.random() * data.result.length)]).catch((e) => {
                return void M.reply(e.message);
            });
            for (let i = 0; i < amount; i++) {
                const res = `*🌟 Here you go.*`;
                this.client.sendMessage(M.from, { url: data.result[Math.floor(Math.random() * data.result.length)] }, baileys_1.MessageType.image, {
                    quoted: M.WAMessage,
                    caption: `${res}`,
                });
            }
        });
    }
}
exports.default = Command;
