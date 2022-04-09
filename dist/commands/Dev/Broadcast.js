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
const baileys_1 = require("@adiwajshing/baileys");
const BaseCommand_1 = __importDefault(require("../../lib/BaseCommand"));
class Command extends BaseCommand_1.default {
    constructor(client, handler) {
        super(client, handler, {
            command: "broadcast",
            description: "Will make a broadcast for groups where the bot is in. Can be used to make announcements.",
            aliases: ["bcast", "announcement", "bc"],
            category: "dev",
            dm: true,
            usage: `${client.config.prefix}bc`,
            modsOnly: true,
            baseXp: 0,
        });
        this.run = (M, { joined }) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (!joined)
                return void (yield M.reply(`Please provide the Broadcast Message.`));
            const term = joined.trim();
            const images = [
                "https://c.tenor.com/IhiRfFF2eO8AAAPo/anime-kurumi.mp4",
                "https://c.tenor.com/xtUvNrfMOScAAAPo/kurumi-tokisaki-anime.mp4",
                "https://c.tenor.com/4Z5XJh3m3S0AAAPo/100.mp4",
                "https://c.tenor.com/Yoitobm0iaQAAAPo/date-a-live-kurumi.mp4",
                "https://c.tenor.com/v3WTdkIo1kkAAAPo/kurumi.mp4",
                "https://c.tenor.com/aflCuh8Hk_EAAAPo/kurumi-wedding-dress.mp4",
                "https://c.tenor.com/npZTSqG9iwMAAAPo/kurumi.mp4",
            ];
            const selected = images[Math.floor(Math.random() * images.length)];
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const chats = this.client.chats
                .all()
                .filter((v) => !v.read_only && !v.archive)
                .map((v) => v.jid)
                .map((jids) => (jids.includes("g.us") ? jids : null))
                .filter((v) => v);
            for (let i = 0; i < chats.length; i++) {
                const text = `*💙「▁ ▂ ▄ ▅ ▆ ▇ █ k̳̿͟͞u̳̿͟͞r̳̿͟͞u̳̿͟͞m̳̿͟͞i̳̿͟͞ ̳̿͟͞b̳̿͟͞r̳̿͟͞o̳̿͟͞a̳̿͟͞d̳̿͟͞c̳̿͟͞a̳̿͟͞s̳̿͟͞t̳̿͟͞ █ ▇ ▆ ▅ ▄ ▂ ▁ 」💙*\n\n${term}\n\n Regards ~ *${M.sender.username}*`;
                this.client.sendMessage(chats[i], { url: selected }, baileys_1.MessageType.image, {
                    caption: `${text}`,
                    contextInfo: {
                        mentionedJid: (_a = M.groupMetadata) === null || _a === void 0 ? void 0 : _a.participants.map((user) => user.jid),
                    },
                });
            }
            yield M.reply(`✅ Broadcast Message sent to *${chats.length} groups*.`);
        });
    }
}
exports.default = Command;
