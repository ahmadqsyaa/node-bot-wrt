export const cmds = ["openclash"];
export const exec = (bot, msg, chatId, messageId) => {
    bot.editMessageText('menu openclash', {
        chat_id: chatId,
        message_id: messageId+1,
        parse_mode: "html",
        disable_web_page_preview: true,
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