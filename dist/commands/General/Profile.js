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
const baileys_1 = require("@adiwajshing/baileys");
const BaseCommand_1 = __importDefault(require("../../lib/BaseCommand"));
const request_1 = __importDefault(require("../../lib/request"));
class Command extends BaseCommand_1.default {
    constructor(client, handler) {
        super(client, handler, {
            command: "profile",
            description: "Displays user-profile 📜",
            category: "general",
            usage: `${client.config.prefix}profile [tag/quote]`,
            aliases: ["p", "pf"],
            baseXp: 30,
        });
        this.run = (M) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
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
                M.reply(`Profile Picture not Accessible of ${username}must be ugly probably`);
                pfp = "https://telegra.ph/file/de72ea1903c646b4d4935.jpg";
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
            else if (exp < 125000) {
                role = "👻 Ghost";
            }
            else if (exp < 150000) {
                role = "🧚 Fairy";
            }
            else if (exp < 175000) {
                role = "🎃 Pumpkin";
            }
            else {
                role = "❄️ DEMON KING";
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
            else if (exp < 125000) {
                level = 10;
            }
            else if (exp < 150000) {
                level = 11;
            }
            else if (exp < 175000) {
                level = 12;
            }
            else if (exp < 200000) {
                level = 13;
            }
            else {
                level = 14;
            }
            yield M.reply(yield request_1.default.buffer(pfp || "https://wallpapercave.com/wp/wp10560870.png"), baileys_1.MessageType.image, undefined, undefined, `🏮 *Username: ${username}*\n\n🎗️ *About: ${(yield this.client.getStatus(user)).status || 'None'}*\n\n〽️ *Level: ${level}*\n\n⭐ *Exp: ${exp || 0}*\n\n💫 *Role: ${role}*\n\n👑 *Admin: ${((_c = (_b = M.groupMetadata) === null || _b === void 0 ? void 0 : _b.admins) === null || _c === void 0 ? void 0 : _c.includes(user)) || false}*\n\n✖ *Ban: ${(yield this.client.getUser(user)).ban || false}*`);
        });
    }
}
exports.default = Command;
