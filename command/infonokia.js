import { fetchRouterStatus } from '../lib/infonokia.js'
import dotenv from 'dotenv';
dotenv.config();

export const cmds = ["infonokia"];

export const exec = async (bot, msg, chatId, messageId) => {
    const nokia = await fetchRouterStatus(process.env.IPMODEM)
    if (nokia){
        bot.reply(`<blockquote>${nokia}</blockquote>`)
    } else {
        not.reply("there is an error, make sure the modem ip in the config file is correct or you can change it using node-bot -cc")
    }
}