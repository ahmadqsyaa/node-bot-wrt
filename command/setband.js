export const cmds = ["setband"];
export const exec = (bot, msg, chatId, messageId) => {
    bot.editMessageText(chatId, 'choose band:\n<b>auto|850|900|1800|1900|2100|2300|2600</b>', {
				chat_id: chatId,
				message_id: messageId+1,
				parse_mode: "html",
				disable_web_page_preview: true,
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