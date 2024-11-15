import execute from '../lib/execute.js'
export const cmds = ["clear"];
export const exec = async (bot, msg, chatId, messageId) => {
    function format(bytes) {
        if (bytes < 1024) {
            return bytes + ' KB';
        } else if (bytes < 1048576) {
            return (bytes / 1024).toFixed(2) + ' MB';
        } else if (bytes < 1073741824) {
            return (bytes / 1048576).toFixed(2) + ' GB';
        } else {
            return (bytes / 1073741824).toFixed(2) + ' TB';
        }
    }
    var data = await execute('bash ./lib/sh/clear.sh')
    var res = JSON.parse(data)
    var result =`
<blockquote>
╭───────────────────────────╮
├ free ram: ${format(res.ram_tersedia)}
├ before: ${format(res.sebelum)}
├ after: ${format(res.sesudah)}
├ remove: ${format(res.cache_yang_dihapus)}
╰───────────────────────────╯
</blockquote>`
    
    bot.reply(result)
};