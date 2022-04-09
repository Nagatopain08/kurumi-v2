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
const canvacord_1 = __importDefault(require("canvacord"));
const baileys_1 = require("@adiwajshing/baileys");
const BaseCommand_1 = __importDefault(require("../../lib/BaseCommand"));
class Command extends BaseCommand_1.default {
    constructor(client, handler) {
        super(client, handler, {
            command: "circle",
            description: "Will make the given image shape to circle",
            category: "fun",
            usage: `${client.config.prefix}circle [(as caption | quote)[image] | @mention]`,
            baseXp: 30,
        });
        this.run = (M) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f;
            const image = yield (((_b = (_a = M.WAMessage) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.imageMessage)
                ? this.client.downloadMediaMessage(M.WAMessage)
                : ((_e = (_d = (_c = M.quoted) === null || _c === void 0 ? void 0 : _c.message) === null || _d === void 0 ? void 0 : _d.message) === null || _e === void 0 ? void 0 : _e.imageMessage)
                    ? this.client.downloadMediaMessage(M.quoted.message)
                    : M.mentioned[0]
                        ? this.client.getProfilePicture(M.mentioned[0])
                        : this.client.getProfilePicture(((_f = M.quoted) === null || _f === void 0 ? void 0 : _f.sender) || M.sender.jid));
            if (!image)
                return void M.reply(`Couldn't fetch the required Image`);
            const result = yield canvacord_1.default.Canvacord.circle(image);
            yield M.reply(result, baileys_1.MessageType.image, undefined, undefined, undefined, undefined);
        });
    }
}
exports.default = Command;
