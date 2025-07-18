export const cmds = ["passwall"];
export const exec = (bot, msg, chatId, messageId) =>{
    bot.sendMessage('menu passwall', {
        chat_id: chatId,
        message_id: messageId+1,
        parse_mode: "html",
        disable_web_page_preview: true,
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
				}
			});
};