import fs from 'fs'
export const cmds = ["dlfile"];
export const exec = async (bot, msg, chatId, messageId) => {
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
    const words = msg.body.trim().split(/\s+/);
                var path = words.slice(1).join(' ');
                if (!path) {
                    return bot.reply('wrong format, example: /dlfile /root/file.zip or /img.png or /video.mp4')
                } else {
                    checkFileExists(path)
                        .then(async (exists) => {
                            if (exists) {
                                var fileExtension = path.toLowerCase().match(/\.[0-9a-z]+$/);
                                if (fileExtension && fileTypes.has(fileExtension[0])) {
                                    if (fileTypes.get(fileExtension[0]) == "video") {
                                        await bot.sendVideo(chatId, path);
                                        bot.reply(`successful video download ${path}`)
                                    } else if (fileTypes.get(fileExtension[0]) == "photo") {
                                        await bot.sendPhoto(chatId, path);
                                        bot.reply(`successful img download ${path}`)
                                    }
                                } else {
                                    await bot.sendDocument(chatId, path);
                                    bot.reply(`successful ${fileTypes.get(fileExtension[0])} download ${path}`)
                                }
                            } else {
                                bot.reply(`files not found`)
                            }
                        })
                        .catch((error) => {
                            console.error(error);
                            bot.reply(error)
                        });
                }
};