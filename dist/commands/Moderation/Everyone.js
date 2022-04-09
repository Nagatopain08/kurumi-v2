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
const baileys_1 = require("@adiwajshing/baileys");
const wa_sticker_formatter_1 = require("wa-sticker-formatter");
class Command extends BaseCommand_1.default {
    constructor(client, handler) {
        super(client, handler, {
            command: "everyone",
            description: "Tags all users in group chat",
            aliases: ["all", "tagall", "ping"],
            category: "moderation",
            usage: `${client.config.prefix}everyone`,
            adminOnly: true,
            baseXp: 20,
        });
        this.run = (M, { joined, flags }) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            flags.forEach((flag) => (joined = joined.replace(flag, "")));
            const members = yield (yield this.client.groupMetadata(M.from)).participants;
            const stickers = [
                "https://wallpapercave.com/wp/wp3144753.jpg",
                "https://wallpapercave.com/wp/wp4782018.jpg",
                "https://wallpaperaccess.com/full/1326836.jpg",
                "https://wallpapermemory.com/uploads/711/chitoge-kirisaki-wallpaper-full-hd-323316.jpg",
                "https://data.whicdn.com/images/304776416/original.jpg",
                "https://i.pinimg.com/564x/ca/e7/8a/cae78ad7f8e6459ad20bde350e2eb78b.jpg",
            ];
            const random = stickers[Math.floor(Math.random() * stickers.length)];
            if (flags.includes("--s") || flags.includes("--sticker")) {
                const sticker = yield new wa_sticker_formatter_1.Sticker(random, {
                    pack: "READ QUOTED MESSAGE",
                    author: "🌟 Cara 🌟",
                    quality: 90,
                    type: "default",
                    categories: ["🎊"],
                });
                return void (yield M.reply(yield sticker.build(), baileys_1.MessageType.sticker, baileys_1.Mimetype.webp, (_a = M.groupMetadata) === null || _a === void 0 ? void 0 : _a.participants.map((user) => user.jid)));
            }
            else if (flags.includes("--h") || flags.includes("--hide")) {
                return void (yield M.reply(`*🎀 Group: ${(_b = M.groupMetadata) === null || _b === void 0 ? void 0 : _b.subject}*\n🎏 *Members: ${members.length}*\n📢 *Announcer: @${M.sender.jid.split("@")[0]}*\n🧧 *Tags: HIDDEN*`, undefined, undefined, (_c = M.groupMetadata) === null || _c === void 0 ? void 0 : _c.participants.map((user) => user.jid)
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                ).catch((reason) => M.reply(`✖️ An error occurred, Reason: ${reason}`)));
            }
            else {
                const metadata = {
                    mods: [],
                    admins: [],
                    others: [],
                };
                for (const i of members) {
                    if (i.jid === M.sender.jid)
                        continue;
                    if (!((_d = this.client.config.mods) === null || _d === void 0 ? void 0 : _d.includes(i.jid)))
                        continue;
                    metadata.mods.push(i.jid);
                }
                for (const a of members) {
                    if (a.jid === M.sender.jid)
                        continue;
                    if ((_e = this.client.config.mods) === null || _e === void 0 ? void 0 : _e.includes(a.jid))
                        continue;
                    if (!a.isAdmin)
                        continue;
                    metadata.admins.push(a.jid);
                }
                for (const k of members) {
                    if (k.jid === M.sender.jid)
                        continue;
                    if ((_f = this.client.config.mods) === null || _f === void 0 ? void 0 : _f.includes(k.jid))
                        continue;
                    if (k.isAdmin)
                        continue;
                    metadata.others.push(k.jid);
                }
                let text = `*🎀 Group: ${(_g = M.groupMetadata) === null || _g === void 0 ? void 0 : _g.subject}*\n🎏 *Members: ${members.length}*\n📢 *Announcer: @${M.sender.jid.split("@")[0]}*\n🧧 *Tags:*`;
                if (metadata.mods.length > 0) {
                    for (const Mods of metadata.mods) {
                        text += `\n🏅 *@${Mods.split("@")[0]}*`;
                    }
                }
                // text += `\n`;
                if (metadata.admins.length > 0) {
                    text += `\n`;
                    for (const admins of metadata.admins) {
                        text += `\n👑 *@${admins.split("@")[0]}*`;
                    }
                }
                // text += `\n`;
                if (metadata.others.length > 0) {
                    text += `\n`;
                    for (const others of metadata.others) {
                        text += `\n🎗 *@${others.split("@")[0]}*`;
                    }
                }
                return void M.reply(text, baileys_1.MessageType.text, undefined, (_h = M.groupMetadata) === null || _h === void 0 ? void 0 : _h.participants.map((user) => user.jid));
            }
        });
    }
}
exports.default = Command;
