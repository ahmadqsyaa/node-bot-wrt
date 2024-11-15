import execute from '../lib/execute.js'
export const cmds = ["upfile"];
export const exec = async (bot, msg, chatId, messageId) => {
    const words = msg.body.trim().split(/\s+/);
    var filedir = words.slice(1).join(' ');
                if (!filedir) return bot.reply('wrong format, send the document, photo & video, \nthen reply with the command /upfile /path/img.jpg or /path/video.mp4 \ndocument not require filename /upfile /path')
                const replyToMessage = msg.reply_to_message;
                if (replyToMessage) {
                    let fileId
                    let fileName
                    if (replyToMessage.document) {
                        fileName = replyToMessage.document.file_name
                        fileId = replyToMessage.document.file_id
                    } else if (replyToMessage.photo) {
                        fileName = ""
                        fileId = replyToMessage.photo[3].file_id
                    } else if (replyToMessage.video) {
                        fileName = ""
                        fileId = replyToMessage.video.file_id
                    }
                    var file = await bot.getFile(fileId);
                    var token = process.env.TOKEN
                    var fileUrl = `https://api.telegram.org/file/bot${token}/${file.file_path}`;
                    try {
                        let localFilePath
                        if (replyToMessage.document) {
                            localFilePath = `${filedir}/${fileName}`;
                        } else {
                            localFilePath = filedir;
                        }
                        var data = await execute(`wget -O "${localFilePath}" "${fileUrl}"`)
                        bot.reply(`success upload file to ${localFilePath}`);
                    } catch (er) {
                        bot.reply(`failed upload ${er}`);

                    }
                } 
};