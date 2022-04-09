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
const heroku_client_1 = __importDefault(require("heroku-client"));
const heroku = new heroku_client_1.default({
    token: "your key"
});
const baseURI = '/apps/' + "your dyno name";
// import { MessageType, Mimetype } from '@adiwajshing/baileys'
class Command extends BaseCommand_1.default {
    constructor(client, handler) {
        super(client, handler, {
            command: 'restart',
            description: `test`,
            aliases: ['restart'],
            category: 'heroku',
            usage: `${client.config.prefix}restart`,
            modsOnly: true,
            baseXp: 50
        });
        this.run = (M) => __awaiter(this, void 0, void 0, function* () {
            //if (!this.client.config.hapi) return void M.reply("No heroku API key set");
            //if (!this.client.config.hname) return void M.reply("No heroku name set");
            yield M.reply(`Restarting.............`);
            yield heroku.delete(baseURI + '/dynos').catch((error) => __awaiter(this, void 0, void 0, function* () {
                yield M.reply("Error");
            }));
        });
    }
}
exports.default = Command;
