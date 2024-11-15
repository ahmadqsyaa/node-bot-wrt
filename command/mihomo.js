export const cmds = ["mihomo"];
export const exec = (bot, msg, chatId, messageId) => {
    bot.deleteMessage(chatId, messageId+1)
    bot.sendMessage(chatId, 'menu mihomo', {
				reply_markup: {
					inline_keyboard: [
						[{
								text: 'start',
								callback_data: 'mihomo start'
							},
							{
								text: 'stop',
								callback_data: 'mihomo stop'
							}],
							[{
								text: 'restart',
								callback_data: 'mihomo restart'
							}]
					]
				},
				reply_to_message_id: messageId
			});
};