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
const request_1 = __importDefault(require("../../lib/request"));
const baileys_1 = require("@adiwajshing/baileys");
// import { MessageType, Mimetype } from '@adiwajshing/baileys'
const w5botapi = require('w5-textmaker');
class Command extends BaseCommand_1.default {
    constructor(client, handler) {
        super(client, handler, {
            command: "loveneon",
            description: `Get text image`,
            aliases: ["lneon"],
            category: "creation",
            usage: `${client.config.prefix}loveneon`,
            baseXp: 50,
        });
        this.run = (M, { joined }) => __awaiter(this, void 0, void 0, function* () {
            if (!joined)
                return void (yield M.reply(`Provide the text,ʕಠ_ಠʔ!`));
            const cara = joined.trim();
            const wall = yield w5botapi.textpro("https://textpro.me/create-glowing-neon-light-text-effect-online-free-1061.html", cara);
            const buffer = yield request_1.default.buffer(wall).catch((e) => {
                return void M.reply(e.message);
            });
            while (true) {
                try {
                    M.reply(buffer || "Could not fetch image. Please try again later", baileys_1.MessageType.image, undefined, undefined, `…ᘛ⁐̤ᕐᐷ Here you go.\n`, undefined).catch((e) => {
                        console.log(`This Error occurs when an image is sent via M.reply()\n Child Catch Block : \n${e}`);
                        // console.log('Failed')
                        M.reply(`Could not fetch image. Here's the URL: ${wall}`);
                    });
                    break;
                }
                catch (e) {
                    // console.log('Failed2')
                    M.reply(`Could not fetch image. Here's the URL : ${wall}`);
                    console.log(`This Error occurs when an image is sent via M.reply()\n Parent Catch Block : \n${e}`);
                }
            }
            return void null;
        });
    }
}
exports.default = Command;
