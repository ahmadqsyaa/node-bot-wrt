export const photoEvent = async (bot, msg, fileName) => {
        bot.sendMessage(msg.chat.id, `<blockquote>photo uploaded successfully, if you want to upload to server reply to the file with the text /upfile /path/namefilephoto.png for example /upfile /root/img.png</blockquote>`, {parse_mode: "html",reply_to_message_id: msg.message_id});
}
