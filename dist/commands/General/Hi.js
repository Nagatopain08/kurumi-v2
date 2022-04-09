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
            command: "hi",
            description: "Generally used to check if bot is Up",
            category: "general",
            usage: `${client.config.prefix}hi`,
            baseXp: 10,
        });
        this.run = (M) => __awaiter(this, void 0, void 0, function* () {
            const buttons = [
                {
                    buttonId: "help",
                    buttonText: { displayText: `${this.client.config.prefix}help` },
                    type: 1,
                },
            ];
            const buttonMessage = {
                contentText: `Ara Ara,Hajimemashite`,
                footerText: "💜 KUrumI 💜",
                buttons: buttons,
                headerType: 1,
            };
            yield M.reply(buttonMessage, baileys_1.MessageType.buttonsMessage);
        });
    }
}
exports.default = Command;
