/** @format */

import { MessageType } from "@adiwajshing/baileys";
import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { IParsedArgs, ISimplifiedMessage } from "../../typings";

export default class Command extends BaseCommand {
	constructor(client: WAClient, handler: MessageHandler) {
		super(client, handler, {
			command: "broadcast",
			description:
				"Will make a broadcast for groups where the bot is in. Can be used to make announcements.",
			aliases: ["bcast", "announcement", "bc"],
			category: "dev",
			dm: true,
			usage: `${client.config.prefix}bc`,
			modsOnly: true,
			baseXp: 0,
		});
	}

	run = async (
		M: ISimplifiedMessage,
		{ joined }: IParsedArgs
	): Promise<void> => {
		if (!joined)
			return void (await M.reply(`Please provide the Broadcast Message.`));
		const term = joined.trim();
		const images = [
			"https://c.tenor.com/IhiRfFF2eO8AAAPo/anime-kurumi.mp4",
			"https://c.tenor.com/xtUvNrfMOScAAAPo/kurumi-tokisaki-anime.mp4",
			"https://c.tenor.com/4Z5XJh3m3S0AAAPo/100.mp4",
			"https://c.tenor.com/Yoitobm0iaQAAAPo/date-a-live-kurumi.mp4",
			"https://c.tenor.com/v3WTdkIo1kkAAAPo/kurumi.mp4",
			"https://c.tenor.com/aflCuh8Hk_EAAAPo/kurumi-wedding-dress.mp4",
			"https://c.tenor.com/npZTSqG9iwMAAAPo/kurumi.mp4",
		];
		const selected = images[Math.floor(Math.random() * images.length)];
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const chats: any = this.client.chats
			.all()
			.filter((v) => !v.read_only && !v.archive)
			.map((v) => v.jid)
			.map((jids) => (jids.includes("g.us") ? jids : null))
			.filter((v) => v);
		for (let i = 0; i < chats.length; i++) {
			const text = `*💙「▁ ▂ ▄ ▅ ▆ ▇ █ k̳̿͟͞u̳̿͟͞r̳̿͟͞u̳̿͟͞m̳̿͟͞i̳̿͟͞ ̳̿͟͞b̳̿͟͞r̳̿͟͞o̳̿͟͞a̳̿͟͞d̳̿͟͞c̳̿͟͞a̳̿͟͞s̳̿͟͞t̳̿͟͞ █ ▇ ▆ ▅ ▄ ▂ ▁ 」💙*\n\n${term}\n\n Regards ~ *${M.sender.username}*`;
			this.client.sendMessage(chats[i], { url: selected }, MessageType.image, {
				caption: `${text}`,
				contextInfo: {
					mentionedJid: M.groupMetadata?.participants.map((user) => user.jid),
				},
			});
		}
		await M.reply(`✅ Broadcast Message sent to *${chats.length} groups*.`);
	};
}