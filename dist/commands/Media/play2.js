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
const yt_search_1 = __importDefault(require("yt-search"));
const YT_1 = __importDefault(require("../../lib/YT"));
class Command extends BaseCommand_1.default {
    constructor(client, handler) {
        super(client, handler, {
            command: 'play2',
            description: '📹 play a video with just search term!',
            category: 'media',
            aliases: ['video'],
            usage: `${client.config.prefix}play2 [term]`,
            baseXp: 20
        });
        this.run = (M, { joined }) => __awaiter(this, void 0, void 0, function* () {
            if (!joined)
                return void M.reply(' Provide a search term, Baka!');
            const term = joined.trim();
            const { videos } = yield (0, yt_search_1.default)(term);
            if (!videos || videos.length <= 0)
                return void M.reply(`⚓ No Matching videos found for the term : *${term}*`);
            const video = new YT_1.default(videos[0].url, 'video');
            if (!video.url)
                return;
            M.reply('⚡ Sending...');
            this.client
                .sendMessage(M.from, yield video.getBuffer(), baileys_1.MessageType.video, {
                quoted: M.WAMessage,
                contextInfo: {
                    externalAdReply: {
                        mediaUrl: video.url
                    }
                }
            })
                .catch((reason) => M.reply(`✖ An error occurred. Please try again later.`));
        });
    }
}
exports.default = Command;
