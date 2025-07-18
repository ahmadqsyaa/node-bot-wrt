import execute from '../lib/execute.js'
import fs from 'node:fs'
export const cmds = ["readlog"];
export const exec = async (bot, msg, chatId, messageId) => {

function fileExists(filePath) {
  return fs.existsSync(filePath);
}

if (fileExists('/tmp/logs/error-log.txt')) {
  const log = await execute(`tail -n 20 "/tmp/logs/error-log.txt"`)
  if (!log) return bot.reply('log null')
  bot.editMessageText(`<code>log</code>`, {
      chat_id: chatId,
      message_id: messageId+1,
      parse_mode: "html",
      disable_web_page_preview: true,
	  reply_markup: {
			inline_keyboard: [
				[{
					text: 'send file log',
				    callback_data: 'sfile'
				}]
			]}
			});
} else {
  bot.reply('log file not found or log null')
}
};