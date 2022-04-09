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
const baileys_1 = require("@adiwajshing/baileys");
class Command extends BaseCommand_1.default {
    constructor(client, handler) {
        super(client, handler, {
            command: 'help',
            description: 'Displays the help menu or shows the info of the command provided',
            category: 'general',
            usage: `${client.config.prefix}help (command_name)`,
            aliases: ['h', 'menu']
        });
        this.run = (M, parsedArgs) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f;
            const n = [
                'telegra.ph/file/40b0b7ca0992fd2c5263c.mp4'
            ];
            let chitoge = n[Math.floor(Math.random() * n.length)];
            if (!parsedArgs.joined) {
                const commands = this.handler.commands.keys();
                const categories = {};
                for (const command of commands) {
                    const info = this.handler.commands.get(command);
                    if (!command)
                        continue;
                    if (!((_a = info === null || info === void 0 ? void 0 : info.config) === null || _a === void 0 ? void 0 : _a.category) || info.config.category === 'general')
                        continue;
                    if (Object.keys(categories).includes(info.config.category))
                        categories[info.config.category].push(info);
                    else {
                        categories[info.config.category] = [];
                        categories[info.config.category].push(info);
                    }
                }
                let text = `*✞︎☠︎ohayo*✞︎☠︎︎! *${M.sender.username}*\n\n•╚『wata shiwa, Tokisaki Kurumi desu! I Am Here To Make Your Future Worse』╝\n•*𝙡'𝙢*\n\n━━❰•Note✞︎☠︎︎𖣘Side･❱━━\n\n╚『𝙍𝙚𝙖𝙙 𝙏𝙝𝙚 𝙍𝙪𝙡𝙚𝙨』╝\n\n |*Don't Call* Bots to avoid Blocking.\n\n2 | *Don't Spam* in Groups to avoid Blocking\n\n`;
                const keys = Object.keys(categories);
                for (const key of keys)
                    text += `╚━❰☠︎︎𝑩𝒐𝒕 ${this.emojis[keys.indexOf(key)]} ${this.client.util.capitalize(key)}•𖣘❱━╝\n• \`\`\`${categories[key]
                        .map((command) => { var _a; return (_a = command.config) === null || _a === void 0 ? void 0 : _a.command; })
                        .join(', ')}\`\`\`\n\n`;
                return void this.client.sendMessage(M.from, { url: chitoge }, baileys_1.MessageType.video, { quoted: M.WAMessage,
                    mimetype: baileys_1.Mimetype.gif,
                    caption: `${text}
 ──❅┈[ *☠︎︎✞︎𖣔🅴🅻🅰🅸🅽🅰☠︎︎✞︎𖣔* ]┈❅───
┌────────────┈𑁍𖣘
│   💙 *𝗵𝗲𝗹𝗹𝗼*
  🅵🅾🅻🅻🅾🆆 🅱🅾🆃 🅾🆆🅽🅴🆁 🅾🅽 🅸🅶 🅰🆂
                SOON
│    ✞︎☠︎︎*𝘽𝙖𝙣𝙜 𝘽𝙖𝙣𝙜* 𑁍𖣘߷☆✯
└────────────┈𖣘
❅┈[𝐇𝐚𝐯𝐞 𝐆𝐫𝐞𝐚𝐭 𝐃𝐚𝐲]┈❅
📝 *Note: Use ${this.client.config.prefix}help <command_name> to view the command info*` });
            }
            const key = parsedArgs.joined.toLowerCase();
            const command = this.handler.commands.get(key) || this.handler.aliases.get(key);
            if (!command)
                return void M.reply(`No Command of Alias Found | "${key}"`);
            const state = yield this.client.DB.disabledcommands.findOne({ command: command.config.command });
            M.reply(`🚀 *Command:* ${this.client.util.capitalize((_b = command.config) === null || _b === void 0 ? void 0 : _b.command)}\n📉 *Status:* ${state ? 'Disabled' : 'Available'}\n⛩ *Category:* ${this.client.util.capitalize(((_c = command.config) === null || _c === void 0 ? void 0 : _c.category) || '')}${command.config.aliases
                ? `\n♦️ *Aliases:* ${command.config.aliases.map(this.client.util.capitalize).join(', ')}`
                : ''}\n🎐 *Group Only:* ${this.client.util.capitalize(JSON.stringify((_d = !command.config.dm) !== null && _d !== void 0 ? _d : true))}\n💎 *Usage:* ${((_e = command.config) === null || _e === void 0 ? void 0 : _e.usage) || ''}\n\n📒 *Description:* ${((_f = command.config) === null || _f === void 0 ? void 0 : _f.description) || ''}`);
        });
        this.emojis = ['', '', '', '', '', '', '', '', '', '', '', ''];
    }
}
exports.default = Command;
