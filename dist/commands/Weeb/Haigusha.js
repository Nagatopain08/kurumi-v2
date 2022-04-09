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
const mailist_1 = require("mailist");
const marika = require("@shineiichijo/marika");
const BaseCommand_1 = __importDefault(require("../../lib/BaseCommand"));
const request_1 = __importDefault(require("../../lib/request"));
const baileys_1 = require("@adiwajshing/baileys");
class Command extends BaseCommand_1.default {
    constructor(client, handler) {
        super(client, handler, {
            command: "haigusha",
            description: `Will send you random anime character with info.`,
            aliases: ["hg"],
            category: "weeb",
            usage: `${client.config.prefix}haigusha`,
            baseXp: 50,
        });
        this.run = (M) => __awaiter(this, void 0, void 0, function* () {
            let a = yield marika.getRandomCharacter();
            let f = a.name.toLowerCase();
            //const chitoge = joined.trim();
            const client = new mailist_1.Character();
            const chara = yield client.character(f).catch((err) => {
                return void M.reply(`Error, Try again later`);
            });
            //if (!chara)
            //return void (await M.reply(`Couldn't find any matching character.`));
            let text = "";
            text += `💙 *Name: ${chara.data.characters.results[0].name.full}*\n`;
            text += `💛 *Source: ${chara.data.characters.results[0].media.edges[0].node.title.userPreferred}*\n\n`;
            text += `🌐 *URL: ${chara.data.characters.results[0].siteUrl}*\n\n`;
            text += `❤ *Description:* ${chara.data.characters.results[0].description}\n`;
            const buffer = yield request_1.default
                .buffer(chara.data.characters.results[0].image.large)
                .catch((e) => {
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
