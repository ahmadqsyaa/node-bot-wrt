export const documentEvent = async (bot, msg, fileName) => {
        bot.sendMessage(msg.chat.id, `<blockquote>${fileName} uploaded successfully, if you want to upload to server reply to the file with the text /upfile /path/dir for example /upfile /root</blockquote>`, {parse_mode:"html", reply_to_message_id: msg.message_id});
}