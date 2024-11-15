import { nerules } from '../lib/neko.js'
export const cmds = ["nerules"];
export const exec = (bot, msg, chatId, messageId) => {
    nerules().then(data => {
        bot.reply(`<blockquote>${data}</blockquote>`)
    }).catch(error => {
        bot.reply(`<blockquote>${error}</blockquote>`)
    });
};