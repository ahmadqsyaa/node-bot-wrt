export const uptime= async (bot, msg, chatId, messageId, text) => {
    function format(uptime) {
    const days = Math.floor(uptime / 86400);
    const hours = Math.floor((uptime % 86400) / 3600);
    const minutes = Math.floor((uptime % 3600) / 60); 
    const seconds = Math.floor(uptime % 60);

    let result = '';
    if (days > 0) {
        result += `${days} hari `;
    }
    if (hours > 0 || days > 0) {
        result += `${hours} jam `;
    }
    if (minutes > 0 || hours > 0 || days > 0) { // Tampilkan menit jika ada jam atau hari
        result += `${minutes} menit `;
    }
    result += `${seconds} detik`;
    
    return result.trim();
}
    
    function getUptime() {
        const uptime = process.uptime();
        return `Uptime bot: ${format(uptime)}`;
    }
    var ups = getUptime()
    bot.sendMessage(chatId, ups, {
        "reply_to_message_id": `${messageId}`
    })
}