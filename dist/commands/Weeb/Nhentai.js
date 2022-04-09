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
const shentai_1 = __importDefault(require("shentai"));
const BaseCommand_1 = __importDefault(require("../../lib/BaseCommand"));
const baileys_1 = require("@adiwajshing/baileys");
const request_1 = __importDefault(require("../../lib/request"));
class Command extends BaseCommand_1.default {
    constructor(client, handler) {
        super(client, handler, {
            command: "nhentai",
            description: `Searches the given nhentai doujin.`,
            aliases: ["nhentai"],
            category: "nsfw",
            usage: `${client.config.prefix}nhentai [term]`,
            baseXp: 50,
        });
        this.run = (M, { joined }) => __awaiter(this, void 0, void 0, function* () {
            /*eslint-disable @typescript-eslint/no-explicit-any*/
            /*eslint-disable @typescript-eslint/no-unused-vars*/
            if (!(yield this.client.getGroupData(M.from)).nsfw)
                return void M.reply(`Don't be a pervert, Baka! This is not an NSFW group.`);
            if (!joined)
                return void (yield M.reply(`Give me an nhentai doujin title to search, Baka!`));
            const sHentai = new shentai_1.default();
            const title = joined.trim();
            let text = "";
            const doujin = yield sHentai.search(title).catch((err) => {
                return void M.reply(`Couldn't find any matching doujin.`);
            });
            for (let i = 0; i < 10; i++) {
                text += `🎀 *Title: ${doujin.results[i].titles.english}*\n`;
                text += `Use ${this.client.config.prefix}ndoujin ${doujin.results[i].id} | 1 to read this doujin.\n\n`;
            }
            const buffer = yield request_1.default.buffer(doujin.results[0].cover).catch((e) => {
                return void M.reply(e.message);
            });
            while (true) {
                try {
                    M.reply(buffer || "✖ An error occurred. Please try again later.", baileys_1.MessageType.image, undefined, undefined, `${text}`, undefined).catch((e) => {
                        console.log(`This error occurs when an image is sent via M.reply()\n Child Catch Block : \n${e}`);
                        // console.log('Failed')
                        M.reply(`✖ An error occurred. Please try again later.`);
                    });
                    break;
                }
                catch (e) {
                    // console.log('Failed2')
                    M.reply(`✖ An error occurred. Please try again later.`);
                    console.log(`This error occurs when an image is sent via M.reply()\n Parent Catch Block : \n${e}`);
                }
            }
            return void null;
        });
    }
}
exports.default = Command;
