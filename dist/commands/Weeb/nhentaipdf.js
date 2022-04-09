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
const baileys_1 = require("@adiwajshing/baileys");
const nhentai_pdf_1 = require("@shineiichijo/nhentai-pdf");
const os_1 = require("os");
const promises_1 = require("fs/promises");
const shentai_1 = __importDefault(require("shentai"));
class Command extends BaseCommand_1.default {
    constructor(client, handler) {
        super(client, handler, {
            command: "ncode",
            description: `welcome to the darkness 🌚`,
            aliases: ["nhdl", "nc"],
            category: "nsfw",
            usage: `${client.config.prefix}ncode [nhentai_id]`,
            baseXp: 50,
        });
        this.run = (M, { joined }) => __awaiter(this, void 0, void 0, function* () {
            const sHentai = new shentai_1.default();
            const term = joined;
            if (!term)
                return void M.reply(`provide a code`);
            const doujin = new nhentai_pdf_1.Doujin(`https://nhentai.net/g/${term}/`);
            if (!doujin.validate())
                return void M.reply("Invalid nhentai id");
            const search = yield sHentai.getDoujin(term);
            const filename = `${(0, os_1.tmpdir)()}/${Math.random().toString(36)}.pdf`;
            yield doujin.pdf(filename);
            const img = yield this.client.getBuffer(search.pages[0]);
            const file = yield (0, promises_1.readFile)(filename);
            return void (yield this.client.sendMessage(M.from, file, baileys_1.MessageType.document, {
                mimetype: baileys_1.Mimetype.pdf,
                quoted: M.WAMessage,
                thumbnail: Buffer.from(img, "binary").toString("base64"),
                filename: search.titles.english,
            }));
        });
    }
}
exports.default = Command;
