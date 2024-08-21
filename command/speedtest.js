import execute from '../lib/execute.js'
export const speedtest = async (bot, msg, chatId, messageId, text) => {
    function formas(bytes) {
        const mbps = bytes / 125000;
        return mbps.toFixed(2) + ' mbps';
    }
    await bot.sendMessage(chatId, "loading", {
                    "reply_to_message_id": messageId
                });
                try {
                    var stdout = await execute("speedtest --accept-license --f json");
                    const json = stdout.match(/\{[\s\S]*\}/)[0];
                    var data = JSON.parse(json);
                    const waktu = new Date(data.timestamp).toLocaleString('id-ID', {
                        timeZone: 'Asia/Jakarta',
                        hour12: false
                    });
                    if (data.type == "result") {
                        var result = `
<b>
timestamp: ${waktu}
ping: ${data.ping.latency+' ms'}
download: ${formas(data.download.bandwidth)}
upload: ${formas(data.upload.bandwidth)}
isp: ${data.isp}
ip: ${data.interface.externalIp}
server: ${data.server.host}
nameserver: ${data.server.name}
location: ${data.server.location}
result url: <a href="${data.result.url}">link</a>
</b>
`;
                        console.log(result);
                        await bot.editMessageText("success", {
                            chat_id: chatId,
                            message_id: messageId+1,
                            parse_mode: "html",
                            disable_web_page_preview: true
                        });
                        await await bot.sendPhoto(chatId, data.result.url, {
                            "caption": result,
                            "parse_mode": "html",
                        });
                    } else if (data.type == "log") {
                        console.log("Data tidak valid");
                        await bot.editMessageText(`<blockquote>${data.message+'\nPlease try again'}</blockquote>`, {
                            chat_id: chatId,
                            message_id: messageId+1,
                            parse_mode: "html",
                            disable_web_page_preview: true 
                        });
                    } else {
                        await bot.editMessageText(data,{
                            chat_id: chatId,
                            message_id: messageId+1,
                            parse_mode: "html",
                            disable_web_page_preview: true
                        })
                    }
                } catch (error) {
                    console.log(error);
                    await bot.editMessageText(`<blockquote>${error+'\nPlease try again'}</blockquote>`, {
                        chat_id: chatId,
                        message_id: messageId+1,
                        parse_mode: "html",
                        disable_web_page_preview: true
                    });
                } 
}