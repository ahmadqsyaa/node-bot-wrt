export const cmds = ["setband"];
export const exec = (bot, msg, chatId, messageId) => {
    bot.deleteMessage(chatId, messageId+1)
    bot.sendMessage(chatId, 'choose band:\n<b>auto|850|900|1800|1900|2100|2300|2600</b>', {
				reply_markup: {
					inline_keyboard: [
						[
						    {
						        text: 'band 850',
						        callback_data: 'setband 850'
						    },{
						        text: 'band 900',
						        callback_data: 'setband 900'
						    }
						],
						[
						    {
						        text: 'band 1800',
						        callback_data: 'setband 1800'
						    },{
						        text: 'band 1900',
						        callback_data: 'setband 1900'
						    }
						],
						[
						    {
						        text: 'band 2100',
						        callback_data: 'setband 2100'
						    },{
						        text: 'band 2300',
						        callback_data: 'setband 2300'
						    }
						],
						[
						    {
						        text: 'band 2600',
						        callback_data: 'setband 2600'
						    },
						    {
						        text: 'auto',
						        callback_data: 'setband auto'
						    } 
						]
					]
				},
				reply_to_message_id: messageId,
				parse_mode: "html"
			});
};