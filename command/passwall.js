export const cmds = ["passwall"];
export const exec = (bot, msg, chatId, messageId) =>{
    bot.deleteMessage(chatId, messageId+1)
    bot.sendMessage(chatId, 'menu passwall', {
				reply_markup: {
					inline_keyboard: [
						[{
								text: 'start',
								callback_data: 'passwall start'
							},
							{
								text: 'stop',
								callback_data: 'passwall stop'
							}],
							[{
								text: 'restart',
								callback_data: 'passwall restart'
							},
							{
								text: 'cancel',
								callback_data: 'cancel'
							}
						]
					]
				},
				reply_to_message_id: messageId
			});
};