export const cmds = ["miproxy"];
export const exec = (bot, msg, chatId, messageId) => {
    bot.deleteMessage(chatId, messageId+1)
    bot.sendMessage(chatId, 'choose get proxy or zeus ⚡', {
        reply_markup: {
            inline_keyboard: [
                [{
                    text: 'get proxy',
                    callback_data: 'miproxy'
                }],
                [{
                    text: 'zeus ⚡',
                    callback_data: 'mizeus'
                }]
                ]},
				reply_to_message_id: messageId
    });
};