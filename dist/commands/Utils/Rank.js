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
const canvacord_1 = __importDefault(require("canvacord"));
const baileys_1 = require("@adiwajshing/baileys");
class Command extends BaseCommand_1.default {
    constructor(client, handler) {
        super(client, handler, {
            command: "rank",
            description: "Displays User's Stats",
            category: "general",
            usage: `${client.config.prefix}rank [tag/quote]`,
            aliases: ["stats"],
            baseXp: 10,
        });
        this.run = (M) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            if ((_a = M.quoted) === null || _a === void 0 ? void 0 : _a.sender)
                M.mentioned.push(M.quoted.sender);
            const user = M.mentioned[0] ? M.mentioned[0] : M.sender.jid;
            let username = user === M.sender.jid ? M.sender.username : "";
            if (!username) {
                const contact = this.client.getContact(user);
                username =
                    contact.notify || contact.vname || contact.name || user.split("@")[0];
            }
            let pfp;
            try {
                pfp = yield this.client.getProfilePicture(user);
            }
            catch (err) {
                M.reply(`Profile Picture not Accessible of ${username}`);
                pfp =
                    "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg";
            }
            const exp = (yield this.client.getUser(user)).Xp;
            let role;
            if (exp < 500) {
                role = "🌸 Citizen";
            }
            else if (exp < 1000) {
                role = "🔎 Cleric";
            }
            else if (exp < 2000) {
                role = "🔮 Wizard";
            }
            else if (exp < 5000) {
                role = "♦️ Mage";
            }
            else if (exp < 10000) {
                role = "🎯 Noble";
            }
            else if (exp < 25000) {
                role = "✨ Elite";
            }
            else if (exp < 50000) {
                role = "🔶️ Ace";
            }
            else if (exp < 75000) {
                role = "🌀 Hero";
            }
            else if (exp < 100000) {
                role = "💎 Supreme";
            }
            else {
                role = "❄️ Mystic";
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            let level;
            if (exp < 500) {
                level = 1;
            }
            else if (exp < 1000) {
                level = 2;
            }
            else if (exp < 2000) {
                level = 3;
            }
            else if (exp < 5000) {
                level = 4;
            }
            else if (exp < 10000) {
                level = 5;
            }
            else if (exp < 25000) {
                level = 6;
            }
            else if (exp < 50000) {
                level = 7;
            }
            else if (exp < 75000) {
                level = 8;
            }
            else if (exp < 100000) {
                level = 9;
            }
            else {
                level = 10;
            }
            let required;
            if (exp < 500) {
                required = 500;
            }
            else if (exp < 1000) {
                required = 1000;
            }
            else if (exp < 2000) {
                required = 2000;
            }
            else if (exp < 5000) {
                required = 5000;
            }
            else if (exp < 10000) {
                required = 10000;
            }
            else if (exp < 25000) {
                required = 25000;
            }
            else if (exp < 50000) {
                required = 50000;
            }
            else if (exp < 75000) {
                required = 75000;
            }
            else if (exp < 100000) {
                required = 100000;
            }
            else {
                required = 0;
            }
            const rank = new canvacord_1.default.Rank()
                .setAvatar(pfp)
                .setCurrentXP(exp || 0)
                .setRequiredXP(required)
                .setStatus("online", true)
                .setLevel(level, "Level:", true)
                .setRank(0, `Role: ${role}`, true)
                .setProgressBar("#e68e15", "COLOR")
                .setOverlay("#000000")
                .setUsername(username)
                .setDiscriminator("0001")
                .setBackground("COLOR", "#ffffff");
            rank.build({}).then((rankcard) => {
                const text = `🏮 *Username: ${username}*\n\n〽️ *Level: ${level}*\n\n⭐ *Exp: ${exp || 0} / ${required}*\n\n💫 *Role: ${role}*\n\n`;
                M.reply(rankcard, baileys_1.MessageType.image, undefined, undefined, text, undefined);
            });
        });
    }
}
exports.default = Command;
