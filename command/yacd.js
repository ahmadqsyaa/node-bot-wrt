import execute from '../lib/execute.js';

export const cmds = ["yacd"];
export const exec = async (bot, msg, chatId, messageId) => {
    let secret
    let app
    let config
    const oc = await execute('uci get openclash.config.enable')
    const neko = await execute('uci get neko.cfg.enabled')
    const niki = await execute ('uci get nikki.config.enabled')
    if (parseInt(oc.trim(), 10) === 1) {
      secret = await execute('uci get openclash.config.dashboard_password');
      app = "openclash";
    } else if (parseInt(neko.trim(), 10) === 1) {
      config = await execute("uci -q get neko.cfg.selected_config");
      secret = await execute(`awk -F':' '/secret/{gsub(/^[[:space:]]+|[[:space:]]+$/, "", $2); print $2}' ${config}`);
      app = "neko clash";
    } else if (parseInt(nikki.trim(), 10) === 1) {
      secret = await execute('uci get nikki.mixin.api_secret');
      app = "nikki";
    } else if (parseInt(oc.trim(), 10) === 1 && parseInt(neko.trim(), 10) === 1 && parseInt(nikki.trim(), 10) === 1) {
      return bot.reply('openclash or neko clash is not running 🪄');
    } else {
      return bot.reply('Sorry brother, the bot only supports openclash or nekoclash & nikki 🫂.');
    }
    
    
    
    try {
    const headers = {
      Accept: '*/*',
      'Accept-Language': 'en-US,en;q=0.9',
      Authorization: `Bearer ${secret}`,
      Connection: 'keep-alive',
      'Content-Type': 'application/json',
      Cookie: 'filemanager=ee057d392316be9bec05f297f2037536',
      Referer: `http://127.0.0.1:9090/ui/yacd/`,
      'Sec-Gpc': '1',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36',
    };
    const respon = await fetch(`http://127.0.0.1:9090/providers/proxies`, { method: 'GET', headers });
    const hasil = await respon.json();
    const proxies = hasil.providers.default.proxies;

    const delayPromises = proxies.map(proxy => {
      const url = `http://127.0.0.1:9090/proxies/${proxy.name}/delay?timeout=5000&url=http%3A%2F%2Fwww.gstatic.com%2Fgenerate_204`;
      return fetch(url, { method: 'GET', headers })
        .then(response => response.json())
        .then(result => ({ name: proxy.name, delay: result.delay || 0 }))
        .catch(error => ({ name: proxy.name, delay: 0, error }));
    });
    const pings = await Promise.all(delayPromises);

    const inlineKeyboard = [];
    for (let i = 0; i < pings.length; i += 2) {
      const row = [];
      if (pings[i]) {
        row.push({
          text: `${pings[i].name} (${pings[i].delay}ms)`,
          callback_data: `yacd-data ${pings[i].name}`,
        });
      }
      if (pings[i + 1]) {
        row.push({
          text: `${pings[i + 1].name} (${pings[i + 1].delay}ms)`,
          callback_data: `yacd-data ${pings[i + 1].name}`,
        });
      }
      inlineKeyboard.push(row);
    }
    
    bot.editMessageText(`application detects the running ${app}, please select proxies.`, {
					chat_id: chatId,
					message_id: messageId+1,
					parse_mode: "html",
					disable_web_page_preview: true,
					reply_markup: {
						inline_keyboard: inlineKeyboard
					},
				})
    
  } catch (error) {
    console.error('Error:', error);
    return bot.sendMessage(chatId, error)
  }
    
};