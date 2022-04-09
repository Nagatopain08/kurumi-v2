import { MessageType, Mimetype } from '@adiwajshing/baileys'
import { join } from 'path'
import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'aku',
            description: 'Displays info about aku.',
            category: 'general',
            usage: `${client.config.prefix}aku`
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
        const n = [
            'https://i.pinimg.com/564x/37/f1/42/37f142bfbfc1bcc7be1b104e4dbf6af4.jpg','https://i.pinimg.com/564x/0f/c3/7c/0fc37c10eee0e70e918202e1fa084fa9.jpg'
        ]
        let rin = n[Math.floor(Math.random() * n.length)]
        return void this.client.sendMessage(M.from, { url: rin }, MessageType.image, {quoted:M.WAMessage,
            mimetype: Mimetype.jpeg,
            caption: `🍭𝗵𝗲𝗹𝗹𝗼!🍃I'm AKU, just a regular ugly guy.
            
🍁𝙒𝙝𝙖𝙩𝙨𝘼𝙥𝙥;
Wa.me/+923087880256
📮𝙄𝙣𝙨𝙩𝙖𝙜𝙧𝙖𝙢;
｟𝖢𝗈𝗆𝗂𝗇𝗀 𝖲𝗈𝗈𝗇｠
🚀𝘿𝙞𝙨𝙘𝙤𝙧𝙙;
discordapp.com/users/Sempai#5552
⪼𝖲𝖾𝖾 𝗒𝖺𝗁 💘` }
        )
    }
}