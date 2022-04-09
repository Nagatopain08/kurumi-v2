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
const trace_moe_ts_1 = require("trace.moe.ts");
const anilist_node_1 = __importDefault(require("anilist-node"));
const baileys_1 = require("@adiwajshing/baileys");
const BaseCommand_1 = __importDefault(require("../../lib/BaseCommand"));
class Command extends BaseCommand_1.default {
    constructor(client, handler) {
        super(client, handler, {
            command: "sauce",
            description: `Gives you the source of the given anime scene.`,
            aliases: ["trace", "source"],
            category: "weeb",
            usage: `${client.config.prefix}sauce [tag_image]`,
            baseXp: 50,
        });
        this.run = (M) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            let buffer;
            if ((_c = (_b = (_a = M.quoted) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.message) === null || _c === void 0 ? void 0 : _c.imageMessage)
                buffer = yield this.client.downloadMediaMessage(M.quoted.message);
            else if ((_d = M.WAMessage.message) === null || _d === void 0 ? void 0 : _d.imageMessage)
                buffer = yield this.client.downloadMediaMessage(M.WAMessage);
            else if ((_g = (_f = (_e = M.quoted) === null || _e === void 0 ? void 0 : _e.message) === null || _f === void 0 ? void 0 : _f.message) === null || _g === void 0 ? void 0 : _g.videoMessage)
                buffer = yield this.client.downloadMediaMessage(M.quoted.message);
            else if ((_h = M.WAMessage.message) === null || _h === void 0 ? void 0 : _h.videoMessage)
                buffer = yield this.client.downloadMediaMessage(M.WAMessage);
            if (!buffer)
                return void M.reply(`Give me an image/gif to search, Baka!`);
            const api = new trace_moe_ts_1.TraceMoe();
            const sauce = yield api.fetchAnimeFromBuffer(buffer).catch((err) => {
                return void M.reply(`Couldn't find any matching results.`);
            });
            const Anilist = new anilist_node_1.default();
            const details = yield Anilist.media.anime(sauce.result[0].anilist);
            const similarity = sauce.result[0].similarity;
            let sentence;
            if (similarity < 0.85) {
                sentence = `Ahh... I have low confidence in this one but please take a look.`;
            }
            else {
                sentence = `I have super confidence in this one. Take a look at the results.`;
            }
            let text = "";
            text += `*${sentence}*\n\n`;
            text += `🎀 *Title: ${details.title.romaji}*\n`;
            text += `🎗 *Episode: ${sauce.result[0].episode}*\n`;
            text += `💠 *Similarity: ${sauce.result[0].similarity} / 1*\n`;
            text += `💮 *Genres: ${details.genres}*\n`;
            text += `🎋 *Type: ${details.format}*\n`;
            text += `📈 *Status: ${details.status}*\n\n`;
            text += `🌐 *URL: ${details.siteUrl}*`;
            return void this.client.sendMessage(M.from, { url: sauce.result[0].video }, baileys_1.MessageType.video, {
                quoted: M.WAMessage,
                mimetype: baileys_1.Mimetype.gif,
                caption: `${text}`,
            });
        });
    }
}
exports.default = Command;
