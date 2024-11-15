import execute from '../lib/execute.js'
export const cmds = ["speedtest"];
export const exec = async (bot, msg, chatId, messageId) => {
    function formas(bytes) {
        const mbps = bytes / 125000;
        return mbps.toFixed(2) + ' mbps';
    }

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
                        await bot.reply("success");
                        await await bot.sendPhoto(chatId, data.result.url, {
                            "caption": result,
                            "parse_mode": "html",
                        });
                    } else if (data.type == "log") {
                        console.log("Data tidak valid");
                        await bot.reply(`<blockquote>${data.message+'\nPlease try again'}</blockquote>`);
                    } else {
                        await bot.reply(data)
                    }
                } catch (error) {
                    console.log(error);
                    await bot.reply(`<blockquote>${error+'\nPlease try again'}</blockquote>`);
                } 
};