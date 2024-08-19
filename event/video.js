export const videoEvent = async (bot, msg, fileName) => {
        bot.sendMessage(msg.chat.id, `<blockquote>video uploaded successfully, if you want to upload to server reply to the file with the text /upfile /path/namefilevideo.mp4 for example /upfile /root/video.mp4</blockquote>`, {parse_mode: "html", reply_to_message_id: msg.message_id});
}