const now = new Date();
export const cmds = ["time"];
export const exec = (bot, msg, chatId, messageId) => {
    const options = { 
    year: 'numeric', 
    month: '2-digit', 
    day: '2-digit', 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit', 
    hour12: false 
};
const format = now.toLocaleString('id-ID', options);
    bot.reply(format)
};