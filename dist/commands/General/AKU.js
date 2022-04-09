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
class Command extends BaseCommand_1.default {
    constructor(client, handler) {
        super(client, handler, {
            command: 'aku',
            description: 'Displays info about aku.',
            category: 'general',
            usage: `${client.config.prefix}aku`
        });
        this.run = (M) => __awaiter(this, void 0, void 0, function* () {
            const n = [
                'https://i.pinimg.com/564x/37/f1/42/37f142bfbfc1bcc7be1b104e4dbf6af4.jpg', 'https://i.pinimg.com/564x/0f/c3/7c/0fc37c10eee0e70e918202e1fa084fa9.jpg'
            ];
            let rin = n[Math.floor(Math.random() * n.length)];
            return void this.client.sendMessage(M.from, { url: rin }, baileys_1.MessageType.image, { quoted: M.WAMessage,
                mimetype: baileys_1.Mimetype.jpeg,
                caption: `🍭𝗵𝗲𝗹𝗹𝗼!🍃I'm AKU, just a regular ugly guy.
            
🍁𝙒𝙝𝙖𝙩𝙨𝘼𝙥𝙥;
Wa.me/+923087880256
📮𝙄𝙣𝙨𝙩𝙖𝙜𝙧𝙖𝙢;
｟𝖢𝗈𝗆𝗂𝗇𝗀 𝖲𝗈𝗈𝗇｠
🚀𝘿𝙞𝙨𝙘𝙤𝙧𝙙;
discordapp.com/users/Sempai#5552
⪼𝖲𝖾𝖾 𝗒𝖺𝗁 💘` });
        });
    }
}
exports.default = Command;
