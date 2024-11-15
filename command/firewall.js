import execute from '../lib/execute.js'
export const cmds = ["firewall"];
export const exec = async (bot, msg, chatId, messageId) => {
    var data = await execute('uci -q show firewall  | grep "@rule" || "null" ')
    bot.reply(`<blockquote>${data}</blockquote>`)
};