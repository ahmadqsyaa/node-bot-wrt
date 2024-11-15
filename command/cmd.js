import execute from '../lib/execute.js'
export const cmds = ["cmd"];
export const exec = async (bot, msg, chatId, messageId) => {
    try {
    var words = msg.body.split(' ');
    var commd = words.slice(1).join(' ');
    if (!commd){
        bot.reply('type /cmd <terminal command>, for example /cmd rm -rf /filesysteim') 
    }
    var data = await execute(commd)
       bot.reply(data)
    } catch (err){
       bot.reply(err)
    }
};