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
const baileys_1 = require("@adiwajshing/baileys");
const BaseCommand_1 = __importDefault(require("../../lib/BaseCommand"));
class Command extends BaseCommand_1.default {
    constructor(client, handler) {
        super(client, handler, {
            command: "Kurumi",
            aliases: ['kurumi'],
            description: "Displays the info",
            category: "general",
            usage: `${client.config.prefix}chitoge`,
            modsOnly: true,
            baseXp: 200,
        });
        this.run = (M) => __awaiter(this, void 0, void 0, function* () {
            const chitoge = "https://c.tenor.com/VaNRGnW7JkoAAAPo/date-a-live-kurumi-tokisaki.mp4";
            return void this.client.sendMessage(M.from, { url: chitoge }, baileys_1.MessageType.video, {
                quoted: M.WAMessage,
                mimetype: baileys_1.Mimetype.gif,
                caption: `❤️ *Kurumi Tokisaki* 🎊\n\n🍀 *Description: A WhatsApp Bot With Rich Creation Features.*\n\n🌐 *URL: https://github.com/Eximinati/tokisaki-kurumi* \n\n 📒 *Guide: https://github.com/Eximinati/tokisaki-kurumi/Guides* \n`,
            });
        });
    }
}
exports.default = Command;
