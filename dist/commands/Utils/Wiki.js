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
const wikipedia_1 = __importDefault(require("wikipedia"));
const BaseCommand_1 = __importDefault(require("../../lib/BaseCommand"));
class Command extends BaseCommand_1.default {
    constructor(client, handler) {
        super(client, handler, {
            command: "wikipedia",
            aliases: ["wiki"],
            description: "Will fetch the result of the given query from wikipedia. ",
            category: "utils",
            usage: `${client.config.prefix}wiki [query]`,
            baseXp: 20,
        });
        this.run = (M, { joined }) => __awaiter(this, void 0, void 0, function* () {
            if (!joined)
                return void M.reply("Provide a query, Baka!");
            const query = joined.trim();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const results = yield wikipedia_1.default.summary(query);
            const text = `*🌐 URL: ${results.content_urls.mobile.page}*\n\n*🎀 Title: ${results.title}*\n *📜 Description: ${results.description}*\n\n*❄ Summary:* ${results.extract}`;
            yield M.reply(text);
        });
    }
}
exports.default = Command;
