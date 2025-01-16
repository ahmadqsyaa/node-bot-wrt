export const cmds = ["droidnet"];
export const exec = (bot, msg, chatId, messageId) => {
    bot.deleteMessage(chatId, messageId+1)
    bot.sendMessage(chatId, 'NODE-BOT-WRT X DROIDMODEM\nmenu droidmodem\nsource: github.com/animegasan/luci-app-droidmodem', {
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
				},
				reply_to_message_id: messageId,
				disable_web_page_preview: true
			});
};