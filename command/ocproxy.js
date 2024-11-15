export const cmds = ["ocproxy"];
export const exec = (bot, msg, chatId, messageId) => {
    bot.deleteMessage(chatId, messageId+1)
    bot.sendMessage(chatId, 'choose get proxy or zeus ⚡', {
        reply_markup: {
            inline_keyboard: [
                [{
                    text: 'get proxy',
                    callback_data: 'proxy'
                }],
                [{
                    text: 'zeus ⚡',
                    callback_data: 'zeus'
                }]
                ]},
				reply_to_message_id: messageId
    });
};