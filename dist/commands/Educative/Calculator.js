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
const mathjs_1 = require("mathjs");
const BaseCommand_1 = __importDefault(require("../../lib/BaseCommand"));
class Command extends BaseCommand_1.default {
    constructor(client, handler) {
        super(client, handler, {
            command: 'calculator',
            aliases: ['calc'],
            description: 'Calculates the given value. ',
            category: 'educative',
            usage: `${client.config.prefix}calc [value]`,
            baseXp: 20
        });
        this.run = (M, { joined }) => __awaiter(this, void 0, void 0, function* () {
            if (!joined)
                return void M.reply('Provide the value to calculate, Baka!');
            const value = joined.trim();
            const calc = (0, mathjs_1.evaluate)(value);
            const text = `💡 *Solution for ${value} = ${calc}*`;
            yield M.reply(text)
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                .catch((reason) => M.reply(`${reason}`));
        });
    }
}
exports.default = Command;
