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
const request_1 = __importDefault(require("../../lib/request"));
class Command extends BaseCommand_1.default {
    constructor(client, handler) {
        super(client, handler, {
            command: "info",
            description: "Will display the info the bot",
            category: "general",
            usage: `${client.config.prefix}info`,
            baseXp: 0,
        });
        this.run = (M) => __awaiter(this, void 0, void 0, function* () {
            /*eslint-disable @typescript-eslint/no-explicit-any*/
            const users = yield this.client.DB.user.countDocuments();
            const uban = yield this.client.DB.user.countDocuments({ ban: true });
            const chats = this.client.chats
                .all()
                .filter((v) => !v.read_only && !v.archive)
                .map((v) => v.jid)
                .map((jids) => (jids.includes("g.us") ? jids : null))
                .filter((v) => v);
            const pad = (s) => (s < 10 ? "0" : "") + s;
            const formatTime = (seconds) => {
                const hours = Math.floor(seconds / (60 * 60));
                const minutes = Math.floor((seconds % (60 * 60)) / 60);
                const secs = Math.floor(seconds % 60);
                return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
            };
            const uptime = () => formatTime(process.uptime());
            yield M.reply(yield request_1.default.buffer(`https://c.tenor.com/CwUE9JQ5ieUAAAPo/kurumi-tokisaki-anime.mp4`), baileys_1.MessageType.video, baileys_1.Mimetype.gif, undefined, `━━━❰ 🅨︎🅞︎🅣︎🅢︎🅤︎🅑︎🅐︎ ❱━━━\n\n🔮 *Groups: ${chats.length}*\n\n🚦 *Uptime: ${uptime()}*\n\n🦆 *kawaii ningen: ${users}*\n\n💢 *Banned Users: ${uban}*\n\n\n`, undefined).catch((reason) => M.reply(`✖ An error occurred. Please try again later.`));
        });
    }
}
exports.default = Command;
