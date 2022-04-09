/** @format */

import { MessageType, Mimetype } from "@adiwajshing/baileys";
import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { ISimplifiedMessage } from "../../typings";

export default class Command extends BaseCommand {
	constructor(client: WAClient, handler: MessageHandler) {
		super(client, handler, {
			command: "Kurumi",
			aliases:['kurumi'],
			description: "Displays the info",
			category: "general",
			usage: `${client.config.prefix}chitoge`,
                        modsOnly:true,
			baseXp: 200,
		});
	}

	run = async (M: ISimplifiedMessage): Promise<void> => {
		const chitoge =
			"https://c.tenor.com/VaNRGnW7JkoAAAPo/date-a-live-kurumi-tokisaki.mp4";
		return void this.client.sendMessage(
			M.from,
			{ url: chitoge },
			MessageType.video,
			{
				quoted: M.WAMessage,
				mimetype: Mimetype.gif,
				caption: `❤️ *Kurumi Tokisaki* 🎊\n\n🍀 *Description: A WhatsApp Bot With Rich Creation Features.*\n\n🌐 *URL: https://github.com/Eximinati/tokisaki-kurumi* \n\n 📒 *Guide: https://github.com/Eximinati/tokisaki-kurumi/Guides* \n`,
			}
		);
	};
}