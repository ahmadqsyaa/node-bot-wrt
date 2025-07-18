export const cmds = ["droidnet"];
export const exec = (bot, msg, chatId, messageId) => {
    bot.sendMessage('NODE-BOT-WRT X DROIDMODEM\nmenu droidmodem\nsource: github.com/animegasan/luci-app-droidmodem', {
			chat_id: chatId,
			message_id: messageId+1,
			parse_mode: "html",
			disable_web_page_preview: true,
				reply_markup: {
					inline_keyboard: [
						[{
							text: 'device info',
							callback_data: 'droid-info'
						},{
							text: 'sms inbox 5',
							callback_data: 'droid-inbox'
						}],
						[{
						    text: 'signal info',
							callback_data: 'droid-signal'
						}]
					]
				}
			});
};