import execute from '../lib/execute.js'
export const cmd = async (bot, msg, chatId, messageId, text) => {
    try {
    var words = text.split(' ');
    var commd = words.slice(1).join(' ');
    if (!commd) return reply('type /cmd <terminal command>, for example /cmd rm -rf /filesysteim')
    var data = await execute(commd)
    bot.sendMessage(chatId, data, {
        "reply_to_message_id": `${messageId}`
    });
    } catch (err){
        bot.sendMessage(chatId, err, {reply_to_message_id: messageId})
    }
}