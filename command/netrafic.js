import { negetTrafic } from '../lib/neko.js'
import execute from '../lib/execute.js'
export const cmds = ["netrafic"];
export const exec = async (bot, msg, chatId, messageId) => {
    await getTrafic()
    var data = await execute('cat lib/ nekotrafic.txt')
    bot.reply(`<blockquote>${data}</blockquote>`)
};