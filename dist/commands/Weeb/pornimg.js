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
const BaseCommand_1 = __importDefault(require("../../lib/BaseCommand"));
//import School from "images-generator"
const gen = require("images-generator");
const request_1 = __importDefault(require("../../lib/request"));
const baileys_1 = require("@adiwajshing/baileys");
class Command extends BaseCommand_1.default {
    constructor(client, handler) {
        super(client, handler, {
            command: 'pornjpg',
            description: `Will send you random real porn image.`,
            aliases: ['pj'],
            category: 'nsfw',
            usage: `${client.config.prefix}pj`,
            baseXp: 50
        });
        this.run = (M) => __awaiter(this, void 0, void 0, function* () {
            // fetch result of https://waifu.pics/api/sfw/waifu from the API using axios
            const i = yield gen.nsfw.real.pornGif();
            if (!(yield this.client.getGroupData(M.from)).nsfw)
                return void M.reply(`Don't be a pervert, Baka! This is not an NSFW group.`);
            const buffer = yield request_1.default.buffer(i).catch((e) => {
                return void M.reply(e.message);
            });
            while (true) {
                try {
                    M.reply(buffer || 'Could not fetch image. Please try again later', baileys_1.MessageType.image, undefined, undefined, `Ya...\n`, undefined).catch((e) => {
                        console.log(`This Error occurs when an image is sent via M.reply()\n Child Catch Block : \n${e}`);
                        // console.log('Failed')
                        M.reply(`Could not fetch image. Here's the URL: ${i}`);
                    });
                    break;
                }
                catch (e) {
                    // console.log('Failed2')
                    M.reply(`Could not fetch image. Here's the URL : ${i}`);
                    console.log(`This Error occurs when an image is sent via M.reply()\n Parent Catch Block : \n${e}`);
                }
            }
            return void null;
        });
    }
}
exports.default = Command;
