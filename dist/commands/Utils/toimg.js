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
const promises_1 = __importDefault(require("fs/promises"));
const os_1 = require("os");
const child_process_1 = require("child_process");
const fs_1 = require("fs");
const util_1 = require("util");
// import webp from 'node-webpmux'
class Command extends BaseCommand_1.default {
    constructor(client, handler) {
        super(client, handler, {
            command: 'toimg',
            aliases: ['img', 'sti'],
            description: 'sends image/gif of a sticker',
            category: 'utils',
            usage: `${client.config.prefix}toimg [(tag)[sticker]]`,
            baseXp: 35
        });
        this.run = (M, parsedArgs) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g;
            let buffer;
            let exe = (0, util_1.promisify)(child_process_1.exec);
            if ((_c = (_b = (_a = M.quoted) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.message) === null || _c === void 0 ? void 0 : _c.stickerMessage)
                buffer = yield this.client.downloadMediaMessage(M.quoted.message);
            else if ((_g = (_f = (_e = (_d = M.quoted) === null || _d === void 0 ? void 0 : _d.message) === null || _e === void 0 ? void 0 : _e.message) === null || _f === void 0 ? void 0 : _f.stickerMessage) === null || _g === void 0 ? void 0 : _g.isAnimated)
                buffer = yield this.client.downloadMediaMessage(M.WAMessage);
            if (!buffer)
                return void M.reply(`You didn't provide any sticker to convert`);
            const filename = `${(0, os_1.tmpdir)()}/${Math.random().toString(36)}`;
            try {
                yield promises_1.default.writeFile(`${filename}.webp`, buffer);
                yield exe(`ffmpeg -i ${filename}.webp ${filename}.png`);
                const imagebuffer = yield promises_1.default.readFile(`${filename}.png`);
                console.log(filename);
                return void M.reply(imagebuffer, baileys_1.MessageType.image, undefined, undefined);
                /* only image works for now
        animated webp will give error
        */
            }
            catch (error) {
                M.reply("Sorry I can't convert this animated sticker into a gif");
                function tomp4(buffer) {
                    return __awaiter(this, void 0, void 0, function* () {
                        const read = buffer;
                        const destination = `./${Math.random().toString(32)}`;
                        promises_1.default.mkdir(destination);
                        const writeFileDest = destination + '/input.webp';
                        const frames = destination + '/frames.png';
                        yield promises_1.default.writeFile(writeFileDest, read);
                        yield exe(`magick ${writeFileDest} ${frames}`);
                        //  delay(60000)
                        yield exe(`ffmpeg -r 25 -i ${destination}/frames-%0d.png -c:v libx264 -pix_fmt yuv420p "${destination}/out.mp4"`);
                        const buff = yield promises_1.default.readFile(`${destination}/out.mp4`);
                        //  await fs.rm(destination.slice(2), { recursive: true, force: true })
                        console.log(buff);
                        console.log(yield (0, fs_1.existsSync)(`${destination}/out.mp4`));
                        return buff;
                    });
                }
                const animatedgif = yield tomp4(buffer);
                return void M.reply(animatedgif, baileys_1.MessageType.video, undefined, undefined);
            }
        });
    }
    exe() {
        throw new Error('Method not implemented.');
    }
}
exports.default = Command;
