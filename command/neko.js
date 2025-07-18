export const cmds = ["neko"];
export const exec = (bot, msg, chatId, messageId) => {
    bot.editMessageText('menu neko clash', {
				chat_id: chatId,
				message_id: messageId+1,
				parse_mode: "html",
				disable_web_page_preview: true,
				reply_markup: {
					inline_keyboard: [
						[{
								text: 'start',
								callback_data: 'neko start'
							},
							{
								text: 'stop',
								callback_data: 'neko stop'
							}],
							[{
								text: 'restart',
								callback_data: 'neko restart'
							}
						]
					]
				}
			});
};