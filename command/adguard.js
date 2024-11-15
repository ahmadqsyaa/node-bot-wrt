import adguardm from '../lib/adguard.js'
export const cmds = ["adguard"];
export const exec = async (bot, msg, chatId, messageId) => {
    var data = await adguardm()
    bot.reply(`<blockquote>${data}</blockquote>`)
};