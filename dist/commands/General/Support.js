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
            command: 'support',
            aliases: ['support'],
            description: 'Gets the support group links',
            category: 'general',
            usage: `${client.config.prefix}Support`,
            baseXp: 10
        });
        this.run = (M) => __awaiter(this, void 0, void 0, function* () {
            (yield this.client.sendMessage(M.sender.jid, `    ♥️MY MASTER GROUPS♥️
        
       *♥️Kurumi support:♥️* *https://chat.whatsapp.com/FXDZOyXwdsK4vuOLPGZKpX:*`, baileys_1.MessageType.text));
            const n = [
                './assets/videos/kurumi.mp4'
            ];
            let beckylynch = n[Math.floor(Math.random() * n.length)];
            return void this.client.sendMessage(M.from, { url: beckylynch }, baileys_1.MessageType.video, { quoted: M.WAMessage,
                mimetype: baileys_1.Mimetype.gif,
                caption: `Sent you the support Link in personal message \n` });
        });
    }
}
exports.default = Command;
