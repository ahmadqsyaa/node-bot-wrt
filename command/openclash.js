export const cmds = ["openclash"];
export const exec = (bot, msg, chatId, messageId) => {
    bot.deleteMessage(chatId, messageId+1)
    bot.sendMessage(chatId, 'menu openclash', {
				reply_markup: {
					inline_keyboard: [
						[{
								text: 'start',
								callback_data: 'openclash start'
							},
							{
								text: 'stop',
								callback_data: 'openclash stop'
							}],
							[{
								text: 'restart',
								callback_data: 'openclash restart'
							},
							{
								text: 'others',
								callback_data: 'learn-oc'
							}
						]
					]
				},
				reply_to_message_id: messageId
			});
};