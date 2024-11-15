export const cmds = ["setnamebot"];
export const exec = async (bot, msg, chatId, messageId) => {
    await bot.deleteMessage(chatId, messageId+1)
    bot.sendMessage(chatId, 'please enter the name of the new bot',{reply_to_message_id: messageId})
        bot.once('message', async (response) => {
            try {
                var name = response.text;
                await bot.setMyName({
                    name: `${name}`
                });
                return bot.sendMessage(chatId, 
                `success change name bot to ${name}`,
                {reply_to_message_id: response.message_id})
            } catch (e) {
                return bot.sendMessage(chatId, e,{reply_to_message_id: response.chat.id})
            }
    });
};