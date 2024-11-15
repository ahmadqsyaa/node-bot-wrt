import execute from '../lib/execute.js'
export const cmds = ["synctime"];
export const exec = async (bot, msg, chatId, messageId) => {
    var url = msg.body.split(' ')[1];
    if (!url) {
        url = 'google.com'
        var data = await execute(`bash ./lib/sh/synctime.sh ${url}`)
    } else {
        var data = await execute(`bash ./lib/sh/synctime.sh ${url}`)
    }
    if (!data) return bot.reply(text)
    await bot.reply(`sync from ${url}\r\n\r\n<code>${data}</code>`);
};