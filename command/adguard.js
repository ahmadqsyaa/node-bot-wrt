import adguardm from '../lib/adguard.js'
export const adguard = async (bot, msg, chatId, messageId, text) => {
    bot.sendMessage(chatId, "loading", {
                    "reply_to_message_id": `${messageId}`
                });
                try {
                var data = await adguardm()
                bot.editMessageText(`<blockquote>${data}</blockquote>`, {
                    chat_id: chatId,
                            message_id: messageId+1,
                            parse_mode: "html",
                            disable_web_page_preview: true
                });
                } catch (e){
                    bot.sendMessage(chatId, e,{reply_to_message_id: messageId})
                }
}