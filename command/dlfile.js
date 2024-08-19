import fs from 'fs'
export const dlfile = async (bot, msg, chatId, messageId, text) => {
    const fileTypes = new Map([
    ['.jpg', 'photo'],
    ['.jpeg', 'photo'],
    ['.png', 'photo'],
    ['.mp4', 'video'],
    ['.avi', 'video'],
    ['.mov', 'video'],
]);
    function checkFileExists(filePath) {
    return new Promise((resolve, reject) => {
        fs.access(filePath, fs.constants.F_OK, (error) => {
            if (error) {
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
}
    const words = text.trim().split(/\s+/);
    bot.sendMessage(chatId, "loading", {
                    "reply_to_message_id": `${messageId}`
                });
                var path = words.slice(1).join(' ');
                if (!path) {
                    return bot.editMessageText('wrong format, example: /dlfile /root/file.zip or /img.png or /video.mp4',{
                        chat_id: chatId,
                            message_id: messageId+1,
                            parse_mode: "html",
                            disable_web_page_preview: true
                    })
                } else {
                    checkFileExists(path)
                        .then(async (exists) => {
                            if (exists) {
                                var fileExtension = path.toLowerCase().match(/\.[0-9a-z]+$/);
                                if (fileExtension && fileTypes.has(fileExtension[0])) {
                                    if (fileTypes.get(fileExtension[0]) == "video") {
                                        await bot.sendVideo(chatId, path);
                                        bot.editMessageText(`successful video download ${path}`,{
                                            chat_id: chatId,
                            message_id: messageId+1,
                            parse_mode: "html",
                            disable_web_page_preview: true
                                        })
                                    } else if (fileTypes.get(fileExtension[0]) == "photo") {
                                        await bot.sendPhoto(chatId, path);
                                        bot.editMessageText(`successful img download ${path}`, {
                                            chat_id: chatId,
                            message_id: messageId+1,
                            parse_mode: "html",
                            disable_web_page_preview: true
                                        })
                                    }
                                } else {
                                    await bot.sendDocument(chatId, path);
                                    bot.editMessageText(`successful ${fileTypes.get(fileExtension[0])} download ${path}`, {
                                        chat_id: chatId,
                            message_id: messageId+1,
                            parse_mode: "html",
                            disable_web_page_preview: true
                                    })
                                }
                            } else {
                                bot.editMessageText(`files not found`, {
                                    chat_id: chatId,
                            message_id: messageId+1,
                            parse_mode: "html",
                            disable_web_page_preview: true
                                })
                            }
                        })
                        .catch((error) => {
                            console.error(error);
                            bot.editMessageText(error, {
                                chat_id: chatId,
                            message_id: messageId+1,
                            parse_mode: "html",
                            disable_web_page_preview: true
                            })
                        });
                }
}