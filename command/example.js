/*
 example file command
 > github.com/ahmadqsyaa/node-bot-wrt
 > t.me/infobot_wrt
 © node-bot-wrt 2024
 
 (bot, msg, chatId, messageId) ✅ (full)
 (bot, msg) ✅
 (bot, msg, chatId) ✅
 (msg, bot) ✖️
 
 bot.reply for send messages by editing loading messages
 bot.send for send messages
 * include format html
  * core.telegram.org/bots/api#formatting-options
  
 msg.body is the same as msg.text, except that it can capture all messages 
*/

export const cmds = ["example"];

export const exec = (bot, msg, chatId, messageId) => {
    bot.reply("example")
    //bot.reply("<bold>example</bold>") with format
};