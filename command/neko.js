export const cmds = ["neko"];
export const exec = (bot, msg, chatId, messageId) => {
    bot.deleteMessage(chatId, messageId+1)
    bot.sendMessage(chatId, 'menu neko clash', {
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
				},
				reply_to_message_id: messageId
			});
};