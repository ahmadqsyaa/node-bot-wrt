export const cmds = ["service"];
export const exec = (bot, msg, chatId, messageId) => {
			var name = msg.body.split(' ')[1];
			if (!name) return bot.reply('/service servicename')
			bot.sendMessage(chatId, `service ${name}`, {
				reply_markup: {
					inline_keyboard: [
						    [{
								text: 'start',
								callback_data: 'service start'
							},
							{
								text: 'stop',
								callback_data: 'service stop'
							}],
							[{
								text: 'restart',
								callback_data: 'service restart'
							},
							{
								text: 'enable',
								callback_data: 'service enable'
							}],
							[{
							    text: 'disable',
							    callback_data: 'service disable'
							},
							{
							    text: 'reload',
							    callback_data: 'service reload'
							}],
							[{
							    text: 'cancel',
							    callback_data: 'cancel'
							  
							}]
					]
				},
				reply_to_message_id: messageId
			});
};