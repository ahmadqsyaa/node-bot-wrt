export const cmds = ["dnslookup"];
export const exec = async (bot, msg, chatId, messageId) => {
    var text = msg.body.split(' ')[1];
    const url = text.replace(/^https?:\/\//, '')
    const data = await fetch(`https://api.hackertarget.com/dnslookup/?q=${url}`).then(v => v.text())
    bot.reply(`<blockquote>${data}</blockquote>`)
};