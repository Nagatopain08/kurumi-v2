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
            command: "weather",
            aliases: ["wthr"],
            description: "Gives you the weather of the given state or city. ",
            category: "educative",
            usage: `${client.config.prefix}weather [place_name]`,
            baseXp: 50,
        });
        this.run = (M, { joined }) => __awaiter(this, void 0, void 0, function* () {
            //if (!this.client.config.weatherAppid)
            //	return void M.reply("No weather api key set");
            if (!joined)
                return void M.reply("Provide me the place name, Baka!");
            const place = joined.trim();
            yield axios_1.default
                .get(`https://api.popcat.xyz/weather?q=${place}`)
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                .then((response) => {
                // console.log(response);
                const text = `🔎 Weather for the place *${place}* found\n\n🌸 *Place:* ${response[0].location.name}*\n🌈 *Weather: ${response[0].current.skytext}*\n🌡️ *Temperature: ${response[0].current.temperature}°C*\n💦 *Humidity: ${response[0].current.humidity}%*\n🎐 *Wind:* ${response[0].current.windspeed}*\n`;
                M.reply(text);
            })
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                .catch((err) => {
                M.reply(`No such place name.`);
            });
        });
    }
}
exports.default = Command;
