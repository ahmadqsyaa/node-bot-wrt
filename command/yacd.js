import execute from '../lib/execute.js';

export const cmds = ["yacd"];
export const exec = async (bot, msg, chatId, messageId) => {
    let secret
    let app
    const oc = await execute('pgrep -f openclash')
    const mh = await execute('pgrep -f mihomo')
    if (oc){
        secret = await execute('uci get openclash.config.dashboard_password');
        app = "openclash"
    } else if(mh){
        secret = await execute('uci get mihomo.mixin.api_secret');
        app = "mihomo"
    } else {
        bot.deleteMessage(chatId, messageId+1)
        return bot.sendMessage(chatId, 'openclash or mihomo not running')
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
        .catch(error => ({ name: proxy.name, delay: 0, error })); // Tangani error
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
    
    
    bot.deleteMessage(chatId, messageId+1)
    bot.sendMessage(chatId, `detected ${app} running, select proxies`, {
        reply_markup: {
            inline_keyboard: inlineKeyboard
        },
        reply_to_message_id: messageId
    }); 
    
  } catch (error) {
    console.error('Error:', error);
    return bot.sendMessage(chatId, error)
  }
    
};