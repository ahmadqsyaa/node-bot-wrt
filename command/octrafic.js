import { getTrafic } from '../lib/openclash.js'
import execute from '../lib/execute.js'
export const cmds = ["octrafic"];
export const exec = async (bot, msg, chatId, messageId) => {
    await getTrafic()
    var data = await execute('cat lib/trafic.txt')
    bot.reply(`<blockquote>${data}</blockquote>`)
};