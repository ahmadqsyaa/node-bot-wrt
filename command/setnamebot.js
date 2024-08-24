export const setnamebot = async (bot, msg, chatId, messageId, text) => {
    bot.sendMessage(chatId, 'please enter the name of the new bot',{reply_to_message_id: messageId})
        bot.once('message', async (response) => {
            try {
                var name = response.text;
                await bot.setMyName({
                    name: `${name}`
                });
                return bot.sendMessage(chatId, 
                `success change name bot to ${name}`,
                {reply_to_message_id: messageId+1})
            } catch (e) {
                return bot.sendMessage(chatId, e,{reply_to_message_id: response.chat.id})
            }
    });
}