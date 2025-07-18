export default async function refreshYacd(bot, chatId, messageId, groupName, secret, app) {
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

        const respon = await fetch(`http://127.0.0.1:9090/proxies`, {
            method: 'GET',
            headers
        });
        const hasil = await respon.json();

        const proxies = hasil.proxies[groupName];
        if (!proxies || !proxies.all || !Array.isArray(proxies.all)) {
            return bot.sendMessage(chatId, 'Failed to fetch proxies after switch.');
        }

        const proxyNames = proxies.all;

        const delayPromises = proxyNames.map(async (proxyName) => {
            try {
                const delayRes = await fetch(`http://127.0.0.1:9090/proxies/${proxyName}/delay?timeout=5000&url=http%3A%2F%2Fwww.gstatic.com%2Fgenerate_204`, {
                    method: 'GET',
                    headers
                });
                const delayData = await delayRes.json();
                return { proxyName, delay: delayData.delay || 0 };
            } catch (error) {
                return { proxyName, delay: 0, error: true };
            }
        });

        const results = await Promise.all(delayPromises);
		const buttons = results.map(({ proxyName, delay, error }) => {
		const text = proxies.now === proxyName ? `${proxyName} 📍` : proxyName;
		const displayText = error ? `${text} (Error)` : `${text} (${delay}ms)`;
		return {
			text: displayText,
			callback_data: `switch | ${groupName} | ${proxyName}`
			};
			});
		const inlineKeyboard = [];
		for (let i = 0; i < buttons.length; i += 2) {
				const row = [];
				row.push(buttons[i]);
				if (buttons[i + 1]) {
				    row.push(buttons[i + 1]);
				}
				    inlineKeyboard.push(row);
				}

        const customButtons = [
            [{ text: "refresh 🔁", callback_data: `yacd-data ${groupName}` },{ text: 'back 🔙', callback_data: `back` }]
        ];

        inlineKeyboard.push(...customButtons);

        await bot.editMessageText(`all proxies ${groupName}, button only supports type selector ⚡\ntype : ${proxies.type}`, {
            chat_id: chatId,
            message_id: messageId,
            parse_mode: "html",
            disable_web_page_preview: true,
            reply_markup: {
                inline_keyboard: inlineKeyboard
            },
        });

		} catch (e) {
			 bot.editMessageText(`erik Error: <code>${e.message || e}</code>`, {
			     chat_id: chatId,
			     message_id: messageId,
			     parse_mode: "html",
			     disable_web_page_preview: true,
			     reply_markup: {
			     inline_keyboard: [
			         [{ text: 'back 🔙', callback_data: 'back' }]
			     ]
			     }});
		}
}