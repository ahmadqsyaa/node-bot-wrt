import { listmenu, keymenu } from '../lib/command.js'
export const menu = async (bot, msg, chatId, messageId, text) => {
    const opskey = {
        reply_markup: JSON.stringify({
            keyboard: keymenu,
            one_time_keyboard: true
        }),
        reply_to_message_id: messageId,
        parse_mode: 'html',
        disable_web_page_preview : true
    };
    bot.sendMessage(chatId, listmenu, opskey)
}