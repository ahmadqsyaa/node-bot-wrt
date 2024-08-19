export const help = async (bot, msg, chatId, messageId, text) => {
    await bot.sendMessage(chatId, '<b>👋 if you need help, chat me @rickk1kch</b>', {reply_to_message_id: messageId, parse_mode: 'HTML' });
};