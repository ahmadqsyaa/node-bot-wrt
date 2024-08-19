import TelegramBot from 'node-telegram-bot-api';
import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import {
	fileURLToPath
} from 'url';
try {
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);
	const bot = new TelegramBot(process.env.TOKEN, {
		polling: true
	});

	const initializeCommands = (bot) => {
		const commandsPath = path.join(__dirname, 'command');
		fs.readdirSync(commandsPath).forEach(async (file) => {
			if (file.endsWith('.js')) {
				const commandModule = await import(path.join(commandsPath, file));
				const commandName = file.split('.')[0];
				bot.onText(new RegExp(`/${commandName}`, 'i'), (msg) => {
					const chatId = msg.chat.id;
					const messageId = msg.message_id;
					if (process.env.USERID !== chatId.toString()) {
						var msgden = `<blockquote>USER : @${msg.from.username}\nID : ${chatId}\n⚠️ ACCES DENIED ⚠️\n\njika kamu owner dari bot ini\nsilahkan ganti USERID menjadi USERID="${chatId}" di file .env</blockquote>`
						return bot.sendMessage(chatId, msgden, {
							"parse_mode": "html",
							"reply_to_message_id": `${messageId}`
						})
					}
					let text;

					if (msg.text) {
						text = msg.text;
					} else if (msg.photo) {
						text = msg.caption || "";
					} else if (msg.video) {
						text = msg.caption || "";
					} else if (msg.document) {
						text = msg.caption || "";
					} else if (msg.audio) {
						text = msg.caption || "";
					} else if (msg.voice) {
						text = "";
					} else if (msg.sticker) {
						text = "";
					} else if (msg.contact) {
						text = "";
					} else if (msg.location) {
						text = "";
					} else if (msg.venue) {
						text = msg.venue.title || "";
					} else {
						text = "";
					}

					commandModule[commandName](bot, msg, chatId, messageId, text);
				});
			}
		});
	};

	// Event handlers
	const initializeEvents = (bot) => {
		const eventsPath = path.join(__dirname, 'event');
		fs.readdirSync(eventsPath).forEach(async (file) => {
			if (file.endsWith('.js')) {
				const eventModule = await import(path.join(eventsPath, file));
				const eventName = file.split('.')[0];

				if (eventName == 'callbackQuery') {
					bot.on('callback_query', (query) => {
						const chatId = query.message.chat.id;
						const messageId = query.message.message_id;
						const data = query.data;
						eventModule[`${eventName}Event`](bot, query, chatId, messageId, data);
					});
				} else
				if (eventName == 'video') {
					bot.on('video', (msg) => {
						const fileName = msg.video.file_id;
						eventModule[`${eventName}Event`](bot, msg, fileName);
					});
				} else
				if (eventName == 'photo') {
					bot.on('photo', (msg) => {
						const fileName = msg.photo[3].file_id;
						eventModule[`${eventName}Event`](bot, msg, fileName);
					});
				} else
				if (eventName == 'document') {
					bot.on('document', (msg) => {
						const fileName = msg.document.file_name;
						eventModule[`${eventName}Event`](bot, msg, fileName);
					});
				} else {

					bot.on(eventName, (msg) => {
						process.send(msg);
						eventModule[`${eventName}Event`](bot, msg);
					});
				}
			}
		});
	};

	bot.on('polling_error', (error) => {
		if (error.response.statusCode === 409) {
			bot.sendMessage(process.env.USERID, '⚠️ bot is already running in the background, force off the bot ..');
			process.kill()
		}
		process.send(error);
	});

	// Inisialisasi command handlers dan event handlers
	initializeCommands(bot);
	initializeEvents(bot);
} catch (error) {
	process.send(error)
}