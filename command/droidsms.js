import execute from '../lib/execute.js'
export const cmds = ["droidsms"];

export const exec = async (bot, msg, chatId, messageId) => {
    const regex = /(\d+)\s+(.+)/;
    const match = msg.body.match(regex);
    if (match) {
        const nophone = match[1]; 
        const message = match[2];
        var idDevice = await execute('uci get droidnet.device.id')
        await execute(`adb -s ${idDevice} shell service call isms 7 i32 0 s16 "com.android.mms.service" s16 "${nophone}" s16 "null" s16 "'${message}'" s16 "null" s16 "null"`)
        bot.reply(`no : ${nophone}\nmessage : ${message}\nstatus : success`)
    } else {
        bot.reply('no phone & message not found, format /droidsms nophone message')
    }
};