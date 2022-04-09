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
const axios_1 = __importDefault(require("axios"));
class Command extends BaseCommand_1.default {
    constructor(client, handler) {
        super(client, handler, {
            command: 'brainly',
            aliases: ['br'],
            description: 'Gives you answer of the question from brainly ',
            category: 'educative',
            usage: `${client.config.prefix}brainly [Q]`,
            baseXp: 50
        });
        this.run = (M, { joined }) => __awaiter(this, void 0, void 0, function* () {
            if (!joined)
                return void M.reply('Please provide me the question');
            const place = joined.trim();
            yield axios_1.default
                .get(`https://api.zekais.com/brainly?query=${place}&lang=us&apikey=CnXf9Ojs`)
                /* Note
      If you want to add some response, we'd recommend you to explore the json itself which provided link returns.
      This stability of the url and API KEY is not guaranteed.
      Regards: Team Kaoi
     */
                .then((response) => {
                // console.log(response);
                const i = Math.floor(Math.random() * response.data.result[0].answer.length);
                const text = `🔎 *Question*: *${place}*\n\n_*Answer*_ : ${response.data.result[0].answer[i].answer}\n `;
                M.reply(text);
            })
                .catch((err) => {
                M.reply(`Sorry, couldn't find any Answers.`);
            });
        });
    }
}
exports.default = Command;
