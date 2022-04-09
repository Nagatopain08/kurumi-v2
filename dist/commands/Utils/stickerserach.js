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
const axios_1 = __importDefault(require("axios"));
const wa_sticker_formatter_1 = require("wa-sticker-formatter");
class Command extends BaseCommand_1.default {
    constructor(client, handler) {
        super(client, handler, {
            command: 'stickerserach',
            aliases: ['ssh', 'ssc'],
            description: 'Search sticker. ',
            category: 'utils',
            dm: true,
            usage: `${client.config.prefix}stickerserach [keywords]`
        });
        // static count = 0
        this.run = (M, { joined }) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            if (!joined)
                return void M.reply('Provide the keywords you wanna search, Baka!');
            const cara = joined.trim();
            console.log(cara);
            const { data } = yield axios_1.default.get(`https://g.tenor.com/v1/search?q=${cara}&key=LIVDSRZULELA&limit=8`);
            if (data.error)
                return void (yield M.reply('Sorry, couldn\'t find'));
            //const i = Math.floor(Math.random() * data.result.length)
            const b = `${(_d = (_c = (_b = (_a = data.results) === null || _a === void 0 ? void 0 : _a[Math.floor(Math.random() * data.results.length)]) === null || _b === void 0 ? void 0 : _b.media[0]) === null || _c === void 0 ? void 0 : _c.mp4) === null || _d === void 0 ? void 0 : _d.url}`;
            const sticker = yield new wa_sticker_formatter_1.Sticker(b, {
                pack: "sticker",
                author: "BY cara",
                quality: 40,
                type: "crop",
                categories: ["🎊"],
            });
            yield M.reply(yield sticker.build(), baileys_1.MessageType.sticker, baileys_1.Mimetype.webp);
        });
    }
}
exports.default = Command;
