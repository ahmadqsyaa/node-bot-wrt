import { rules } from '../lib/openclash.js'
export const cmds = ["ocrules"];
export const exec = (bot, msg, chatId, messageId) => {
    rules().then(data => {
        bot.reply(`<blockquote>${data}</blockquote>`)
    }).catch(error => {
        bot.reply(`<blockquote>${error}</blockquote>`)
    });
};