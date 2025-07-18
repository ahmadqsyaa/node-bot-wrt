export const cmds = ["mihomo"];
export const exec = (bot, msg, chatId, messageId) => {
    bot.editMessageText('menu mihomo', {
        chat_id: chatId,
        message_id: messageId+1,
        parse_mode: "html",
        disable_web_page_preview: true,
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
				}
			});
};