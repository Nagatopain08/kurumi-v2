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
const pokedex_promise_v2_1 = __importDefault(require("pokedex-promise-v2"));
const oakdex_pokedex_1 = __importDefault(require("oakdex-pokedex"));
const request_1 = __importDefault(require("../../lib/request"));
const baileys_1 = require("@adiwajshing/baileys");
class Command extends BaseCommand_1.default {
    constructor(client, handler) {
        super(client, handler, {
            command: "pokemon",
            description: `Gives you the data of the given pokemon.`,
            aliases: ["pkmn"],
            category: "weeb",
            usage: `${client.config.prefix}pokemon [name/id]`,
            baseXp: 50,
        });
        this.run = (M, { joined }) => __awaiter(this, void 0, void 0, function* () {
            const name = joined.trim().split(" ")[0].toLowerCase();
            if (!name)
                return void M.reply(`Do you want me to give you the data of an unknown pokemon, Baka!`);
            const pkmon = new pokedex_promise_v2_1.default();
            const data = yield pkmon.getPokemonByName(name).catch(() => null);
            if (!data)
                return void (yield M.reply(`No such pokemon name or id, Baka!`));
            const pkmn = yield oakdex_pokedex_1.default.findPokemon(data.id);
            let text = "";
            text += `💫 *Name: ${pkmn.names.en}*\n`;
            text += `〽️ *Pokedex ID: ${data.id}*\n`;
            text += `⚖ *Weight: ${pkmn.weight_eu}*\n`;
            text += `🔆 *Height: ${pkmn.height_eu}*\n`;
            text += `🌟 *Base Experience: ${data.base_experience}*\n`;
            text += `📛 *Abilities: ${pkmn.abilities[0].name}, ${pkmn.abilities[1].name}*\n`;
            text += `🎀 *Type:  ${pkmn.types}*\n`;
            text += `📈 *Leveling Rate: ${pkmn.leveling_rate}*\n`;
            text += `💮 *Colour: ${pkmn.color}*\n`;
            if (pkmn.evolution_from !== null)
                text += `🌸 *Evolved from: ${pkmn.evolution_from}*\n`;
            text += `✳ *HP: ${data.stats[0].base_stat}*\n`;
            text += `⚔ *Attack: ${data.stats[1].base_stat}*\n`;
            text += `🔰 *Defense: ${data.stats[2].base_stat}*\n`;
            text += `☄ *Special Attack: ${data.stats[3].base_stat}*\n`;
            text += `🛡 *Special Defense:${data.stats[4].base_stat}*\n`;
            text += `🎐 *Speed: ${data.stats[5].base_stat}*\n\n`;
            text += `💬 *Summary: ${pkmn.pokedex_entries.Gold.en}*`;
            const buffer = yield request_1.default
                .buffer(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`)
                .catch((e) => {
                return void M.reply(e.message);
            });
            while (true) {
                try {
                    M.reply(buffer || "✖ An error occurred. Please try again later", baileys_1.MessageType.image, undefined, undefined, `${text}`, undefined).catch((err) => {
                        console.log(`${err}`);
                        M.reply(`✖ An error occurred. Please try again later.`);
                    });
                    break;
                }
                catch (err) {
                    M.reply(`✖ An error occurred. Please try again later.`);
                    console.log(`${err}`);
                }
            }
            return void null;
        });
    }
}
exports.default = Command;
