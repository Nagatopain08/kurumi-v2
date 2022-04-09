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
const mathjs_1 = require("mathjs");
const BaseCommand_1 = __importDefault(require("../../lib/BaseCommand"));
const request_1 = __importDefault(require("../../lib/request"));
const baileys_1 = require("@adiwajshing/baileys");
class Command extends BaseCommand_1.default {
    constructor(client, handler) {
        super(client, handler, {
            command: "nsfwdoujin",
            description: `Gives you the doujin of the given idea and page.`,
            aliases: ["ndoujin"],
            category: "nsfw",
            usage: `${client.config.prefix}ndoujin [id|page]`,
            baseXp: 50,
        });
        this.run = (M, { joined }) => __awaiter(this, void 0, void 0, function* () {
            const sHentai = new shentai_1.default();
            const terms = joined.trim().split("|");
            if (terms[0] === "")
                return void M.reply(`Give me the id and page of the nhentai doujin, Baka!`);
            const id = terms[0];
            const page = terms[1];
            if (!page)
                return void M.reply("Give me the page, Baka!");
            const o = (0, mathjs_1.evaluate)(+terms[1] - +1);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const doujin = yield sHentai.getDoujin(id).catch((err) => {
                return void M.reply(`Invalid doujin id, Baka!.`);
            });
            let text = "";
            text += `🎀 *Title: ${doujin.titles.english}*\n`;
            text += `🎗 *Tags: ${doujin.tags}*\n`;
            text += `✍ *Author: ${doujin.author}*\n`;
            text += `📒 *Reading Progress: ${page} out of ${doujin.pages.length}*`;
            if (!(yield this.client.getGroupData(M.from)).nsfw)
                return void M.reply(`Don't be a pervert, Baka! This is not an NSFW group.`);
            const buffer = yield request_1.default.buffer(doujin.pages[o]).catch((e) => {
                return void M.reply(e.message);
            });
            while (true) {
                try {
                    M.reply(buffer || "✖ An error occurred. Please try again later.", baileys_1.MessageType.image, undefined, undefined, `${text}`, undefined).catch((e) => {
                        console.log(`This error occurs when an image is sent via M.reply()\n Child Catch Block : \n${e}`);
                        // console.log('Failed')
                        M.reply(`✖ An error occurred. Please try again later. Here's the page URL: *${doujin.pages[o]}*`);
                    });
                    break;
                }
                catch (e) {
                    // console.log('Failed2')
                    M.reply(`✖ An error occurred. Please try again later. Here's the page URL: *${doujin.pages[o]}*`);
                    console.log(`This error occurs when an image is sent via M.reply()\n Parent Catch Block : \n${e}`);
                }
            }
            return void null;
        });
    }
}
exports.default = Command;
