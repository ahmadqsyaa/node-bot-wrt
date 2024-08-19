import execute from '../lib/execute.js'
export const synctime = async (bot, msg, chatId, messageId, text) => {
    var url = text.split(' ')[1];
    await bot.sendMessage(chatId, 'loading', {
        "reply_to_message_id": `${messageId}`,
        "parse_mode": "html"
    })
    if (!url) {
        url = 'google.com'
        var data = await execute(`bash ./lib/sh/synctime.sh ${url}`)
    } else {
        var data = await execute(`bash ./lib/sh/synctime.sh ${url}`)
    }
    if (!data) return bot.editMessageText(text,{
        chat_id: chatId,
        message_id: messageId+1,
        parse_mode: "html",
        disable_web_page_preview: true
    })
    await bot.editMessageText(`sync from ${url}\r\n\r\n<code>${data}</code>`, {
        chat_id: chatId,
        message_id: messageId+1,
        parse_mode: "html",
        disable_web_page_preview: true 
    });
}