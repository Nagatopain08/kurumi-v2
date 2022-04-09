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
const axios_1 = __importDefault(require("axios"));
class Command extends BaseCommand_1.default {
    constructor(client, handler) {
        super(client, handler, {
            command: "trivia",
            aliases: ["t"],
            description: "Gives you random question based on the level. ",
            category: "educative",
            usage: `${client.config.prefix}trivia [easy/medium/hard]`,
            baseXp: 30,
        });
        this.run = (M, { joined }) => __awaiter(this, void 0, void 0, function* () {
            if (!joined)
                return void M.reply("Give me a level, Baka!");
            const chitoge = joined.trim();
            yield axios_1.default
                .get(`https://opentdb.com/api.php?amount=1&difficulty=${chitoge}&type=multiple`)
                .then((response) => {
                // console.log(response);
                const text = `🎀 *Category: ${response.data.results[0].category}*\n❄ *Difficulty: ${response.data.results[0].difficulty}*\n📒 *Question:${response.data.results[0].question}*\n\n\n🎋 *Answer: ${response.data.results[0].correct_answer}*\n `;
                M.reply(text);
            })
                .catch((err) => {
                M.reply(`No such level, Baka!`);
            });
        });
    }
}
exports.default = Command;
