import execute from '../lib/execute.js'
import fs from 'node:fs'
export const cmds = ["readlog"];
export const exec = async (bot, msg, chatId, messageId) => {

function fileExists(filePath) {
  return fs.existsSync(filePath);
}

if (fileExists('./logs/error-log.txt')) {
  const log = await execute(`tail -n 10 "./logs/error-log.txt"`)
  if (!log) return bot.reply('log null')
  await bot.deleteMessage(chatId, messageId+1)
  bot.sendMessage(chatId, log, {
				reply_markup: {
					inline_keyboard: [
						[{
								text: 'send file log',
								callback_data: 'sfile'
							}]
					]
				},
				reply_to_message_id: messageId
			});
} else {
  bot.reply('log file not found or log null')
}
};