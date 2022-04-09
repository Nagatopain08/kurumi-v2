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
            command: 'rep',
            aliases: ['report'],
            description: 'Get the group invite link',
            category: 'general',
            usage: `${client.config.prefix}invite`,
            baseXp: 10
        });
        this.run = (M, { joined }) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const term = joined.trim();
            yield this.client.sendMessage(
            // enter your unique gid
            `263716564623-1628429288@g.us`, `「 💙🅺🆄🆁🆄🅼🅸 🆁🅴🅿🅾🆁🆃💙 」\n\n ${term} by ${M.sender.username} \n
                   From : ${(_a = M.groupMetadata) === null || _a === void 0 ? void 0 : _a.subject} `, baileys_1.MessageType.text);
            return void M.reply('Your report has been submitted to AKU, if you used this command for fun you will be banned!!');
        });
    }
}
exports.default = Command;
