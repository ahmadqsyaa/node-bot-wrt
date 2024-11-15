import triginfo from '../lib/3ginfo.js'
export const cmds = ["3ginfo"];
export const exec = async (bot, msg, chatId, messageId) => {
    var data = await triginfo()
    bot.reply(data)
};