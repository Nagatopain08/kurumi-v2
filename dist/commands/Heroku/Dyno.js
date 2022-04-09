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
const heroku_client_1 = __importDefault(require("heroku-client"));
const got_1 = __importDefault(require("got"));
const heroku = new heroku_client_1.default({
    token: "your key"
});
const baseURI = '/apps/' + "your dyno name";
// import { MessageType, Mimetype } from '@adiwajshing/baileys'
class Command extends BaseCommand_1.default {
    constructor(client, handler) {
        super(client, handler, {
            command: 'dyno',
            description: `Shows your dyno info`,
            aliases: ['dyno'],
            category: 'heroku',
            usage: `${client.config.prefix}dyno`,
            baseXp: 50
        });
        this.run = (M) => __awaiter(this, void 0, void 0, function* () {
            //if (!this.client.config.hapi) return void M.reply("No heroku API key set");
            //if (!this.client.config.hname) return void M.reply("No heroku name set");
            heroku.get('/account').then((account) => __awaiter(this, void 0, void 0, function* () {
                const url = "https://api.heroku.com/accounts/" + account.id + "/actions/get-quota";
                const headers = {
                    "User-Agent": "Chrome/80.0.3987.149 Mobile Safari/537.36",
                    "Authorization": "Bearer " + "your key",
                    "Accept": "application/vnd.heroku+json; version=3.account-quotas",
                };
                yield (0, got_1.default)(url, { headers: headers }).then((res) => __awaiter(this, void 0, void 0, function* () {
                    const resp = JSON.parse(res.body);
                    const total_quota = Math.floor(resp.account_quota);
                    const quota_used = Math.floor(resp.quota_used);
                    const percentage = Math.round((quota_used / total_quota) * 100);
                    const remaining = total_quota - quota_used;
                    const i = Math.floor(total_quota / 3600);
                    const h = Math.floor(quota_used / 3600);
                    const u = Math.floor(remaining / 3600);
                    let g = `💻 *Total_quota*: _${i}_
🔎 *Quota_used*: _${h}_
📱 *Percentage*: _${percentage}%_
📠 *Left*: _${u}_
`;
                    yield M.reply(g);
                }));
            }));
        });
    }
}
exports.default = Command;
