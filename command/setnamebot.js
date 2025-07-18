export const cmds = ["setnamebot"];
export const exec = async (bot, msg, chatId, messageId) => {
    bot.editMessageText('please enter the name of the new bot',{
        chat_id: chatId,
        message_id: messageId+1,
        parse_mode: "html",
        disable_web_page_preview: true
    })
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