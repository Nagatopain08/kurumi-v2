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
const translate_google_1 = __importDefault(require("translate-google"));
const BaseCommand_1 = __importDefault(require("../../lib/BaseCommand"));
class Command extends BaseCommand_1.default {
    constructor(client, handler) {
        super(client, handler, {
            command: "translate",
            aliases: ["tr"],
            description: "Will translate the given word to your selected language. ",
            category: "utils",
            usage: `${client.config.prefix}tr <word>|<language_code>\n\nExample: ${client.config.prefix}tr zh-cn|Hello`,
            baseXp: 40,
        });
        this.run = (M, { joined }) => __awaiter(this, void 0, void 0, function* () {
            const texts = joined.trim().split("|");
            if (texts[0] === "")
                return void M.reply(`Use ${this.client.config.prefix}tr (word_that_you_wanna_translate|language_code)`);
            const word = texts[0];
            const code = texts[1];
            if (!code)
                return void M.reply("Give me the language code, Baka!");
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const response = yield (0, translate_google_1.default)(word, { to: code }).catch((err) => {
                return void M.reply(`Invalid language code, Baka!`);
            });
            const text = `${response}`;
            M.reply(text);
        });
    }
}
exports.default = Command;
