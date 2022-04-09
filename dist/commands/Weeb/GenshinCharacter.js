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
const genshin_db_1 = __importDefault(require("genshin-db"));
const request_1 = __importDefault(require("../../lib/request"));
const baileys_1 = require("@adiwajshing/baileys");
class Command extends BaseCommand_1.default {
    constructor(client, handler) {
        super(client, handler, {
            command: "genshincharacter",
            description: `Gives you the data of the given genshin character.`,
            aliases: ["gchara", "genshinchara"],
            category: "weeb",
            usage: `${client.config.prefix}genshincharacter [name]`,
            baseXp: 50,
        });
        this.run = (M, { joined }) => __awaiter(this, void 0, void 0, function* () {
            if (!joined)
                return void (yield M.reply(`Give me a character name, Baka!`));
            const chitoge = joined.trim();
            const genshin = yield genshin_db_1.default.characters(chitoge);
            if (genshin === undefined) {
                return void M.reply("No such character, Baka!");
            }
            let text = "";
            text += `💎 *Name: ${genshin.name}*\n`;
            text += `💠 *Elemnent: ${genshin.element}*\n`;
            text += `📛 *Weapon: ${genshin.weapontype}*\n`;
            text += `🎗 *Speciality: ${genshin.substat}*\n`;
            text += `🌟 *Rarity: ${genshin.rarity}*\n`;
            text += `🌸 *Gender: ${genshin.gender}*\n`;
            text += `❄ *Constellation: ${genshin.constellation}*\n`;
            text += `⛩ *Region: ${genshin.region}*\n`;
            text += `💮 *Affiliation: ${genshin.affiliation}*\n`;
            text += `🎁 *Birthday: ${genshin.birthday}*\n\n`;
            text += `💛 *Description: ${genshin.description}*\n\n`;
            text += `🌐 *URL: ${genshin.url.fandom}*`;
            const buffer = yield request_1.default.buffer(genshin.images.cover1).catch((e) => {
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
