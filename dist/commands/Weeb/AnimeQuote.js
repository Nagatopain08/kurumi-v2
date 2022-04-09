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
const animequotes_1 = __importDefault(require("animequotes"));
class Command extends BaseCommand_1.default {
    constructor(client, handler) {
        super(client, handler, {
            command: "animequote",
            description: "Will give you random anime quote for the given character.",
            aliases: ["aq"],
            category: "weeb",
            usage: `${client.config.prefix}animequote [character_name]`,
            baseXp: 10,
        });
        this.run = (M, { joined }) => __awaiter(this, void 0, void 0, function* () {
            const random = yield animequotes_1.default.randomQuote();
            let randomText = "";
            randomText += `*✏ Quote: ${random.quote}*\n\n`;
            randomText += `*🎗 Said by: ${random.name}*\n\n`;
            randomText += `*📛 Source: ${random.anime}*`;
            if (!joined)
                return void (yield M.reply(`${randomText}`));
            const chara = joined.trim();
            const byChara = yield animequotes_1.default.getRandomQuoteByCharacter(chara);
            if (byChara === " ") {
                return void M.reply("Couldn't find any quote of the given character.");
            }
            let charaText = "";
            charaText += `*✏ Quote: ${byChara.quote}*\n`;
            charaText += `*🎗 Said by: ${byChara.name}*\n\n`;
            charaText += `*📛 Source: ${byChara.anime}*`;
            yield M.reply(charaText)
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                .catch((reason) => M.reply(`${reason}`));
        });
    }
}
exports.default = Command;
