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
const ptable_1 = __importDefault(require("ptable"));
const node_periodic_table_1 = __importDefault(require("node-periodic-table"));
class Command extends BaseCommand_1.default {
    constructor(client, handler) {
        super(client, handler, {
            command: "element",
            aliases: ["e"],
            description: "Gives you the info of the given element. ",
            category: "educative",
            usage: `${client.config.prefix}element [name/number/symbol]`,
            baseXp: 30,
        });
        this.run = (M, { joined }) => __awaiter(this, void 0, void 0, function* () {
            if (!joined)
                return void M.reply("Give me an element name/number/symbol, Baka!");
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const chitoge = joined.trim();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const search = yield (0, ptable_1.default)(chitoge);
            console.log(search);
            if (search === undefined) {
                return void (yield M.reply(`*https://en.m.wikipedia.org/wiki/Periodic_table*\n\nI think this might help you.\n`));
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const response = yield node_periodic_table_1.default.getByNumber(search.number);
            let text = "";
            text += `🔴 *Elelment: ${response.name}*\n`;
            text += `⬜ *Atomic Number: ${response.number}*\n`;
            text += `🟡 *Atomic Mass: ${response.atomic_mass}*\n`;
            text += `⬛ *Symbol: ${response.symbol}*\n`;
            text += `❓ *Appearance: ${response.apearance}*\n`;
            text += `🟢 *Phase: ${response.phase}*\n`;
            text += `♨️ *Boiling Point: ${response.boil} K*\n️`;
            text += `💧 *Melting Point: ${response.melt} K*\n`;
            text += `🟣 *Density: ${response.density} g/mL*\n`;
            text += `⚫ *Shells: ${response.shells.join(", ")}*\n`;
            text += `🌐 *URL: ${response.source}*\n\n`;
            text += `💬 *Summary: ${response.summary}*`;
            yield M.reply(text);
        });
    }
}
exports.default = Command;
